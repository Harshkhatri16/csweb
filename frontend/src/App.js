import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './componets/Navbar';
import Home from './componets/HomePage';
import Courses from './componets/Courses';
import Syllabus from './componets/Syllabus';
import Facilities from './componets/facilitiesData ';

function App() {
  return (
    <Router basename="/DOCS"> 
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
       
          <Route path="/Courses" element={<Courses />} />
        <Route path="/syllabus" element={<Syllabus />} />
      </Routes>
    </Router>
  );
}

export default App;
