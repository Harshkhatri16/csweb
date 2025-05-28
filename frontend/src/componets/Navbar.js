import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo2.png'; // Ensure this path is correct
import './Navbar.css'; // Your custom styles
import { motion } from 'framer-motion';

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      // Use setTimeout to ensure the DOM has updated before scrolling
      // This can help if the page needs to render before the target element exists
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // Small delay
    }
  };

  const handleNavLinkClick = (e, path, sectionId) => {
    // If the path is home and there's a section ID, handle scrolling
    if (path === '/' && sectionId) {
      e.preventDefault(); // Prevent default NavLink behavior
      // Manually navigate to the home page with the hash
      window.history.pushState(null, '', `/#${sectionId}`);
      scrollToSection(sectionId);
    }
    // If it's not the home page or no sectionId, let NavLink handle it
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm ">
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
              {/* About Us (in-page scroll) */}
              <a className="nav-link" href="/#aboutus-section" onClick={(e) => handleNavLinkClick(e, '/', 'aboutus-section')}>About</a>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 * 0.1 }}
            >
              {/* Academics (in-page scroll) */}
              <a className="nav-link" href="/#academics-section" onClick={(e) => handleNavLinkClick(e, '/', 'academics-section')}>Academics</a>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 3 * 0.1 }}
            >
              {/* Syllabus (separate page - keep NavLink) */}
              <NavLink className="nav-link" to="/syllabus">Syllabus</NavLink>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 4 * 0.1 }}
            >
              {/* Faculties (in-page scroll) */}
              {/* NOTE: You had 'Faculties-section' with a capital 'F' before, assuming it should match 'faculty-section' as per HomePage.js */}
              <a className="nav-link" href="/#Faculties-section" onClick={(e) => handleNavLinkClick(e, '/', 'Faculties-section')}>Faculties</a>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 5 * 0.1 }}
            >
              {/* Facilities (in-page scroll) */}
              <a className="nav-link" href="/#facilities-section" onClick={(e) => handleNavLinkClick(e, '/', 'facilities-section')}>Facilities</a>
            </motion.li>

            {/* Resources Dropdown */}
            <motion.li
              className="nav-item dropdown"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 6 * 0.1 }}
            >
              <a
                className="nav-link " // Changed back to dropdown-toggle for the arrow
                href="#"
                id="navbarDropdownResources"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Resources
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownResources">
                {/* Changed from NavLink to <a> for external link */}
                <li>
                  <a
                    className="dropdown-item"
                    href="https://drive.google.com/drive/folders/1SOIELP3GAghYiVkB1bd4wiRhAuJ38Dxz"
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practice for target="_blank"
                  >
                    Old Papers
                  </a>
                </li>
                 <li>
                  <a
                    className="dropdown-item"
                    href="https://drive.google.com/drive/folders/1SOIELP3GAghYiVkB1bd4wiRhAuJ38Dxz"
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practice for target="_blank"
                  >
                    Fees Structure
                  </a>
                </li>
                 <li>
                  <a
                    className="dropdown-item"
                    href="https://kskvku.digitaluniversity.ac/result-table"
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practice for target="_blank"
                  >
                    Result Check
                  </a>
                </li>
              
              </ul>
            </motion.li>

            <motion.li
              className="nav-item"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 7 * 0.1 }}
            >
              {/* Contact us (in-page scroll) */}
              <a className="nav-link" href="/#contact-section" onClick={(e) => handleNavLinkClick(e, '/', 'contact-section')}>Contact us</a>
            </motion.li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;