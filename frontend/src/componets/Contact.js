import React from 'react';
import './footer.css';
import { BsGeoAltFill, BsTelephoneFill, BsEnvelopeFill, BsInstagram } from 'react-icons/bs';

function Contact() {
  return (
    <div id="contact-section">



      <footer className="footer bg-light py-2">
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-lg-6 ">
              <h3 style={{ paddingLeft: '250px', textDecoration: 'underline' }}><strong>Contact Us</strong> </h3>
              <div className="contact-info">
                <div className="contact-item mb-3 d-flex" style={{ flexDirection: 'column' }}>
                  <BsGeoAltFill className="me-3" size={30} />
                  <h4>Address</h4>
                  <div>
                    <p >
                      Department of Computer Science<br />
                      Krantiguru Shyamji Krishna Verma Kachchh University<br />
                      Bhuj-Mundra Road, Bhuj, Gujarat 370001
                    </p>
                  </div>
                </div>

                <div className="contact-item mb-3 d-flex align-items-center">
                  {/* Call Button */}
                  <a href="tel:+155895548855" className="btn btn-outline-dark me-3" style={{ borderRadius: '50%' }}>
                    <BsTelephoneFill size={25} />
                  </a>

                  {/* Email Button */}
                  <a href="https://mail.google.com/mail/u/0/#search/cs%40kutchuni.edu.in" className="btn btn-outline-dark me-3" style={{ borderRadius: '50%' }}>
                    <BsEnvelopeFill size={25} />
                  </a>

                  {/* Instagram Button */}
                  <a href="https://www.instagram.com/cs_kskvku/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark me-3" style={{ borderRadius: '50%' }}>
                    <BsInstagram size={25} />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="col-lg-6">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.3519646068293!2d69.6519474!3d23.2139172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39511e31bb8dab5d%3A0xc4ad3a3601f5bdd3!2sKrantiguru%20Shyamji%20Krishna%20Verma%20Kachchh%20University!5e0!3m2!1sen!2sin!4v1689959339270!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
