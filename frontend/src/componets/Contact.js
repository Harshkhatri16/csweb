import React from 'react';
import './footer.css'; // Keep your custom CSS for additional styling if needed
import { BsGeoAltFill, BsTelephoneFill, BsEnvelopeFill, BsInstagram } from 'react-icons/bs';

function Contact() {
  return (
    <div id="contact-section">
      <footer className="footer bg-light py-5"> {/* Increased py-2 to py-5 for more vertical padding */}
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-lg-6 mb-4 mb-lg-0"> {/* Added mb-4 for spacing on smaller screens */}
              <h3 className="text-center text-lg-start mb-4"> {/* Centered on small, left-aligned on large */}
                <strong>Contact Us</strong>
              </h3>
              <div className="contact-info">
                <div className="contact-item d-flex align-items-start mb-3"> {/* Aligns icon to the top of text */}
                  <BsGeoAltFill className="me-3 mt-1" size={30} /> {/* Added mt-1 to slightly align icon */}
                  <div>
                    <h4 className="mb-1">Address</h4>
                    <p className="mb-0"> {/* Removed unnecessary paragraph margins */}
                      Department of Computer Science<br />
                      Krantiguru Shyamji Krishna Verma Kachchh University<br />
                      Bhuj-Mundra Road, Bhuj, Gujarat 370001
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-center justify-content-lg-start mt-4"> {/* Center buttons on small, left on large */}
                  {/* Call Button */}
                  <a href="tel:+155895548855" className="btn btn-outline-dark me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}> {/* Added width/height for perfect circle */}
                    <BsTelephoneFill size={25} />
                  </a>

                  {/* Email Button */}
                  {/* Note: Direct link to GMail search might not be ideal for all users. Consider mailto: */}
                  <a href="mailto:cs@kutchuni.edu.in" className="btn btn-outline-dark me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <BsEnvelopeFill size={25} />
                  </a>

                  {/* Instagram Button */}
                  <a href="https://www.instagram.com/cs_kskvku/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <BsInstagram size={25} />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="col-lg-6">
              <h3 className="text-center text-lg-start mb-4"> {/* Centered on small, left-aligned on large */}
                <strong>Location Map</strong>
              </h3>
              <div className="map-container rounded shadow-sm overflow-hidden"> {/* Added rounded corners and shadow */}
               <iframe
              title="map"
              // REPLACE THIS LINE WITH THE ACTUAL URL YOU COPIED FROM GOOGLE MAPS
              src="https://www.google.com/maps/place/Krantiguru+Shyamji+Krishna+Verma+Kachchh+University/@23.2139221,69.6519474,17z/data=!3m2!4b1!5s0x39511e2322bd09a5:0xae41d2f71d1ee9d3!4m6!3m5!1s0x39511e31bb8dab5d:0xc4ad3a3601f5bdd3!8m2!3d23.2139172!4d69.6545223!16s%2Fm%2F03c0tdp?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;