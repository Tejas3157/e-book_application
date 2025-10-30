import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaBook, FaCheckCircle } from "react-icons/fa";

function ReadingList() {
  const navigate = useNavigate();
  const [readingList, setReadingList] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("readingList")) || [];
    const completed = JSON.parse(localStorage.getItem("completedBooks")) || [];
    setReadingList(list);
    setCompletedBooks(completed);
  }, []);

  const removeItem = (id) => {
    const updated = readingList.filter((item) => item.id !== id);
    localStorage.setItem("readingList", JSON.stringify(updated));
    setReadingList(updated);
  };

  const markAsCompleted = (book) => {
    // Remove from reading list
    const updatedList = readingList.filter((item) => item.id !== book.id);
    localStorage.setItem("readingList", JSON.stringify(updatedList));
    setReadingList(updatedList);

    // Add to completed books
    const updated = [...completedBooks, book];
    localStorage.setItem("completedBooks", JSON.stringify(updated));
    setCompletedBooks(updated);
  };

  const removeCompleted = (id) => {
    const updated = completedBooks.filter((item) => item.id !== id);
    localStorage.setItem("completedBooks", JSON.stringify(updated));
    setCompletedBooks(updated);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #000428, #004e92)', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-white">
            <FaBook className="me-2" />
            My Reading List
          </h3>
          <button className="btn btn-outline-light" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft className="me-1" /> Back
          </button>
        </div>

        {/* Currently Reading */}
        <div className="mb-5">
          <h4 className="text-white mb-3">Currently Reading</h4>
          <div className="row g-3">
            {readingList.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-light">No books in your reading list. Start adding some!</div>
              </div>
            ) : (
              readingList.map((book) => (
                <div className="col-md-3 col-sm-6" key={book.id}>
                  <div className="card shadow-sm border-0 h-100">
                    <img
                      src={
                        book.volumeInfo.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/150x200?text=No+Image"
                      }
                      className="card-img-top"
                      alt={book.volumeInfo.title}
                      style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                    <div className="card-body text-center">
                      <h6 className="text-truncate">{book.volumeInfo.title}</h6>
                      <small className="text-muted d-block mb-2">
                        {book.volumeInfo.authors?.[0] || "Unknown"}
                      </small>
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => markAsCompleted(book)}
                          title="Mark as completed"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeItem(book.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Completed Books */}
        <div>
          <h4 className="text-white mb-3">
            <FaCheckCircle className="me-2" />
            Completed Books
          </h4>
          <div className="row g-3">
            {completedBooks.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-light">No completed books yet. Keep reading!</div>
              </div>
            ) : (
              completedBooks.map((book) => (
                <div className="col-md-3 col-sm-6" key={book.id}>
                  <div className="card shadow-sm border-0 h-100 position-relative">
                    <div 
                      className="position-absolute top-0 end-0 m-2 bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '40px', height: '40px', zIndex: 1 }}
                    >
                      <FaCheckCircle />
                    </div>
                    <img
                      src={
                        book.volumeInfo.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/150x200?text=No+Image"
                      }
                      className="card-img-top"
                      alt={book.volumeInfo.title}
                      style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                    <div className="card-body text-center">
                      <h6 className="text-truncate">{book.volumeInfo.title}</h6>
                      <small className="text-muted d-block mb-2">
                        {book.volumeInfo.authors?.[0] || "Unknown"}
                      </small>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeCompleted(book.id)}
                      >
                        <FaTrash className="me-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadingList;