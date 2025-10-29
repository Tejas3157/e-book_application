import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  return (
    <div>
      {/* CONTACT SECTION */}
            <section
                id="contact"
                className="text-center text-white py-5 p-3 p-md-5 mt-5"
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #000428, #004e92)",
                }}
            >
                <div className="container py-4">
                    <h1 className="fw-bold mb-4">
                        Connect with <span style={{ color: "#00d4ff" }}>Book</span>
                        <span style={{ color: "#ff8a00" }}>Verse</span>
                    </h1>
                    <p className="lead mx-auto mb-5 " style={{ maxWidth: "700px", lineHeight: "1.7" }}>
                        At Bookverse, our readers are at the heart of everything we do. Whether you have a question about our collection, need technical assistance, want to suggest a feature, or just want to share your latest literary discovery, our team is here to help.
                    </p>

                    <form
                        className="mx-auto text-start"
                        style={{ maxWidth: "600px" }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="mb-3">
                            <label htmlFor="contactName" className="form-label text-light">Your Name</label>
                            <input type="text" className="form-control rounded-pill" id="contactName" placeholder="Enter your name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactEmail" className="form-label text-light">Email</label>
                            <input type="email" className="form-control rounded-pill" id="contactEmail" placeholder="Enter your email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactMessage" className="form-label text-light">Message</label>
                            <textarea
                                className="form-control rounded-4"
                                id="contactMessage"
                                rows="4"
                                placeholder="Write your message..."
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning text-dark fw-semibold rounded-pill px-4 py-2">
                                Send Message
                            </button>
                        </div>
                    </form>

                    <div className="mt-5 text-center">
                        <h3 className="fw-bold mb-3">How to Reach Us Directly:</h3>
                        <p className="mb-2">
                            <strong>General Inquiries & Support:</strong> <a href="mailto:support@bookverseapp.com" className="text-white text-decoration-none">support@bookverseapp.com</a>
                        </p>
                        <p className="mb-2">
                            <strong>Author & Publisher Partnerships:</strong> <a href="mailto:partnerships@bookverseapp.com" className="text-white text-decoration-none">partnerships@bookverseapp.com</a>
                        </p>
                        <p className="mb-4">
                            <strong>Media & Press:</strong> <a href="mailto:media@bookverseapp.com" className="text-white text-decoration-none">media@bookverseapp.com</a>
                        </p>

                        <h3 className="fw-bold mb-3">Follow Us:</h3>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="https://facebook.com/bookverseapp" target="_blank" rel="noopener noreferrer" className="text-info fs-4">
                                <FontAwesomeIcon icon={faFacebookF} /> 
                            </a>
                            <a href="https://twitter.com/bookverseapp" target="_blank" rel="noopener noreferrer" className="text-info fs-4">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://instagram.com/bookverseapp" target="_blank" rel="noopener noreferrer" className="text-info fs-4">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default Contact
