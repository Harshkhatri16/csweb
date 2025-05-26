// server.js
const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

const app = express();
app.use(cors());
// Increased the limit for JSON body parser to handle larger Base64 image data
app.use(express.json({ limit: '50mb' }));

// --- Database Connection Pools ---
const dbConfigs = {
  department: {
    host: "localhost",
    user: "root",
    password: "",
    database: "department"
  },
  // Dedicated database connection for 'faculty'
  faculty: {
    host: "localhost",
    user: "root",
    password: "",
    database: "faculty" // Assuming your faculty table is in a database named 'faculty'
  },
  ca_and_it: {
    host: "localhost",
    user: "root",
    password: "",
    database: "ca_and_it"
  },
  it: {
    host: "localhost",
    user: "root",
    password: "",
    database: "it"
  },
  bs: {
    host: "localhost",
    user: "root",
    password: "",
    database: "bs"
  },
  pgdca: {
    host: "localhost",
    user: "root",
    password: "",
    database: "pgdca"
  },
};

// Create a pool for each database configuration
const dbPools = {};
for (const dbName in dbConfigs) {
  dbPools[dbName] = mysql.createPool({
    connectionLimit: 10,
    ...dbConfigs[dbName]
  });

  dbPools[dbName].getConnection((err, connection) => {
    if (err) {
      console.error(`Error connecting to '${dbName}' database:`, err);
    } else {
      console.log(`Connected to '${dbName}' MySQL database`);
      connection.release();
    }
  });
}

// --- Whitelist for Semester Tables per Database ---
const allowedSemTables = {
  ca_and_it: ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8', 'sem9', 'sem10'],
  it: ['sem1', 'sem2'],
  bs: ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8'],
  pgdca: ['sem1', 'sem2'],
};

// --- Middleware to select the correct database pool and validate semester table ---
const selectDbAndSemTable = (req, res, next) => {
  const dbName = req.params.dbName;
  const semTable = req.params.semTable;

  console.log(`Attempting to select DB: '${dbName}', Table: '${semTable}'`);

  // Exclude 'department' and 'faculty' from this middleware as they are handled separately
  const allowedDbNames = Object.keys(dbConfigs).filter(name => name !== 'department' && name !== 'faculty');
  if (!allowedDbNames.includes(dbName) || !dbPools[dbName]) {
    console.error(`Validation failed: Invalid department database selected: '${dbName}'`);
    return res.status(400).json({ success: false, message: `Invalid department database selected: ${dbName}.` });
  }

  if (!allowedSemTables[dbName] || !allowedSemTables[dbName].includes(semTable)) {
    console.error(`Validation failed: Invalid semester table '${semTable}' selected for department '${dbName}'.`);
    return res.status(400).json({ success: false, message: `Invalid semester table '${semTable}' selected for department '${dbName}'.` });
  }

  req.dbPool = dbPools[dbName];
  req.semTable = semTable;
  console.log(`Successfully selected DB: '${dbName}', Table: '${semTable}'`);
  next();
};


