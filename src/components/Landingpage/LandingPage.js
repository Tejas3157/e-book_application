import React from 'react'
import Image from '../Images/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div>
            {/* NAVBAR */}
            <div>
                <div className=" fixed-top shadow-sm" style={{ background: "linear-gradient(90deg, #000428 100%, #004e92 0% )", zIndex: 1030, }}>
                    <nav className="navbar navbar-expand-lg navbar-dark py-3">
                        <div className="container-fluid">
                            {/* Brand */}
                            <a className="navbar-brand d-flex align-items-center ms-lg-3 fs-3 fw-bold" href="#home">
                                <img
                                    src={Image}
                                    alt="Logo"
                                    width="50"
                                    height="40"
                                    className="me-2"
                                />
                                <span style={{ color: "#00d4ff" }}>Book</span>
                                <span style={{ color: "#ff8a00" }}>Verse</span>
                            </a>

                            {/* Toggle for Mobile */}
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            {/* Links */}
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav mx-auto text-center h4 my-2 my-lg-0">
                                    <li className="nav-item mx-lg-3"><a className="nav-link" href="#home">Home</a></li>
                                    <li className="nav-item mx-lg-3"> <a className="nav-link" href="#about">About</a></li>
                                    <li className="nav-item mx-lg-3"><a className="nav-link" href="#contact">Contact</a></li>
                                </ul>

                                {/* Buttons */}
                                <div className="d-flex justify-content-center justify-content-lg-end mt-2 mt-lg-0">
                                    <Link to="/login" className="btn btn-outline-info me-2 px-3 rounded-pill fw-semibold">
                                        Login
                                    </Link >
                                    <Link to="/signup" className="btn btn-warning text-dark px-3 rounded-pill fw-semibold">
                                        Signup
                                    </Link >
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/*  HOME SECTION  */}
            <section
                id="home"
                className="d-flex flex-column justify-content-center align-items-center text-center text-white p-3 p-md-5"
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg,#000428, #004e92)",
                }}
            >
                <h1 className="fw-bold display-4 mb-3">
                    Welcome to <span style={{ color: "#00d4ff" }}>Book</span>
                    <span style={{ color: "#ff8a00" }}>Verse</span>
                </h1>
                <p className="lead mx-auto mb-4 text-break " style={{ maxWidth: "700px", lineHeight: "1.8", fontSize: "1.2rem" }}>
                    Dive into an boundless universe of stories, knowledge, and inspiration. Bookverse brings thousands of e-books directly to your fingertips, transforming the way you read. Discover new authors, explore hidden gems, and enrich your mind with our ever-expanding digital library. Experience seamless reading across all your devices, personalized recommendations, and a community dedicated to the love of books.
                </p>
                <div className="mt-4">
                    <a href="#signup" className="btn btn-warning text-dark fw-semibold px-4 py-2 rounded-pill mx-2">
                        Join Now
                    </a>
                    <a href="#about" className="btn btn-outline-info fw-semibold px-4 py-2 rounded-pill mx-2">
                        Explore More
                    </a>
                </div>
            </section>

            {/*  ABOUT SECTION */}
            <section
                id="about"
                className="text-center text-white py-5 p-3 p-md-5"
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #000428, #004e92)",
                }}
            >
                <div className="container py-5">
                    <h1 className="fw-bold mb-4">
                        About
                        <span style={{ color: "#00d4ff" }}>Book</span>
                        <span style={{ color: "#ff8a00" }}>Verse</span>
                    </h1>
                    <div className=' text-start lead'>
                        <p
                            className="mx-auto mb-4"
                            style={{ maxWidth: "800px", lineHeight: "1.8" }}
                        >
                            Bookverse was born from a simple passion: the profound joy of reading and the desire to make it more accessible, enjoyable, and engaging for everyone. In an increasingly digital world, we envisioned a platform that not only hosts a vast array of e-books but also celebrates the rich tapestry of human storytelling and knowledge.
                        </p>
                        <p
                            className="mx-auto mb-4"
                            style={{ maxWidth: "800px", lineHeight: "1.8" }}
                        >
                            Our mission is to create a seamless bridge between readers and authors, between curiosity and enlightenment. We are dedicated to curating a premium digital library that caters to diverse tastes and interests, from the casual reader to the ardent bibliophile. We believe that technology should enhance, not diminish, the magic of turning a page – or in our case, swiping one.
                        </p>
                        <p
                            className="mx-auto"
                            style={{ maxWidth: "800px", lineHeight: "1.8" }}
                        >
                            We are committed to:
                            <ul>
                                <li>Curating Excellence: Providing access to a hand-picked selection of high-quality e-books across all genres.</li>
                                <li>Enhancing the Experience: Offering an intuitive, beautiful, and feature-rich reading environment.</li>
                                <li>Fostering Discovery: Helping readers find their next favorite book and authors connect with new audiences.</li>
                                <li>Empowering Readers: Making reading convenient, flexible, and tailored to your lifestyle.</li>
                            </ul>
                            Thank you for being a part of the Bookverse journey. We invite you to explore, discover, and lose yourself in a world of words.
                        </p>

                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section
                id="contact"
                className="text-center text-white py-5 p-3 p-md-5"
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

            {/*  FOOTER  */}
            <footer className="text-center text-light py-4 bottom-0 w-100" style={{ background: "linear-gradient(90deg, #000428 100%, #004e92 0% )", }} >
                <p className="mb-0">
                    © 2025 <span style={{ color: "#00d4ff" }}>Book</span>
                    <span style={{ color: "#ff8a00" }}>Verse</span>. All Rights Reserved.
                </p>
            </footer>
        </div>
    )
}

export default LandingPage
