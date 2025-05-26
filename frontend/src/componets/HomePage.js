import React, { useEffect, useState } from 'react';
import logo2 from '../images/logo2.png';
import home from '../images/home.png';
import './Home.css';
import AboutUs from './AboutUs';
import Academics from './Academics';
import Contact from './Contact';
import { Navbar } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="home-wrapper"
    >
      <Navbar />

      {/* Hero Section */}
      <div className="d-flex flex-column flex-lg-row justify-content-center hero-section text-center bg-light" style={{'padding-top': '00px'}}>
        {/* Left */}
        <motion.div
          className="left-box text-center p-4 bg-light"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.img
            src={logo2}
            alt="Logo"
            className="logo mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
          <h1 className="fw-bold">Welcome To DOCS</h1>
          <h2 className="h5">DEPARTMENT OF COMPUTER SCIENCE</h2>
          <h5 className="mt-3">Login As</h5>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-2"
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <a
              href="https://kskvkuapp.digitaluniversity.ac/Login.aspx?IsCollege=%27N%27"
              className="btn btn-primary px-4 py-2"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Student
            </a>
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="right-box d-flex justify-content-center p-4"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.img
            src={home}
            alt="Home"
            className="img-fluid hero-img"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        </motion.div>
      </div>

      {/* Other Sections */}
      <motion.div
        id="aboutus-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <AboutUs />
      </motion.div>

      <motion.div
        id="academics-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Academics />
      </motion.div>

      <motion.div
        id="Contact-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Contact />
      </motion.div>

      {/* Back to Top */}
      {showScrollButton && (
        <motion.button
          className="btn btn-dark position-fixed back-to-top-btn"
          onClick={handleBackToTop}
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          ↑
        </motion.button>
      )}
    </motion.div>
  );
}
