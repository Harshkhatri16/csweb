import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import { motion, useAnimation } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const AboutUs = () => {
    const [facultyData, setFacultyData] = useState([]); // This state is not currently used in the UI
    const [images, setImages] = useState([
        'https://placehold.co/600x400/E0F2F1/0056B3?text=Department+Image+1', // Placeholder image 1
        'https://placehold.co/600x400/D1F0E0/0056B3?text=Department+Image+2', // Placeholder image 2
        'https://placehold.co/600x400/C2EDD0/0056B3?text=Department+Image+3'  // Placeholder image 3
    ]);

    // Animation controls for the first section (About The Department)
    const aboutDeptControls = useAnimation();

    // Animation controls for the second section (Why Choose Computer Science?)
    const whyChooseControls = useAnimation();
    const cardControls = useAnimation();

    useEffect(() => {
        // --- Faculty Data Fetch (Placeholder) ---
        // This fetch call is present in your original code but not used in the UI.
        // Replace 'https://example.com/api/faculty' with your actual API endpoint.
        fetch('https://example.com/api/faculty')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setFacultyData(data))
            .catch((error) => console.error('Error fetching faculty data:', error));

        // --- Scroll Animation for "About The Department" section ---
        const handleAboutScroll = () => {
            const section = document.getElementById("about-section");
            if (section && section.getBoundingClientRect().top < window.innerHeight - 150) { // Adjusted threshold
                aboutDeptControls.start({ opacity: 1, x: 0 });
            }
        };

        // --- Scroll Animation for "Why Choose Computer Science?" section ---
        const handleWhyChooseScroll = () => {
            const section = document.getElementById("why-choose-cs-section");
            if (section && section.getBoundingClientRect().top < window.innerHeight - 150) { // Adjusted threshold
                whyChooseControls.start({ opacity: 1, y: 0 }); // Animate title from bottom
                cardControls.start({ opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }); // Stagger cards
            }
        };

        // Add scroll event listeners
        window.addEventListener('scroll', handleAboutScroll);
        window.addEventListener('scroll', handleWhyChooseScroll);

        // Initial check in case the section is already in view on load
        handleAboutScroll();
        handleWhyChooseScroll();

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('scroll', handleAboutScroll);
            window.removeEventListener('scroll', handleWhyChooseScroll);
        };
    }, [aboutDeptControls, whyChooseControls, cardControls]); // Dependencies for useEffect

    return (
        <>
            {/* --- Section 1: About The Department --- */}
            <div id="about-section" className="container my-2 bg-light">
                <h2>About The Department</h2>
                <hr />
                <div className="row align-items-center mb-5">
                    {/* Left - Department Info */}
                    <motion.div
                        className="col-md-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={aboutDeptControls}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <p className="about-department-info">
                            The Department of Computer Science was established in the year 2009. Initially, the department offered Integrated Master of Science in Computer Applications and IT. The department started three new programs M.Sc. (IT), MCA, and PGDCA in the year 2011. It has consistently fulfilled its role of producing Computer Engineers ready to satisfy the needs of the IT world. It has a well-qualified and experienced faculty team. The department has adequate facilities to support these teaching activities. As computers become obsolete fast, it is necessary to continuously upgrade the facilities. Students of the department have sufficient high-end computing facilities.
                        </p>
                    </motion.div>

                    {/* Right - Image Carousel */}
                    <motion.div
                        className="col-md-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={aboutDeptControls}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            className="swiper-container" /* Added class for custom styling */
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} alt={`Department Slide ${index + 1}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
                {/* Second HR for separation, if desired, or remove if the next section acts as separator */}
                {/* <hr style={{ width: '80%', height: '1px', backgroundColor: 'black', border: 'none', margin: '10px auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }} /> */}
            </div>

            {/* --- Section 2: Why Choose Computer Science? --- */}
            <div id="why-choose-cs-section" className="container bg-light">
                <div className="row g-4">
                    {/* Left Section: Why Choose Computer Science? Main Text */}
                    <motion.div
                        className="col-lg-5 col-md-12"
                        initial={{ opacity: 0, y: 50 }}
                        animate={whyChooseControls}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="cs-why-choose-section">
                            <h2>Why Choose <br /> Computer Science ?</h2>
                            <p>
                                Our Computer Science department teaches practical skills in programming
                                and modern technologies like AI and IOT, preparing students for great tech careers.
                                We prepare students for exciting careers in the growing tech industry. If you're
                                passionate about technology, this is the place to begin your journey.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Section: Feature Cards */}
                    <div className="col-lg-7 col-md-12">
                        <motion.div
                            className="row row-cols-1 row-cols-md-2 g-4"
                            initial={{ opacity: 0, y: 50 }}
                            animate={cardControls}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        >
                            {/* Card 1: Practical Studying */}
                            <motion.div className="col" variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}>
                                <div className="feature-card">
                                    <div className="icon">
                                        {/* SVG for Code/Practical Studying */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6ZM9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6Z"/>
                                        </svg>
                                    </div>
                                    <h3>Practical Studying</h3>
                                    <p>
                                        We focus on hands-on learning with real projects to help you
                                        apply your skills confidently in the tech world.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 2: Supportive Staff */}
                            <motion.div className="col" variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}>
                                <div className="feature-card">
                                    <div className="icon">
                                        {/* SVG for Supportive Staff (Users/Group) */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                                        </svg>
                                    </div>
                                    <h3>Supportive Staff</h3>
                                    <p>
                                        Our friendly and experienced teachers are always here to guide,
                                        support, and help you succeed.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 3: Career Guidance */}
                            <motion.div className="col-12" variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}>
                                <div className="feature-card">
                                    <div className="icon">
                                        {/* SVG for Career Guidance (Graduation Cap/Trophy) */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.19C11.39 11.19 10.87 11.02 10.44 10.69C10.01 10.36 9.68 9.94 9.44 9.44C9.21 8.94 9.1 8.39 9.1 7.79C9.1 7.19 9.21 6.64 9.44 6.14C9.68 5.64 10.01 5.22 10.44 4.89C10.87 4.56 11.39 4.39 12 4.39C12.61 4.39 13.13 4.56 13.56 4.89C13.99 5.22 14.32 5.64 14.56 6.14C14.79 6.64 14.9 7.19 14.9 7.79C14.9 8.39 14.79 8.94 14.56 9.44C14.32 9.94 13.99 10.36 13.56 10.69C13.13 11.02 12.61 11.19 12 11.19ZM12 19.31C10.05 19.31 8.41 18.52 7.08 16.94C5.75 15.36 5.1 13.36 5.1 11.19C5.1 9.02 5.75 7.02 7.08 5.44C8.41 3.86 10.05 3.86 12 3.07C13.95 3.07 15.59 3.86 16.92 5.44C18.25 7.02 18.9 9.02 18.9 11.19C18.9 13.36 18.25 15.36 16.92 16.94C15.59 18.52 13.95 19.31 12 19.31Z"/>
                                        </svg>
                                    </div>
                                    <h3>Career Guidance</h3>
                                    <p>
                                        We provide expert career counseling and workshops to help you
                                        reach your professional goals with confidence.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;