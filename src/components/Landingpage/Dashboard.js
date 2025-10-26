import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#2563eb' }}>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
      <div className="mb-4">
        <button onClick={handleLogout} className="btn btn-danger me-2">Logout</button>
        <button className="btn btn-secondary">Settings</button>
      </div>
      <h4 className="mt-5 mb-3" style={{ color: '#185a9d' }}>Popular Books</h4>
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
  );
}

export default Dashboard;