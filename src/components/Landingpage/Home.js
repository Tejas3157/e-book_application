import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
    return (
        <div>
            {/*  HOME SECTION  */}
            <section
                id="home"
                className="d-flex flex-column justify-content-center align-items-center text-center text-white p-3 p-md-5"
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #000428, #004e92)",
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
                    <Link to="/signup" className="btn btn-warning text-dark fw-semibold px-4 py-2 rounded-pill mx-2">
                        Join Now
                    </Link>
                    <Link to="/about" className="btn btn-outline-info fw-semibold px-4 py-2 rounded-pill mx-2">
                        Explore More
                    </Link>
                </div>
            </section>

        </div>
    )
}

export default Home
