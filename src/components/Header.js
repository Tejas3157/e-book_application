import React from 'react';
import Image from './Images/Logo.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <div
                className="fixed-top shadow-sm"
                style={{
                    background: "linear-gradient(90deg, #000428 100%, #004e92 0%)",
                    zIndex: 1030,
                }}
            >
                <nav className="navbar navbar-expand-lg navbar-dark py-3">
                    <div className="container-fluid">
                        {/* Brand */}
                        <Link
                            className="navbar-brand d-flex align-items-center ms-lg-3 fs-3 fw-bold"
                            to="/"
                        >
                            <img
                                src={Image}
                                alt="Logo"
                                width="50"
                                height="40"
                                className="me-2"
                            />
                            <span style={{ color: "#00d4ff" }}>Book</span>
                            <span style={{ color: "#ff8a00" }}>Verse</span>
                        </Link>

                        {/* Toggle for Mobile */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* Links */}
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav mx-auto text-center h4 my-2 my-lg-0">
                                {['Home', 'About', 'Contact'].map((item) => (
                                    <li key={item} className="nav-item mx-lg-3 position-relative">
                                        <a
                                            className="nav-link fw-semibold nav-animate"
                                            href={item === 'Home' ? '#home' : `#${item.toLowerCase()}`}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Buttons */}
                            <div className="d-flex justify-content-center justify-content-lg-end mt-2 mt-lg-0">
                                <Link
                                    to="/login"
                                    className="btn btn-outline-info me-2 px-3 rounded-pill fw-semibold"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="btn btn-warning text-dark px-3 rounded-pill fw-semibold"
                                >
                                    Signup
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Custom Animations */}
            <style>
                {`
                .nav-animate {
                    color: #f0f0f0 !important;
                    position: relative;
                    transition: color 0.3s ease;
                }

                .nav-animate::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0%;
                    height: 2px;
                    background-color: #00d4ff;
                    transition: width 0.3s ease-in-out;
                }

                .nav-animate:hover {
                    color: #00d4ff !important;
                }

                .nav-animate:hover::after {
                    width: 100%;
                }

                .nav-animate:active {
                    color: #ff8a00 !important;
                }
                `}
            </style>
        </div>
    );
}

export default Header;
