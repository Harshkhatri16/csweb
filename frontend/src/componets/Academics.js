import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, useAnimation } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Faculty from './Faculty';
import './Academics.css';

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
  "https://via.placeholder.com/800x400",
  "https://via.placeholder.com/800x400",
  "https://via.placeholder.com/800x400",
  "https://via.placeholder.com/800x400"
];

function Academics() {
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const academicsSection = document.getElementById("academics-section");
      const windowHeight = window.innerHeight;

      if (academicsSection) {
        const sectionTop = academicsSection.getBoundingClientRect().top;
        
        // Trigger animation if section is in view
        if (sectionTop < windowHeight - 100) {
          controls.start({ opacity: 1, x: 0 });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const handleCourseRedirect = (course) => {
    navigate('/courses', { state: { course } });
  };

  return (
    <div id="academics-section" className='container py-5 bg-light' style={{ backgroundColor: '#ffffff', color: '#333' }}>
      <h2 className='text-center mb-4' style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Programs we offer</h2>
      
      {/* Program Cards Section with Animation */}
      <motion.div 
        className='row g-4 mb-5'
        initial={{ opacity: 0, x: -100 }}
        animate={controls}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {programs.map((program, index) => (
          <div key={index} className='col-md-6 col-lg-4'>
            <div className='card p-4 d-flex flex-column justify-content-between' 
              style={{ backgroundColor: 'rgb(209, 215, 224)', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', minHeight: '250px' }}
            >
              <div>
                <h4>{program.title}</h4>
                <p>{program.description.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block', marginBottom: '0.5rem' }}>{line}</span>
                ))}</p>
              </div>
              <button 
                className='btn btn-outline-dark mt-3 align-self-start' 
                style={{ borderRadius: '30px' }} 
                onClick={() => handleCourseRedirect(program)}
              >
                Explore more
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      <h2 style={{ textAlign: 'center', padding: '10px' }}>Members of The Faculty</h2>
      <Faculty />
      
      {/* Image Swiper Section */}
      <h2 id="event-section" className='text-center mb-4'>Events</h2>
    
      {/* New Slider Section with Messages */}
      <div className="row align-items-center mb-5">
        {/* Left - Messages */}
        <motion.div 
          className="col-md-6"
          initial={{ opacity: 0, x: -50 }}
          animate={controls}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div 
            className="p-4" 
            style={{ 
              backgroundColor: 'rgb(229, 215, 245)',  // light blue background
              borderRadius: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            {messages.map((message, index) => (
              <h3 
                key={index} 
                style={{ 
                  fontWeight: '600', 
                  marginBottom: '1.5rem', 
                
                  color: 'rgb(41, 41, 41)'  // dark teal text
                }}
              >
                {message}
              </h3>
            ))}
          </div>
        </motion.div>

        {/* Right - Image Carousel */}
        <motion.div 
          className="col-md-6"
          initial={{ opacity: 0, x: 50 }}
          animate={controls}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            style={{ marginBottom: '40px' }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Event ${index + 1}`} style={{ width: '100%', borderRadius: '15px' }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
}

export default Academics;
