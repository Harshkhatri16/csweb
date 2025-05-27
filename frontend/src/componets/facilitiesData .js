import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './Facilities.css';

// Import icons from react-icons/fa (Font Awesome Solid)
import {
  FaLaptopCode,        // For computer labs
  FaWifi,              // For broadband connectivity
  FaBook,              // For library
  FaChalkboardTeacher, // For virtual classroom
  FaDesktop,           // CORRECTED: Using FaDesktop for projector/display
  FaCodeBranch,        // For project development
  FaUserTie,           // For communication/personality development
  FaHandshake,         // For collaboration
  FaLeaf               // For lush green campus
} from 'react-icons/fa';

const facilitiesData = [
  {
    title: 'Computer labs with modern hardware and networking',
    description: 'The department has four laboratories with total of more than 150 computers. Computers are equipped with Corei5, Core2Duo and AMD Athlon processors. The department also houses two Xeon servers.',
    icon: FaLaptopCode
  },
  {
    title: 'NMEICT 1 Gbps broadband leased line connectivity',
    description: 'Department is connected to the Ministry of Human Resources Development, Govt. of India\'s National Mission for Education through ICT. Under this scheme total bandwidth available with university is 1 Gbps.',
    icon: FaWifi
  },
  {
    title: 'Rich library with latest books, journals and magazines',
    description: 'Central Library of the university has more than 1000 titles in computing alongwith many other research and development related title.',
    icon: FaBook
  },
  {
    title: 'Interactive remote teaching through Virtual Classroom',
    description: 'The university houses a cutting edge Ekalavya Virtual Classroom which is used to connect departments with experts throughout the world. Using this classroom students can be benefited by the expertise of faculties and experts around the world virtually.',
    icon: FaChalkboardTeacher
  },
  {
    title: 'Fully furnished classrooms with mounted projectors',
    description: 'Most of the department\'s classrooms have mounted LCD projectors to enable teaching through ICT.',
    icon: FaDesktop // CORRECTED: Changed to FaDesktop
  },
  {
    title: 'In-house project development training',
    description: 'Every program offered at the department has special focus on the in-house project development. Students are guided individually by the faculties for the project development.',
    icon: FaCodeBranch
  },
  {
    title: 'Special curricula on communication skills and personality development',
    description: 'There are special curricula on communication skills and personality development to prepare IT professionals of world class.',
    icon: FaUserTie
  },
  {
    title: 'Collaboration with Babasaheb Ambedkar Open University, Ahmedabad',
    description: 'Babasaheb Ambedkar Open University, Ahmedabad offers special courses to department\'s students for environmental and cultural awareness.',
    icon: FaHandshake
  },
  {
    title: 'Lush green 200 acre campus with rich flora',
    description: 'Ours is a lush green campus with guest house, separate hostels for boys and girls and hygenic food court and mess. The campus houses rich flora of Kutch desert and it is also home to many birds.',
    icon: FaLeaf
  }
];

const Facilities = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const facilitiesSection = document.getElementById("facilities-section");
      const windowHeight = window.innerHeight;

      if (facilitiesSection) {
        const sectionTop = facilitiesSection.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 150) {
          controls.start("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div id="facilities-section" className="container my-5">
      <h2 className='text-center mb-4'>Our Facilities</h2>
      <hr className="section-divider" />

      <motion.div
        className="row g-4 justify-content-center facilities-grid"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {facilitiesData.map((facility, index) => (
          <motion.div
            key={index}
            className="col-12 col-md-6 col-lg-4 facility-card-col"
            variants={itemVariants}
          >
            <div className="card facility-card">
              {facility.icon && (
                <div className="facility-icon">
                  <facility.icon />
                </div>
              )}
              <h3>{facility.title}</h3>
              <p>{facility.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Facilities;