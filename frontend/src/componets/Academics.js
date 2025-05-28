import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, useAnimation } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Faculty from './Faculty'; // Assuming this is your FacultySection component
import './Academics.css'; // Your Academics specific styles

const programs = [
    { title: 'MSC (CA & IT)', description: 'Under & Post Graduate\nYear program\nAfter 12th Science or commerce' },
    { title: 'MSC (IT)', description: 'Post Graduate\n2 year program\nAfter BCA, BSC, bTech' },
    { title: 'PGDCA', description: 'Post Graduate\n1 year program\nAfter any bachelor degree' },
    { title: 'BS in CS', description: 'Under Graduate\n4 year program\nAfter 12th from any stream' },
    { title: 'Doctor of Philosophy', description: 'PhD in Computer Science\nResearch oriented\nAfter MCA, MSC, mTech' }
];

const messages = [
    "Empowering Future Leaders in Technology",
    "Innovative Learning for the Modern World",
    "Building a Community of Tech Pioneers",
    "Join Us to Shape the Future"
];

const images = [
    "https://placehold.co/800x400/E0F2F1/0056B3?text=Event+1", // Placeholder Event Image 1
    "https://placehold.co/800x400/D1F0E0/0056B3?text=Event+2", // Placeholder Event Image 2
    "https://placehold.co/800x400/C2EDD0/0056B3?text=Event+3",  // Placeholder Event Image 3
    "https://placehold.co/800x400/B3E9C0/0056B3?text=Event+4"   // Placeholder Event Image 4
];

function Academics() {
    const navigate = useNavigate();

    // Animation controls for the Programs section
    const programsControls = useAnimation();
    // Animation controls for the Events (Messages & Swiper) section
    const eventsControls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const programsSection = document.getElementById("programs-section-wrapper");
            const eventsSection = document.getElementById("event-section-container"); // New ID for events section
            const windowHeight = window.innerHeight;

            // Animate Programs section
            if (programsSection && programsSection.getBoundingClientRect().top < windowHeight - 150) {
                programsControls.start({ opacity: 1, y: 0, transition: { staggerChildren: 0.1 } });
            }

            // Animate Events section
            if (eventsSection && eventsSection.getBoundingClientRect().top < windowHeight - 150) {
                eventsControls.start({ opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } });
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check in case sections are already in view on load
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [programsControls, eventsControls]); // Add all controls as dependencies

    const handleCourseRedirect = (program) => {
        navigate('/courses', { state: { program } }); // Changed 'course' to 'program' for consistency
    };

    return (
        <div id="academics-section" className='container py-5 bg-light'> {/* Removed bg-light and inline style as it's in CSS */}
            <h2 className='text-center mb-4'>Programs we offer</h2>
            <hr className="section-divider" /> {/* Use new class for HR */}

            {/* Program Cards Section with Animation */}
            <motion.div
                id="programs-section-wrapper" // New ID for scroll animation target
                className='row g-4 mb-5 program-card-section bg-light'
                initial={{ opacity: 0, y: 50 }} // Initial animation from bottom
                animate={programsControls}
            >
                {programs.map((program, index) => (
                    <motion.div
                        key={index}
                        className='col-md-6 col-lg-4'
                        variants={{ // Variants for staggerChildren
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <div className='card program-card'> {/* Use new class */}
                            <div>
                                <h4>{program.title}</h4>
                                <p>
                                    {program.description.split('\n').map((line, i) => (
                                        <span key={i} className='program-description-line'>{line}</span>
                                    ))}
                                </p>
                            </div>
                            <button
                                className='btn btn-outline-dark mt-3 align-self-start btn-explore' // Use new class
                                onClick={() => handleCourseRedirect(program)}
                            >
                                Explore more
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

          

            {/* Image Swiper Section (Events) */}
            <div id="event-section-container" className="container my-5"> {/* New wrapper for event section */}
                <h2 className='text-center mb-4'>Events</h2>
                <hr className="section-divider" />
                <motion.div
                    className="row align-items-center"
                    initial={{ opacity: 0, y: 50 }} // Animate from bottom
                    animate={eventsControls}
                >
                    {/* Left - Messages */}
                    <motion.div
                        className="col-md-6"
                        variants={{ // Variants for staggerChildren within this row
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <div className="messages-box"> {/* Use new class */}
                            {messages.map((message, index) => (
                                <motion.h3
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    {message}
                                </motion.h3>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Image Carousel */}
                    <motion.div
                        className="col-md-6"
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            className="academics-swiper-container" // New class for this specific Swiper
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} alt={`Event ${index + 1}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Academics;