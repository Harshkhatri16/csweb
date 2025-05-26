import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import './Navbar.css';
import { motion } from 'framer-motion';

const Navbar = () => {
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.history.pushState(null, '', `#${sectionId}`);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <img id="logo" src={logo} alt="DOCS" />

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
            {[
              { name: 'Home', link: '/' },
              { name: 'About Us', link: 'aboutus-section' },
              { name: 'Academics', link: 'academics-section' },
              { name: 'Contact', link: 'contact-section' }
            ].map((item, index) => (
              <motion.li
                className="nav-item"
                key={item.name}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {item.link === '/' ? (
                  <NavLink className="nav-link" to="/" end>
                    {item.name}
                  </NavLink>
                ) : (
                  <a
                    className="nav-link"
                    href={`#${item.link}`}
                    onClick={(e) => handleScroll(e, item.link)}
                  >
                    {item.name}
                  </a>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
