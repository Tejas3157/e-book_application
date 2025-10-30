import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaBookmark, FaFont, FaMoon, FaSun, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`,
          {
            params: {
              key: 'AIzaSyBgmIp6nmfzvr76PTjxLiMB9_VetnY7vjE'
            }
          }
        );
        setBook(response.data);
        
        // Check if book is bookmarked
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
        if (bookmarks[id]) {
          setCurrentPage(bookmarks[id].page);
          setBookmarked(true);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book:', err);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const saveBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
    bookmarks[id] = {
      page: currentPage,
      title: book.volumeInfo.title,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setBookmarked(true);
  };

  const removeBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
    delete bookmarks[id];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setBookmarked(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!book || !book.volumeInfo.description) {
    return (
      <div className="container py-5 text-center">
        <h3>Preview not available for this book</h3>
        <p className="text-muted mb-4">This book doesn't have a text preview available.</p>
        {book?.volumeInfo.previewLink && (
          <a 
            href={book.volumeInfo.previewLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary me-2"
          >
            View on Google Books
          </a>
        )}
        <button className="btn btn-secondary" onClick={() => navigate(`/book/${id}`)}>
          Back to Book Details
        </button>
      </div>
    );
  }

  const info = book.volumeInfo;
  const content = info.description || 'No content available for preview.';
  
  // Split content into pages (simple pagination based on character count)
  const charsPerPage = 2000;
  const totalPages = Math.ceil(content.length / charsPerPage);
  const pageContent = content.substring(
    currentPage * charsPerPage,
    (currentPage + 1) * charsPerPage
  );

  const backgroundColor = darkMode ? '#1a1a1a' : '#f5f5f5';
  const textColor = darkMode ? '#e0e0e0' : '#333';
  const cardBg = darkMode ? '#2a2a2a' : '#ffffff';

  return (
    <div style={{ backgroundColor, minHeight: '100vh', transition: 'all 0.3s' }}>
      {/* Reader Header */}
      <div className="sticky-top shadow-sm" style={{ backgroundColor: darkMode ? '#2a2a2a' : '#fff', zIndex: 1000 }}>
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-4">
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate(`/book/${id}`)}
              >
                <FaArrowLeft className="me-2" />
                Back
              </button>
            </div>
            
            <div className="col-md-4 text-center">
              <h6 className="mb-0 text-truncate" style={{ color: textColor }}>
                {info.title}
              </h6>
              <small style={{ color: textColor, opacity: 0.7 }}>
                Page {currentPage + 1} of {totalPages}
              </small>
            </div>

            <div className="col-md-4 text-end">
              <div className="btn-group btn-group-sm me-2">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  title="Decrease font size"
                >
                  <FaFont style={{ fontSize: '12px' }} />
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  title="Increase font size"
                >
                  <FaFont style={{ fontSize: '18px' }} />
                </button>
              </div>

              <button 
                className={`btn btn-sm me-2 ${darkMode ? 'btn-warning' : 'btn-dark'}`}
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle dark mode"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              <button 
                className={`btn btn-sm ${bookmarked ? 'btn-success' : 'btn-outline-success'}`}
                onClick={bookmarked ? removeBookmark : saveBookmark}
                title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <FaBookmark />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div 
              className="card border-0 shadow-lg mb-4"
              style={{ 
                backgroundColor: cardBg,
                minHeight: '70vh'
              }}
            >
              <div className="card-body p-5">
                <div 
                  style={{ 
                    fontSize: `${fontSize}px`,
                    lineHeight: '1.8',
                    color: textColor,
                    textAlign: 'justify',
                    fontFamily: 'Georgia, serif'
                  }}
                  dangerouslySetInnerHTML={{ __html: pageContent }}
                />
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                <FaChevronLeft className="me-2" />
                Previous
              </button>

              <div className="text-center">
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max={totalPages - 1}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                  style={{ width: '200px' }}
                />
                <small style={{ color: textColor }}>
                  {Math.round((currentPage / (totalPages - 1)) * 100)}% Complete
                </small>
              </div>

              <button 
                className="btn btn-primary"
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
              >
                Next
                <FaChevronRight className="ms-2" />
              </button>
            </div>

            {/* Book Info Footer */}
            <div className="text-center" style={{ color: textColor, opacity: 0.7 }}>
              <small>
                {info.authors?.join(', ')} | {info.publisher} | {info.publishedDate}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookReader;