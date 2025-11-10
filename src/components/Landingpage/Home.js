import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Book1 from "../../assests/books/book2.jpg";
import Book2 from "../../assests/books/book1.jpg";
import Book3 from "../../assests/books/book3.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FaBook, FaUsers, FaStar, FaRocket, FaShieldAlt, FaMobileAlt, FaChevronDown } from 'react-icons/fa';

const ImageList = [
    {
        id: 1,
        img: Book1,
        title: "His Life will forever be Changed",
        description: "A compelling journey through self-discovery and transformation that will captivate readers from start to finish.",
    },
    {
        id: 2,
        img: Book2,
        title: "Who's there",
        description: "A thrilling mystery that keeps you on the edge of your seat with unexpected twists at every turn.",
    },
    {
        id: 3,
        img: Book3,
        title: "Lost Boy",
        description: "An emotional tale of adventure, courage, and finding your way home against all odds.",
    },
];

function Home() {
    const [imageId, setImageId] = useState(Book1);
    const [title, setTitle] = useState("His Life will forever be Changed");
    const [description, setDescription] = useState(ImageList[0].description);
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const faqs = [
        {
            question: "What is BookVerse?",
            answer: "BookVerse is a premium digital library platform that provides access to thousands of e-books across all genres. We offer a seamless reading experience with personalized recommendations, bookmarking features, and a beautiful interface designed for book lovers."
        },
        {
            question: "How do I create an account?",
            answer: "Creating an account is simple! Click on the 'Sign Up' button in the navigation menu, fill in your details including name, email, and password, and you're ready to start your reading journey. It takes less than a minute!"
        },
        {
            question: "Is BookVerse free to use?",
            answer: "BookVerse offers both free and premium features. You can browse our collection, add books to your wishlist, and maintain reading lists for free. Premium features and certain exclusive books may require a subscription or one-time purchase."
        },
        {
            question: "Can I read books offline?",
            answer: "Currently, BookVerse operates online to provide the best reading experience. However, we're working on an offline reading feature that will be available soon. Stay tuned for updates!"
        },
        {
            question: "How do I track my reading progress?",
            answer: "BookVerse automatically tracks your reading progress! You can mark books as 'Currently Reading' or 'Completed' in your Reading List. We also save your bookmarks so you can pick up right where you left off."
        },
        {
            question: "Can I share my reading lists with friends?",
            answer: "We're currently developing social features that will allow you to share reading lists, recommendations, and reviews with your friends. This feature will be launching soon!"
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital payment methods. All transactions are secure and encrypted for your safety."
        },
        {
            question: "How do I contact support?",
            answer: "You can reach our support team through the Contact section on this page, or email us directly at support@bookverseapp.com. We typically respond within 24 hours!"
        }
    ];

    return (
        <div>
            {/* HERO SECTION */}
            <section
                id="home"
                className="d-flex flex-column justify-content-center text-white py-5 mt-5"
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #000428, #004e92)",
                }}
            >
                <div className="container py-5">
                    <div className="row align-items-center g-4 justify-content-center">
                        {/* Text Section */}
                        <div className="col-lg-6 col-md-12">
                            <h1 className="fw-bold display-3 mb-4 animate-fade-in">
                                Welcome to <span style={{ color: "#00d4ff" }}>Book</span>
                                <span style={{ color: "#ff8a00" }}>Verse</span>
                            </h1>

                            <p className="lead mb-4" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                                Dive into a boundless universe of stories, knowledge, and inspiration.
                                Experience seamless reading, personalized recommendations, and a world
                                built for book lovers.
                            </p>

                            <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                                <Link to="/signup" className="btn btn-warning btn-lg fw-semibold px-5 py-3 rounded-pill">
                                    Join Now
                                </Link>
                                <a href="#about" className="btn btn-outline-info btn-lg fw-semibold px-5 py-3 rounded-pill">
                                    Explore More
                                </a>
                            </div>

                            {/* Featured Book */}
                            <div className="mt-5 p-4 rounded" style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
                                <h4 className="fw-bold mb-3">{title}</h4>
                                <p className="mb-3" style={{ fontSize: "0.95rem" }}>{description}</p>
                                <Link to="/signup" className="btn btn-info px-4 py-2 rounded-pill fw-bold">
                                    Order Now
                                </Link>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="col-lg-6 col-md-12">
                            <div className="d-flex flex-column align-items-center">
                                <img
                                    src={imageId}
                                    alt="Book"
                                    className="img-fluid mb-4 rounded shadow-lg"
                                    style={{ maxHeight: "450px", objectFit: "contain" }}
                                />

                                {/* Thumbnails */}
                                <div className="d-flex gap-3 flex-wrap justify-content-center">
                                    {ImageList.map((item) => (
                                        <img
                                            key={item.id}
                                            src={item.img}
                                            alt="Book thumbnail"
                                            style={{
                                                width: "90px",
                                                height: "90px",
                                                cursor: "pointer",
                                                objectFit: "cover",
                                                border: imageId === item.img ? "3px solid #00d4ff" : "2px solid rgba(255,255,255,0.3)",
                                                transition: "all 0.3s"
                                            }}
                                            className="rounded shadow-sm"
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

                    {/* Scroll Down Indicator */}
                    <div className="text-center mt-5">
                        <a href="#what-is" className="text-white text-decoration-none">
                            <FaChevronDown className="animate-bounce" style={{ fontSize: "2rem" }} />
                        </a>
                    </div>
                </div>
            </section>

            {/* WHAT IS BOOKVERSE SECTION */}
            <section
                id="what-is"
                className="text-white py-5"
                style={{
                    background: "linear-gradient(135deg, #004e92, #000428)",
                }}
            >
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5 mb-3">
                            What is <span style={{ color: "#00d4ff" }}>Book</span>
                            <span style={{ color: "#ff8a00" }}>Verse</span>?
                        </h2>
                        <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
                            Your Ultimate Digital Reading Companion
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                <FaBook className="mb-3" style={{ fontSize: "3rem", color: "#00d4ff" }} />
                                <h4 className="fw-bold mb-3">Vast Digital Library</h4>
                                <p style={{ lineHeight: "1.8" }}>
                                    Access thousands of e-books across all genres - from bestselling fiction to 
                                    academic texts. Our carefully curated collection ensures quality and variety 
                                    for every type of reader.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                <FaMobileAlt className="mb-3" style={{ fontSize: "3rem", color: "#ff8a00" }} />
                                <h4 className="fw-bold mb-3">Read Anywhere, Anytime</h4>
                                <p style={{ lineHeight: "1.8" }}>
                                    Seamless reading experience across all devices. Start reading on your laptop 
                                    and continue on your phone. Your progress is automatically saved and synced 
                                    across all platforms.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                <FaStar className="mb-3" style={{ fontSize: "3rem", color: "#00d4ff" }} />
                                <h4 className="fw-bold mb-3">Personalized Experience</h4>
                                <p style={{ lineHeight: "1.8" }}>
                                    Smart recommendations based on your reading history and preferences. 
                                    Discover new authors and genres tailored just for you. Track your reading 
                                    goals and celebrate milestones.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                <FaUsers className="mb-3" style={{ fontSize: "3rem", color: "#ff8a00" }} />
                                <h4 className="fw-bold mb-3">Community of Readers</h4>
                                <p style={{ lineHeight: "1.8" }}>
                                    Join a vibrant community of book lovers. Share your favorite reads, create 
                                    reading lists, and connect with fellow bibliophiles who share your passion 
                                    for literature.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY BOOKVERSE SECTION */}
            <section
                id="why-bookverse"
                className="text-white py-5"
                style={{
                    background: "linear-gradient(135deg, #000428, #004e92)",
                }}
            >
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5 mb-3">
                            Why Choose <span style={{ color: "#00d4ff" }}>Book</span>
                            <span style={{ color: "#ff8a00" }}>Verse</span>?
                        </h2>
                        <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
                            Experience the Future of Reading
                        </p>
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-md-4">
                            <div className="text-center p-4 h-100 rounded" style={{ background: "rgba(0, 212, 255, 0.1)" }}>
                                <div className="mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "80px", height: "80px", background: "#00d4ff" }}>
                                    <FaRocket style={{ fontSize: "2rem", color: "#000428" }} />
                                </div>
                                <h5 className="fw-bold mb-3">Lightning Fast</h5>
                                <p>Instant access to your books. No waiting, no downloads. Start reading in seconds with our optimized platform.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="text-center p-4 h-100 rounded" style={{ background: "rgba(255, 138, 0, 0.1)" }}>
                                <div className="mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "80px", height: "80px", background: "#ff8a00" }}>
                                    <FaShieldAlt style={{ fontSize: "2rem", color: "#000428" }} />
                                </div>
                                <h5 className="fw-bold mb-3">Secure & Private</h5>
                                <p>Your data is protected with industry-standard encryption. Read with confidence knowing your privacy is our priority.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="text-center p-4 h-100 rounded" style={{ background: "rgba(0, 212, 255, 0.1)" }}>
                                <div className="mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "80px", height: "80px", background: "#00d4ff" }}>
                                    <FaStar style={{ fontSize: "2rem", color: "#000428" }} />
                                </div>
                                <h5 className="fw-bold mb-3">Premium Quality</h5>
                                <p>Curated selection of high-quality books. Every title is verified for formatting and readability excellence.</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to="/signup" className="btn btn-warning btn-lg fw-semibold px-5 py-3 rounded-pill">
                            Start Reading Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section
                id="about"
                className="text-white py-5"
                style={{
                    background: "linear-gradient(135deg, #004e92, #000428)",
                }}
            >
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5 mb-3">
                            About <span style={{ color: "#00d4ff" }}>Book</span>
                            <span style={{ color: "#ff8a00" }}>Verse</span>
                        </h2>
                        <p className="lead">Our Story, Our Mission</p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="mb-4">
                                <p className="lead" style={{ lineHeight: "2", textAlign: "justify" }}>
                                    BookVerse was born from a simple passion: the profound joy of reading and the 
                                    desire to make it more accessible, enjoyable, and engaging for everyone. In an 
                                    increasingly digital world, we envisioned a platform that not only hosts a vast 
                                    array of e-books but also celebrates the rich tapestry of human storytelling and knowledge.
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="lead" style={{ lineHeight: "2", textAlign: "justify" }}>
                                    Our mission is to create a seamless bridge between readers and authors, between 
                                    curiosity and enlightenment. We are dedicated to curating a premium digital library 
                                    that caters to diverse tastes and interests, from the casual reader to the ardent 
                                    bibliophile. We believe that technology should enhance, not diminish, the magic of 
                                    turning a page — or in our case, swiping one.
                                </p>
                            </div>

                            <div className="row g-4 mt-4">
                                <div className="col-md-6">
                                    <div className="p-4 h-100 rounded" style={{ background: "rgba(0, 212, 255, 0.1)" }}>
                                        <h5 className="fw-bold mb-3" style={{ color: "#00d4ff" }}>📚 Curating Excellence</h5>
                                        <p>Providing access to a hand-picked selection of high-quality e-books across all genres.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-4 h-100 rounded" style={{ background: "rgba(255, 138, 0, 0.1)" }}>
                                        <h5 className="fw-bold mb-3" style={{ color: "#ff8a00" }}>✨ Enhancing Experience</h5>
                                        <p>Offering an intuitive, beautiful, and feature-rich reading environment.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-4 h-100 rounded" style={{ background: "rgba(255, 138, 0, 0.1)" }}>
                                        <h5 className="fw-bold mb-3" style={{ color: "#ff8a00" }}>🔍 Fostering Discovery</h5>
                                        <p>Helping readers find their next favorite book and authors connect with new audiences.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-4 h-100 rounded" style={{ background: "rgba(0, 212, 255, 0.1)" }}>
                                        <h5 className="fw-bold mb-3" style={{ color: "#00d4ff" }}>💪 Empowering Readers</h5>
                                        <p>Making reading convenient, flexible, and tailored to your lifestyle.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-5">
                                <p className="lead fst-italic">
                                    Thank you for being a part of the BookVerse journey. We invite you to explore, 
                                    discover, and lose yourself in a world of words.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section
                id="faq"
                className="text-white py-5"
                style={{
                    background: "linear-gradient(135deg, #000428, #004e92)",
                }}
            >
                <div className="container py-5">
                    <div className="row g-4 align-items-center">
                        {/* Left Side - Help Text with Animation */}
                        <div className="col-lg-5">
                            <div className="text-center p-4 rounded" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                {/* Lottie Animation */}
                                <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                                    <DotLottieReact
                                        src="https://lottie.host/986fdb44-fbd4-4d8d-b2d5-c57f4ae06fac/NFtKW7c6Hd.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>
                                
                                <h3 className="fw-bold mt-4 mb-3">Any Questions?</h3>
                                <p className="lead mb-3">Find answers here.</p>
                                <p className="text-white-50 mb-4">
                                    Don't find your answer here? Just send us a message for any query.
                                </p>
                                <a 
                                    href="#contact" 
                                    className="btn btn-warning fw-semibold px-4 py-2 rounded-pill"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>

                        {/* Right Side - FAQ Questions */}
                        <div className="col-lg-7">
                            <h2 className="fw-bold display-5 mb-4">Frequently Asked Questions</h2>
                            <div className="accordion" id="faqAccordion">
                                {faqs.map((faq, index) => (
                                    <div className="accordion-item mb-3 border-0 rounded overflow-hidden" key={index}
                                        style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                        <h2 className="accordion-header">
                                            <button
                                                className={`accordion-button fw-bold ${activeAccordion !== index ? 'collapsed' : ''}`}
                                                type="button"
                                                onClick={() => toggleAccordion(index)}
                                                style={{
                                                    background: activeAccordion === index ? "rgba(0, 212, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
                                                    color: "#fff",
                                                    border: "none"
                                                }}
                                            >
                                                {faq.question}
                                            </button>
                                        </h2>
                                        <div className={`accordion-collapse collapse ${activeAccordion === index ? 'show' : ''}`}>
                                            <div className="accordion-body text-white-50" style={{ lineHeight: "1.8" }}>
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section
                id="contact"
                className="text-white py-5"
                style={{
                    background: "linear-gradient(135deg, #004e92, #000428)",
                }}
            >
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5 mb-3">
                            Connect with <span style={{ color: "#00d4ff" }}>Book</span>
                            <span style={{ color: "#ff8a00" }}>Verse</span>
                        </h2>
                        <p className="lead mx-auto" style={{ maxWidth: "700px", lineHeight: "1.7" }}>
                            At BookVerse, our readers are at the heart of everything we do. Whether you have a 
                            question about our collection, need technical assistance, want to suggest a feature, 
                            or just want to share your latest literary discovery, our team is here to help.
                        </p>
                    </div>

                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-6">
                            <form
                                className="p-4 rounded"
                                style={{ background: "rgba(255, 255, 255, 0.05)" }}
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="mb-3">
                                    <label htmlFor="contactName" className="form-label">Your Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control rounded-pill" 
                                        id="contactName" 
                                        placeholder="Enter your name" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contactEmail" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control rounded-pill" 
                                        id="contactEmail" 
                                        placeholder="Enter your email" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contactMessage" className="form-label">Message</label>
                                    <textarea
                                        className="form-control rounded-4"
                                        id="contactMessage"
                                        rows="4"
                                        placeholder="Write your message..."
                                        required
                                    ></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning text-dark fw-semibold rounded-pill px-5 py-2">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-md-4">
                            <div className="text-center p-4 rounded h-100" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                <h5 className="fw-bold mb-3">General Inquiries & Support</h5>
                                <a href="mailto:support@bookverseapp.com" className="text-info text-decoration-none">
                                    support@bookverseapp.com
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center p-4 rounded h-100" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                <h5 className="fw-bold mb-3">Author & Publisher Partnerships</h5>
                                <a href="mailto:partnerships@bookverseapp.com" className="text-info text-decoration-none">
                                    partnerships@bookverseapp.com
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center p-4 rounded h-100" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                <h5 className="fw-bold mb-3">Media & Press</h5>
                                <a href="mailto:media@bookverseapp.com" className="text-info text-decoration-none">
                                    media@bookverseapp.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h4 className="fw-bold mb-4">Follow Us</h4>
                        <div className="d-flex justify-content-center gap-4">
                            <a href="https://facebook.com/bookverseapp" target="_blank" rel="noopener noreferrer" 
                                className="text-white" style={{ fontSize: "2rem", transition: "color 0.3s" }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "#00d4ff"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="https://twitter.com/bookverseapp" target="_blank" rel="noopener noreferrer" 
                                className="text-white" style={{ fontSize: "2rem", transition: "color 0.3s" }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "#00d4ff"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}>
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://instagram.com/bookverseapp" target="_blank" rel="noopener noreferrer" 
                                className="text-white" style={{ fontSize: "2rem", transition: "color 0.3s" }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "#00d4ff"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce {
                    animation: bounce 2s infinite;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 1s ease-out;
                }
            `}</style>
        </div>
    );
}

export default Home;