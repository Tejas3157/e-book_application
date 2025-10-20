import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
     <Navbar expand="lg" style={{ background: 'linear-gradient(135deg, #1C2E4C 0%, #03618dff 100%)' }} variant="dark">
            <Container>
                {/* Left: Logo */}
                <Navbar.Brand href="/" style={{ fontWeight: 'bold', letterSpacing: '2px', marginRight: '100px' }}>
                    E-BookApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    {/* Center: Nav Links */}
                    <Nav className=" mr-20" style={{ fontSize:'20px', fontWeight: '500', gap: '20px' }}>
                        <Nav.Link href="/" style={{ color: '#f8f9fa' }}>Home</Nav.Link>
                        <Nav.Link href="/features" style={{ color: '#f8f9fa'}}>About</Nav.Link>
                        <Nav.Link href="/pricing" style={{ color: '#f8f9fa' }}>Contact</Nav.Link>

                    </Nav>
                    {/* Right: Login & Sign Up */}
                    <div className="d-flex align-items-center ms-auto" style={{ fontSize:'18px',fontWeight: '500', gap: '10px' }}>
                        <Nav.Link href="/login" style={{ color: '#f8f9fa' }}>Login</Nav.Link>
                        <Nav.Link
                            href="/signup"
                            style={{
                                color: '#f8f9fa',
                                background: '#1d6bd1ff',
                                borderRadius: '4px',
                                marginLeft: '8px',
                                padding: '6px 16px'
                            }}
                        >
                            Sign Up
                        </Nav.Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header