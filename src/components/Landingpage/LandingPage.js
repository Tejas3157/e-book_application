import React from 'react'

function LandingPage() {
  return (
     <div style={{ background: 'linear-gradient(90deg, #03618dff 100% , #1C2E4C 0%)' }}>
       <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container-fluid">
            <a className="navbar-brand ms-lg-3 text-white fs-4 fw-bold m" href="/">
                <img src="https://res.cloudinary.com/deqfgxqqe/image/upload/v1755691091/Logo2_e_background_removal_f_png_e_improve_e_sharpen_mm6hlh.png"
                    alt="Logo here" width="50" height="50"></img>BOOKVERSE
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto h4">
                    <li className="nav-item mx-2"><a className="nav-link" href="/">Home</a></li>
                    <li className="nav-item mx-2"><a className="nav-link" href="/About">About</a></li>
                    <li className="nav-item mx-2"><a className="nav-link" href="/Contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
    </div>
  )
}

export default LandingPage
