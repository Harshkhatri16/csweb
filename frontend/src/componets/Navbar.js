import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo2.png'; // Ensure this path is correct
import './Navbar.css'; // Your custom styles
import { motion } from 'framer-motion';

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img id="logo" src={logo} alt="DOCS Logo" style={{ height: '50px', width: '50px', marginRight: '10px' }} />
          <div>
            <h6 className="mb-0 text-dark" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>DEPARTMENT OF COMPUTER SCIENCE</h6>
            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>Krantiguru Shyamji Krishna Verma Kachchh University</p>
          </div>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0 * 0.1 }}
            >
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 * 0.1 }}
            >
              {/* 'About' will perform in-page scroll on HomePage */}
              <a className="nav-link" href="#aboutus-section" onClick={(e) => {
                e.preventDefault();
                scrollToSection('aboutus-section');
              }}>About</a>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 * 0.1 }}
            >
              {/* 'Academics' will perform in-page scroll on HomePage */}
              <a className="nav-link" href="#academics-section" onClick={(e) => {
                e.preventDefault();
                scrollToSection('academics-section');
              }}>Academics</a>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 3 * 0.1 }}
            >
              {/* 'Syllabus' is now a separate page link */}
              <NavLink className="nav-link" to="/syllabus">Syllabus</NavLink>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 4 * 0.1 }}
            >
              {/* 'Faculties' remains a separate page link */}
              <NavLink className="nav-link" to="/faculty">Faculties</NavLink>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 5 * 0.1 }}
            >
               <a className="nav-link" href="#academics-section" onClick={(e) => {
                e.preventDefault();
                scrollToSection('facilities-section');
              }}>Facilities</a>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 6 * 0.1 }}
            >
              {/* 'Contact us' remains a separate page link */}
              <NavLink className="nav-link" to="/Contact">Contact us</NavLink>
            </motion.li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;