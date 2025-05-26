import React, { useState, useEffect } from 'react';
import './faculty.css';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios'; // Import axios for API calls

const Faculty = () => {
  const controls = useAnimation();
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch faculty data from the backend
  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/faculty');
        if (response.data.success) {
          setFacultyMembers(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch faculty data.');
        }
      } catch (err) {
        console.error('Error fetching faculty data:', err);
        setError('An error occurred while fetching faculty data. Please ensure the backend is running and connected to the database.');
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();

    // Scroll animation logic (remains mostly the same)
    const handleScroll = () => {
      const facultySection = document.querySelector(".faculty-container");
      const windowHeight = window.innerHeight;

      if (facultySection) {
        const sectionTop = facultySection.getBoundingClientRect().top;

        // Trigger animation if the section is in view
        if (sectionTop < windowHeight - 100) {
          controls.start({ opacity: 1, x: 0 });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]); // controls is a dependency for the scroll effect

  // Define sections based on roles fetched from the database
  // Filter facultyMembers based on their 'role' property
  const sections = [
    {
      title: "Head of Department",
      data: facultyMembers.filter(member => member.role === "Head of Department"),
      className: "single-row" // This class will now be styled to center its content
    },
    {
      title: "Lab Admin",
      data: facultyMembers.filter(member => member.role === "Lab Admin"),
      className: "multi-row"
    },
    {
      title: "Professor",
      data: facultyMembers.filter(member => member.role === "Professor"),
      className: "multi-row"
    },
    {
      title: "Staff",
      data: facultyMembers.filter(member => member.role === "Clerk" || member.role === "Peon"),
      className: "double-row"
    },
  ].filter(section => section.data.length > 0); // Only show sections that have data

  if (loading) {
    return (
      <div className="faculty-container bg-light d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Faculty...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="faculty-container bg-light d-flex justify-content-center align-items-center" style={{ minHeight: '50vh', color: 'red' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (facultyMembers.length === 0) {
    return (
      <div className="faculty-container bg-light d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <p>No faculty members found.</p>
      </div>
    );
  }

  return (
    <div className="faculty-container bg-light">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          // Added d-flex, justify-content-center, align-items-center for consistent centering
          // Also added mb-5 for space between sections
          className={`faculty-row ${section.className} d-flex flex-wrap justify-content-center align-items-center mb-5`}
          initial={{ opacity: 0, x: 100 }}
          animate={controls}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
        >
          {/* Section title, always centered */}
          {section.title && <h2 className="section-title text-center w-100 mb-4">{section.title}</h2>}
          {section.data.map((member, memberIndex) => (
            <div
              id='card'
              style={{
                backgroundColor: 'rgb(235, 239, 246)',
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                margin: '15px', // Added margin for spacing between cards
                padding: '20px', // Added padding for better appearance
                textAlign: 'center', // Center content inside card
                width: '200px', // Fixed width for consistency
                flexShrink: 0 // Prevent cards from shrinking
              }}
              key={memberIndex}
              className={`faculty-card ${member.role.toLowerCase().replace(/\s/g, '-')}-card`}
            >
              <img
                src={member.image_url || "https://placehold.co/100x100/cccccc/000000?text=No+Img"}
                alt={member.name}
                className="profile-img mb-3" // Added mb-3 for space below image
                style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }} // Circular image
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/cccccc/000000?text=No+Img"; }}
              />
              <h3 className="h5 mb-1">{member.name}</h3> {/* Smaller heading, less margin */}
              <p className="text-muted mb-0">{member.role}</p> {/* Muted text, no bottom margin */}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default Faculty;
