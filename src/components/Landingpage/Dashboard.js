import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Image from '../Images/Logo.png';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      setError('');
      // We'll fetch 200 books in parallel (5 requests of 40 books each)
      const requests = Array.from({ length: 5 }).map((_, index) =>
        axios.get(
          'https://www.googleapis.com/books/v1/volumes',
          {
            params: {
              q: 'subject:fiction', // You can adjust the search query
              maxResults: 40,       // Maximum allowed per request
              startIndex: index * 40,
              projection: 'lite',
              orderBy: 'relevance',
              key: 'AIzaSyBgmIp6nmfzvr76PTjxLiMB9_VetnY7vjE'
            }
          }
        )
      );

      const responses = await Promise.all(requests);

      // Combine all books from the responses
      const allBooks = responses.reduce((acc, res) => {
        const items = res.data && res.data.items ? res.data.items : [];
        return [...acc, ...items];
      }, []);

      setBooks(allBooks);
    } catch (err) {
      console.error('fetchBooks error', err);
      setError('Failed to fetch books. Please try again later.');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div>
      <div className=" fixed-top shadow-sm" style={{ background: "linear-gradient(90deg, #000428 100%, #004e92 0% )", zIndex: 1030, }}>
        <nav className="navbar navbar-expand-lg navbar-dark py-3">
          <div className="container-fluid">
            {/* Brand */}
            <a className="navbar-brand d-flex align-items-center ms-lg-3 fs-3 fw-bold">
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
                <h2 className="mb-4" style={{ color: '#00d4ff' }}>Welcome to the Bookverse!</h2>
              </ul>

              {/* Buttons */}
              <div className="d-flex justify-content-center justify-content-lg-end mt-2 mt-lg-0">
                <button onClick={handleLogout} className="btn btn-danger rounded-pill me-2">Logout</button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <section style={{ background: 'linear-gradient(135deg, #000428, #004e92)' }}>
      <div className="container py-4 mt-5" >
        <h4 className="mt-5 mb-3" style={{ color: '#00d4ff' }}>Popular Books</h4>
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        <div className="row">
          {books.map(item => {
            const info = item.volumeInfo || {};
            const title = info.title || 'Untitled';
            const authors = info.authors ? info.authors.join(', ') : 'Unknown author';
            const image = (info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) || '';
            const rating = info.averageRating || '—';

            return (
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={item.id}>
                <div className="card h-100 shadow-sm border-0">
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="card-img-top"
                      style={{ height: '250px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted"
                      style={{ height: '250px', borderRadius: '8px 8px 0 0' }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1" style={{ fontSize: '1rem', fontWeight: 600 }}>{title}</h6>
                    <p className="card-text mb-0" style={{ fontSize: '0.85rem', color: '#888' }}>
                      {authors}
                    </p>
                    <p className="card-text mt-1" style={{ fontSize: '0.85rem', color: '#888' }}>
                      ⭐ {rating}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {(!error && books.length === 0) && (
            <div className="text-center text-muted py-5">Loading books...</div>
          )}
        </div>
      </div>
      </section>
    </div>
  );
}

export default Dashboard;