// --- Existing Login Endpoint (uses 'department' database) ---
app.post("/login", (req, res) => {
  const { U_id, password } = req.body;
  console.log("Login attempt:", req.body);
  if (!U_id || !password) {
    return res.status(400).json({ success: false, message: "U_id and password are required" });
  }
  const query = "SELECT * FROM cskskv WHERE U_id = ? AND password = ?";
  dbPools.department.query(query, [U_id, password], (err, results) => {
    if (err) {
      console.log("Login Query error:", err);
      return res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
    if (results.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// --- Syllabus Management Endpoints (No image_url) ---
app.get("/:dbName/:semTable/syllabus", selectDbAndSemTable, (req, res) => {
  const query = `SELECT id, SubjectName, SubjectCode, last_updated FROM ${req.semTable} ORDER BY SubjectName ASC`;
  console.log(`Executing query on ${req.dbPool.config.connectionConfig.database}.${req.semTable}: ${query}`);
  req.dbPool.query(query, (err, results) => {
    if (err) {
      console.log("Syllabus GET error:", err);
      return res.status(500).json({ success: false, message: "Error fetching syllabus data", error: err.message });
    }
    res.json({ success: true, data: results });
  });
});

app.post("/:dbName/:semTable/syllabus", selectDbAndSemTable, (req, res) => {
  const { subject_name, subject_code } = req.body;
  if (!subject_name || !subject_code) {
    return res.status(400).json({ success: false, message: "Subject name and Subject Code are required." });
  }
  const query = `INSERT INTO ${req.semTable} (SubjectName, SubjectCode) VALUES (?, ?)`;
  console.log(`Executing query on ${req.dbPool.config.connectionConfig.database}.${req.semTable}: ${query}`);
  req.dbPool.query(query, [subject_name, subject_code], (err, result) => {
    if (err) {
      console.log("Syllabus POST error:", err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ success: false, message: "Subject Code already exists." });
      }
      return res.status(500).json({ success: false, message: "Error adding syllabus item", error: err.message });
    }
    res.status(201).json({ success: true, message: "Syllabus item added successfully!", id: result.insertId });
  });
});

app.put("/:dbName/:semTable/syllabus/:id", selectDbAndSemTable, (req, res) => {
  const { id } = req.params;
  const { subject_name, subject_code } = req.body;
  if (!subject_name || !subject_code) {
    return res.status(400).json({ success: false, message: "Subject name and Subject Code are required." });
  }
  const query = `UPDATE ${req.semTable} SET SubjectName = ?, SubjectCode = ? WHERE id = ?`;
  console.log(`Executing query on ${req.dbPool.config.connectionConfig.database}.${req.semTable}: ${query}`);
  req.dbPool.query(query, [subject_name, subject_code, id], (err, result) => {
    if (err) {
      console.log("Syllabus PUT error:", err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ success: false, message: "Subject Code already exists for another item." });
      }
      return res.status(500).json({ success: false, message: "Error updating syllabus item", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Syllabus item not found." });
    }
    res.json({ success: true, message: "Syllabus item updated successfully!" });
  });
});

app.delete("/:dbName/:semTable/syllabus/:id", selectDbAndSemTable, (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM ${req.semTable} WHERE id = ?`;
  console.log(`Executing query on ${req.dbPool.config.connectionConfig.database}.${req.semTable}: ${query}`);
  req.dbPool.query(query, [id], (err, result) => {
    if (err) {
      console.log("Syllabus DELETE error:", err);
      return res.status(500).json({ success: false, message: "Error deleting syllabus item", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Syllabus item not found." });
    }
    res.json({ success: true, message: "Syllabus item deleted successfully!" });
  });
});

// --- Faculty Management Endpoints (Handles BLOB image_url) ---
app.get("/faculty", (req, res) => {
  const query = "SELECT id, name, role, image_url, last_updated FROM faculty ORDER BY name ASC";
  dbPools.faculty.query(query, (err, results) => {
    if (err) {
      console.log("Faculty GET error:", err);
      return res.status(500).json({ success: false, message: "Error fetching faculty data", error: err.message });
    }
    // Convert BLOB (Buffer) to Base64 string for frontend
    const facultyData = results.map(member => {
      let base64ImageWithPrefix = null;
      if (member.image_url) {
        // Assuming the image_url BLOB is raw image data.
        // We need to determine the MIME type and prepend the data URI prefix.
        // This is a heuristic. For a robust solution, store MIME type in DB.
        // For now, we'll try to infer based on common image formats.
        const base64String = member.image_url.toString('base64');
        if (base64String.startsWith('iVBORw0KGgoAAA')) { // PNG magic number
          base64ImageWithPrefix = `data:image/png;base64,${base64String}`;
        } else if (base64String.startsWith('/9j/')) { // JPEG magic number
          base64ImageWithPrefix = `data:image/jpeg;base64,${base64String}`;
        } else {
          // Fallback if type can't be inferred. This might still result in broken images.
          console.warn("Could not infer image type for faculty member ID:", member.id, "Defaulting to JPEG.");
          base64ImageWithPrefix = `data:image/jpeg;base64,${base64String}`; // Default to JPEG
        }
      }
      return {
        ...member,
        image_url: base64ImageWithPrefix
      };
    });
    res.json({ success: true, data: facultyData });
  });
});

app.post("/faculty", (req, res) => {
  const { name, role, image_url } = req.body; // image_url will be full Base64 string with prefix
  if (!name || !role) {
    return res.status(400).json({ success: false, message: "Name and Role are required." });
  }

  // Convert Base64 string (with prefix) to Buffer for BLOB storage
  let imageData = null;
  if (image_url) {
    // Remove the "data:image/type;base64," prefix
    const base64Data = image_url.split(',')[1];
    if (base64Data) {
      imageData = Buffer.from(base64Data, 'base64');
    }
  }

  const query = "INSERT INTO faculty (name, role, image_url) VALUES (?, ?, ?)";
  dbPools.faculty.query(query, [name, role, imageData], (err, result) => {
    if (err) {
      console.log("Faculty POST error:", err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ success: false, message: "Role already exists." });
      }
      return res.status(500).json({ success: false, message: "Error adding faculty member", error: err.message });
    }
    res.status(201).json({ success: true, message: "Faculty member added successfully!", id: result.insertId });
  });
});

app.put("/faculty/:id", (req, res) => {
  const { id } = req.params;
  const { name, role, image_url } = req.body; // image_url will be full Base64 string with prefix
  if (!name || !role) {
    return res.status(400).json({ success: false, message: "Name and Role are required." });
  }

  let imageData = null;
  if (image_url) {
    const base64Data = image_url.split(',')[1];
    if (base64Data) {
      imageData = Buffer.from(base64Data, 'base64');
    }
  }

  const query = "UPDATE faculty SET name = ?, role = ?, image_url = ? WHERE id = ?";
  dbPools.faculty.query(query, [name, role, imageData, id], (err, result) => {
    if (err) {
      console.log("Faculty PUT error:", err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ success: false, message: "Role already exists for another record." });
      }
      return res.status(500).json({ success: false, message: "Error updating faculty member", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Faculty member not found." });
    }
    res.json({ success: true, message: "Faculty member updated successfully!" });
  });
});

app.delete("/faculty/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM faculty WHERE id = ?";
  dbPools.faculty.query(query, [id], (err, result) => {
    if (err) {
      console.log("Faculty DELETE error:", err);
      return res.status(500).json({ success: false, message: "Error deleting faculty member", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Faculty member not found." });
    }
    res.json({ success: true, message: "Faculty member deleted successfully!" });
  });
});


app.listen(8081, () => {
  console.log("Server running on port 8081");
});
