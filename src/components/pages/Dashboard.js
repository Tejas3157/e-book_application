import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Image from '../Images/Logo.png';
import { FaSearch, FaFilter, FaHeart, FaShoppingCart, FaBook, FaUser } from 'react-icons/fa';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'all', 'fiction', 'non-fiction', 'science', 'history', 
    'biography', 'fantasy', 'mystery', 'romance', 'technology'
  ];

  const fetchBooks = async (query = 'subject:fiction', orderBy = 'relevance') => {
    try {
      setLoading(true);
      setError('');
      
      const requests = Array.from({ length: 5 }).map((_, index) =>
        axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: query,
            maxResults: 40,
            startIndex: index * 40,
            projection: 'lite',
            orderBy: orderBy,
            key: 'AIzaSyBgmIp6nmfzvr76PTjxLiMB9_VetnY7vjE'
          }
        })
      );

      const responses = await Promise.all(requests);
      const allBooks = responses.reduce((acc, res) => {
        const items = res.data && res.data.items ? res.data.items : [];
        return [...acc, ...items];
      }, []);

      setBooks(allBooks);
      setFilteredBooks(allBooks);
      setLoading(false);
    } catch (err) {
      console.error('fetchBooks error', err);
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let query = searchQuery.trim() || 'bestseller';
    
    if (category !== 'all') {
      query += `+subject:${category}`;
    }
    
    fetchBooks(query, sortBy);
  };

  const handleFilter = useCallback(() => {
    let filtered = [...books];

    // Filter by search query in title or author
    if (searchQuery) {
      filtered = filtered.filter(book => {
        const title = book.volumeInfo?.title?.toLowerCase() || '';
        const authors = book.volumeInfo?.authors?.join(' ').toLowerCase() || '';
        return title.includes(searchQuery.toLowerCase()) || 
               authors.includes(searchQuery.toLowerCase());
      });
    }

    // Sort books
    if (sortBy === 'title') {
      filtered.sort((a, b) => {
        const titleA = a.volumeInfo?.title || '';
        const titleB = b.volumeInfo?.title || '';
        return titleA.localeCompare(titleB);
      });
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => {
        const ratingA = a.volumeInfo?.averageRating || 0;
        const ratingB = b.volumeInfo?.averageRating || 0;
        return ratingB - ratingA;
      });
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => {
        const dateA = a.volumeInfo?.publishedDate || '';
        const dateB = b.volumeInfo?.publishedDate || '';
        return dateB.localeCompare(dateA);
      });
    }

    setFilteredBooks(filtered);
  }, [books, searchQuery, sortBy]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const cartCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;
  const wishlistCount = JSON.parse(localStorage.getItem('wishlist'))?.length || 0;

  return (
    <div>
      {/* Header */}
      <div className="fixed-top shadow-sm" style={{ background: "linear-gradient(90deg, #000428 100%, #004e92 0%)", zIndex: 1030 }}>
        <nav className="navbar navbar-expand-lg navbar-dark py-3">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center ms-lg-3 fs-3 fw-bold" style={{ cursor: 'pointer' }}>
              <img src={Image} alt="Logo" width="50" height="40" className="me-2" />
              <span style={{ color: "#00d4ff" }}>Book</span>
              <span style={{ color: "#ff8a00" }}>Verse</span>
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto text-center my-2 my-lg-0">
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white" onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white position-relative" onClick={() => navigate('/reading-list')}>
                    <FaBook className="me-1" /> Reading List
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white position-relative" onClick={() => navigate('/wishlist')}>
                    <FaHeart className="me-1" /> Wishlist
                    {wishlistCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white position-relative" onClick={() => navigate('/cart')}>
                    <FaShoppingCart className="me-1" /> Cart
                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </li>
              </ul>

              <div className="d-flex justify-content-center justify-content-lg-end mt-2 mt-lg-0 gap-2">
                <button className="btn btn-outline-info rounded-pill" onClick={() => navigate('/profile')}>
                  <FaUser className="me-1" /> Profile
                </button>
                <button onClick={handleLogout} className="btn btn-danger rounded-pill">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <section style={{ background: 'linear-gradient(135deg, #000428, #004e92)', minHeight: '100vh', paddingTop: '100px' }}>
        <div className="container py-4">
          {/* Search and Filter Section */}
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <form onSubmit={handleSearch}>
                <div className="row g-3">
                  {/* Search Input */}
                  <div className="col-md-5">
                    <div className="input-group">
                      <span className="input-group-text bg-primary text-white">
                        <FaSearch />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="col-md-3">
                    <div className="input-group">
                      <span className="input-group-text bg-info text-white">
                        <FaFilter />
                      </span>
                      <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="col-md-2">
                    <select
                      className="form-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="relevance">Relevance</option>
                      <option value="title">Title A-Z</option>
                      <option value="rating">Rating</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                      {loading ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Results Count */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-white mb-0">
              {filteredBooks.length} Book{filteredBooks.length !== 1 ? 's' : ''} Found
            </h4>
          </div>

          {/* Error Message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Books Grid */}
          <div className="row">
            {loading ? (
              <div className="text-center text-white py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading books...</p>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center text-white py-5">
                <h5>No books found matching your criteria.</h5>
                <button className="btn btn-warning mt-3" onClick={() => { setSearchQuery(''); setCategory('all'); fetchBooks(); }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredBooks.map(item => {
                const info = item.volumeInfo || {};
                const title = info.title || 'Untitled';
                const authors = info.authors ? info.authors.join(', ') : 'Unknown author';
                const image = (info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) || '';
                const rating = info.averageRating || '—';

                return (
                  <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={item.id}>
                    <div 
                      className="card h-100 shadow-sm border-0" 
                      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      onClick={() => navigate(`/book/${item.id}`)}
                    >
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
                        <h6 className="card-title mb-1 text-truncate" style={{ fontSize: '1rem', fontWeight: 600 }}>
                          {title}
                        </h6>
                        <p className="card-text mb-0 text-truncate" style={{ fontSize: '0.85rem', color: '#888' }}>
                          {authors}
                        </p>
                        <p className="card-text mt-1" style={{ fontSize: '0.85rem', color: '#888' }}>
                          ⭐ {rating}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;