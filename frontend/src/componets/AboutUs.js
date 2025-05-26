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
    const [facultyData, setFacultyData] = useState([]);
    const [images, setImages] = useState([
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400'
    ]);
    const controls = useAnimation();

    useEffect(() => {
        fetch('https://example.com/api/faculty')
            .then((response) => response.json())
            .then((data) => setFacultyData(data))
            .catch((error) => console.error('Error fetching data:', error));

        const handleScroll = () => {
            const section = document.getElementById("about-section");
            if (section && section.getBoundingClientRect().top < window.innerHeight - 100) {
                controls.start({ opacity: 1, x: 0 });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [controls]);

    return (
        <>
            <div id="about-section" style={{ textAlign: 'center', padding: '50px' }}>
                <h2>About The Department</h2>
                <hr style={{ width: '80%', height: '1px', backgroundColor: 'black', border: 'none', margin: '10px auto' }} />
                <div className="row align-items-center mb-5">
                    {/* Left - Department Info */}
                    <motion.div 
                        className="col-md-6" 
                        style={{ textAlign: 'justify', padding: '0 20px' }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={controls}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <label>
                            The Department of Computer Science was established in the year 2009. Initially, the department offered Integrated Master of Science in Computer Applications and IT. The department started three new programs M.Sc. (IT), MCA, and PGDCA in the year 2011. It has consistently fulfilled its role of producing Computer Engineers ready to satisfy the needs of the IT world. It has a well-qualified and experienced faculty team. The department has adequate facilities to support these teaching activities. As computers become obsolete fast, it is necessary to continuously upgrade the facilities. Students of the department have sufficient high-end computing facilities.
                        </label>
                        
                    </motion.div>

                    {/* Right - Image Carousel */}
                    <motion.div 
                        className="col-md-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={controls}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                        <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={20} slidesPerView={1} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000 }} loop={true} style={{ marginBottom: '40px' }}>
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', borderRadius: '15px' }} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
                <hr style={{ width: '80%', height: '1px', backgroundColor: 'black', border: 'none', margin: '10px auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }} />
            </div>
        </>
    );
};

export default AboutUs;
