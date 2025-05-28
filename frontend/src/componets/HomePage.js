import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo2 from '../images/logo2.png';
import home from '../images/home.png';
import './Home.css';
import AboutUs from './AboutUs';
import Academics from './Academics';
import Faculty from './Faculty'; // Assuming Faculty component path is correct
import Facilities from './facilitiesData '; // Assuming Facilities component path is correct
import Contact from './Contact'; // Assuming Contact component path is correct

import { motion } from 'framer-motion'; // Correctly imported
import Navbar from './Navbar';

// Removed unused import: import Navbar from './Navbar';

export default function HomePage() {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect to scroll to section based on URL hash
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1); // Remove '#' from the hash
            // Check if the ID matches a section you want to scroll to within HomePage
            if (id === 'aboutus-section' || id === 'academics-section' || id === 'faculty-section' || id === 'facilities-section' || id === 'contact-section') {
                const element = document.getElementById(id);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        }
    }, [location]);

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
        <Navbar/>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="home-wrapper"
        >
            {/* Navbar is rendered in App.js, so it's not here */}

            {/* Hero Section */}
            <div className="d-flex flex-column flex-lg-row justify-content-center hero-section text-center bg-light" style={{ 'paddingTop': '0px' }}>
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
                            href="https://kuerp.kskvku.ac.in/"
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

            {/* AboutUs Section */}
            <motion.div
                id="aboutus-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <AboutUs />
            </motion.div>
            
            {/* Facilities Section */}
            <motion.div
                id="facilities-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Facilities />
            </motion.div>

            {/* Academics Section */}
            <motion.div
                id="academics-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Academics />
            </motion.div>

            {/* Faculties Section */}
            <motion.div
                id="Faculties-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Faculty />
            </motion.div>
            
            {/* Contact Section */}
            <motion.div
                id="contact-section"
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
          </>
    );
}