import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FaBook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="text-light pt-5 pb-3" style={{ background: "linear-gradient(90deg, #000428 100%, #004e92 0%)" }}>
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-3">
              <h3 className="fw-bold">
                <FaBook className="me-2" style={{ color: "#00d4ff" }} />
                <span style={{ color: "#00d4ff" }}>Book</span>
                <span style={{ color: "#ff8a00" }}>Verse</span>
              </h3>
              <p className="text-white-50 mb-3" style={{ lineHeight: "1.8" }}>
                Your ultimate digital reading companion. Discover, read, and share 
                thousands of books across all genres. Join our community of book lovers today!
              </p>
              <div className="d-flex gap-3">
                <a 
                  href="https://facebook.com/bookverseapp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline-light d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px", borderRadius: "50%", padding: "0" }}
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a 
                  href="https://twitter.com/bookverseapp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline-light d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px", borderRadius: "50%", padding: "0" }}
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a 
                  href="https://instagram.com/bookverseapp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline-light d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px", borderRadius: "50%", padding: "0" }}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: "#00d4ff" }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="#home" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#00d4ff"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#what-is" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('what-is'); }}
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#00d4ff"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  What is BookVerse
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#why-bookverse" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('why-bookverse'); }}
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#00d4ff"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  Why BookVerse
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#00d4ff"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#faq" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#00d4ff"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  FAQ's
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: "#ff8a00" }}>Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link 
                  to="/login" 
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#ff8a00"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/signup" 
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#ff8a00"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  Sign Up
                </Link>
              </li>
              <li className="mb-2">
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#ff8a00"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#home" 
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#ff8a00"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#home" 
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#ff8a00"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: "#00d4ff" }}>Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start">
                <FaEnvelope className="me-2 mt-1" style={{ color: "#ff8a00" }} />
                <div>
                  <a href="mailto:support@bookverseapp.com" className="text-white-50 text-decoration-none">
                    support@bookverseapp.com
                  </a>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaPhone className="me-2 mt-1" style={{ color: "#ff8a00" }} />
                <div>
                  <a href="tel:+911234567890" className="text-white-50 text-decoration-none">
                    +91 123 456 7890
                  </a>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="me-2 mt-1" style={{ color: "#ff8a00" }} />
                <div className="text-white-50">
                  BookVerse HQ<br />
                  Hyderabad, Telangana<br />
                  India - 500001
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="row mt-4 pt-4 border-top border-secondary">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-white-50">
              © 2025 <span style={{ color: "#00d4ff" }}>Book</span>
              <span style={{ color: "#ff8a00" }}>Verse</span>. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-white-50">
              Made with ❤️ for Book Lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
