import React from "react";
import { Link } from "react-router-dom";
import Book1 from "../../assests/books/book2.jpg";
import Book2 from "../../assests/books/book1.jpg";
import Book3 from "../../assests/books/book3.jpg";

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
    );
}

export default Home;
