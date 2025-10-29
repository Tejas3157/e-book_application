import React from 'react'


function About() {
  return (
    <div>
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
    </div>
  )
}

export default About
