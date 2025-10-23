import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (

        //  <Navbar expand="lg" style={{ background: 'linear-gradient(90deg, #03618dff 100% , #1C2E4C 0%)' }} variant="dark">
        //     <Container>
        //         {/* Left: Logo */}
        //         <Navbar.Brand href="/" style={{ fontWeight: 'bold', letterSpacing: '2px', marginRight: '100px' }}>
        //             E-BookApp
        //         </Navbar.Brand>
        //         <Navbar.Toggle aria-controls="main-navbar-nav" />
        //         <Navbar.Collapse id="main-navbar-nav">
        //             {/* Center: Nav Links */}
        //             <Nav className=" mr-20" style={{ fontSize:'20px', fontWeight: '500', gap: '20px' }}>
        //                 <Nav.Link as={Link} to="/" style={{ color: '#f8f9fa' }}>Home</Nav.Link>
        //                 <Nav.Link as={Link} to="/features" style={{ color: '#f8f9fa'}}>About</Nav.Link>
        //                 <Nav.Link as={Link} to="/pricing" style={{ color: '#f8f9fa' }}>Contact</Nav.Link>

        //             </Nav>
        //             {/* Right: Login & Sign Up */}
        //             <div className="d-flex align-items-center ms-auto" style={{ fontSize:'18px',fontWeight: '500', gap: '10px' }}>
        //                 <Nav.Link as={Link} to="/login" style={{ color: '#f8f9fa' }}>Login</Nav.Link>
        //                 <Nav.Link
        //                     as={Link}
        //                     to="/signup"
        //                     style={{
        //                         color: '#f8f9fa',
        //                         background: '#1d6bd1ff',
        //                         borderRadius: '4px',
        //                         marginLeft: '8px',
        //                         padding: '6px 16px'
        //                     }}
        //                 >
        //                     Sign Up
        //                 </Nav.Link>
        //             </div>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>


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
    )
}

export default Header