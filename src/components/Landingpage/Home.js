import React from "react";
import { Link } from "react-router-dom";
import Book1 from "../../assests/books/book2.jpg";
import Book2 from "../../assests/books/book1.jpg";
import Book3 from "../../assests/books/book3.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const ImageList = [
    {
        id: 1,
        img: Book1,
        title: "His Life will forever be Changed",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 2,
        img: Book2,
        title: "Who's there",
        description:
            "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 3,
        img: Book3,
        title: "Lost Boy",
        description:
            "Lost Boy, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
];

function Home() {
    const [imageId, setImageId] = React.useState(Book1);
    const [title, setTitle] = React.useState("His Life will forever be Changed");
    const [description, setDescription] = React.useState(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );

    return (
        <div>
            <section
                id="home"
                className="d-flex flex-column justify-content-center text-white py-5 p-3 p-md-5 mt-5"
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #000428, #004e92)",
                }}
            >
                <div className="container">
                    <div className="row align-items-center">

                        {/* Text Section */}
                        <div className="col-md-6 text-center text-md-start mb-4">
                            <h1 className="fw-bold display-4 mb-3">
                                Welcome to <span style={{ color: "#00d4ff" }}>Book</span>
                                <span style={{ color: "#ff8a00" }}>Verse</span>
                            </h1>

                            <p className="lead" style={{ maxWidth: "650px", lineHeight: "1.6" }}>
                                Dive into a boundless universe of stories, knowledge, and inspiration.
                                Experience seamless reading, personalized recommendations, and a world
                                built for book lovers.
                            </p>



                            <div className="mt-3">
                                <Link to="/signup" className="btn btn-warning fw-semibold px-4 py-2 rounded-pill me-2">
                                    Join Now
                                </Link>
                                <Link to="/about" className="btn btn-outline-info fw-semibold px-4 py-2 rounded-pill">
                                    Explore More
                                </Link>

                                <div className="mt-5">
                                    <h2 className="fw-bold mt-4">{title}</h2>
                                    <p className="text-light">{description}</p>
                                    <Link to="/signup" className="btn btn-info px-4 py-2 rounded-pill fw-bold">
                                        Order Now
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="col-md-6 d-flex flex-column align-items-center">
                            <img
                                src={imageId}
                                alt="Book"
                                className="img-fluid mb-3 rounded shadow"
                                style={{ maxHeight: "380px", objectFit: "contain" }}
                            />

                            {/* Small Thumbnails */}
                            <div className="d-flex gap-3">
                                {ImageList.map((item) => (
                                    <img
                                        key={item.id}
                                        src={item.img}
                                        alt="Book thumbnail"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            cursor: "pointer",
                                            objectFit: "contain",
                                        }}
                                        className="border rounded shadow-sm hover-shadow"
                                        onClick={() => {
                                            setImageId(item.img);
                                            setTitle(item.title);
                                            setDescription(item.description);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
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
                <div className="container py-5">
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
    );
}

export default Home;
