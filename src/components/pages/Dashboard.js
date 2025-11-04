import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Image from '../Images/Logo.png';
import { FaSearch, FaFilter, FaHeart, FaShoppingCart, FaBook, FaUser, FaHome, FaCheckCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  useEffect(() => {
    handleFilter();
  }, [searchQuery, category, sortBy, books]);

  const handleSearch = (e) => {
    e.preventDefault();
    let query = searchQuery.trim() || 'bestseller';
    
    if (category !== 'all') {
      query += `+subject:${category}`;
    }
    
    fetchBooks(query, sortBy);
  };

  const handleFilter = () => {
    let filtered = [...books];

    if (searchQuery) {
      filtered = filtered.filter(book => {
        const title = book.volumeInfo?.title?.toLowerCase() || '';
        const authors = book.volumeInfo?.authors?.join(' ').toLowerCase() || '';
        return title.includes(searchQuery.toLowerCase()) || 
               authors.includes(searchQuery.toLowerCase());
      });
    }

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
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const cartCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;
  const wishlistCount = JSON.parse(localStorage.getItem('wishlist'))?.length || 0;
  const readingListCount = JSON.parse(localStorage.getItem('readingList'))?.length || 0;
  const completedCount = JSON.parse(localStorage.getItem('completedBooks'))?.length || 0;

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: FaBook, label: 'Reading List', path: '/reading-list', badge: readingListCount },
    { icon: FaCheckCircle, label: 'Completed', path: '/reading-list', badge: completedCount },
    { icon: FaHeart, label: 'Wishlist', path: '/wishlist', badge: wishlistCount },
    { icon: FaShoppingCart, label: 'Cart', path: '/cart', badge: cartCount },
    { icon: FaUser, label: 'Profile', path: '/profile', badge: null },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000428, #004e92)' }}>
      {/* Left Sidebar */}
      <div 
        className={`${sidebarOpen ? '' : 'd-none d-lg-block'}`}
        style={{
          width: sidebarOpen ? '280px' : '0',
          transition: 'all 0.3s',
          background: 'linear-gradient(180deg, #000428, #004e92)',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          zIndex: 1040,
          boxShadow: '2px 0 10px rgba(0,0,0,0.3)'
        }}
      >
        {/* Logo Section */}
        <div className="p-4 text-center border-bottom border-secondary">
          <img src={Image} alt="Logo" width="60" height="50" className="mb-2" />
          <h4 className="text-white fw-bold mb-0">
            <span style={{ color: "#00d4ff" }}>Book</span>
            <span style={{ color: "#ff8a00" }}>Verse</span>
          </h4>
          <p className="text-white-50 small mb-0">Your Digital Library</p>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3">
          <ul className="list-unstyled">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => navigate(item.path)}
                  className="btn w-100 text-start text-white d-flex align-items-center justify-content-between p-3 rounded"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>
                    <item.icon className="me-3" />
                    {item.label}
                  </span>
                  {item.badge !== null && item.badge > 0 && (
                    <span className="badge bg-danger rounded-pill">{item.badge}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-3 mt-auto position-absolute bottom-0 w-100">
          <button
            onClick={handleLogout}
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center p-3 rounded"
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        style={{
          marginLeft: sidebarOpen ? '280px' : '0',
          flex: 1,
          transition: 'margin-left 0.3s',
          width: '100%'
        }}
      >
        {/* Top Header */}
        <div 
          className="sticky-top shadow-sm"
          style={{
            background: 'linear-gradient(90deg, #000428 100%, #004e92 0%)',
            zIndex: 1030
          }}
        >
          <div className="container-fluid py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-light me-3"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
                <h4 className="text-white mb-0">
                  Welcome to <span style={{ color: '#00d4ff' }}>BookVerse</span>
                </h4>
              </div>
              
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-light d-flex align-items-center gap-2"
                  onClick={() => navigate('/profile')}
                >
                  <FaUser />
                  <span className="d-none d-md-inline">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-fluid py-4">
          {/* Search and Filter Section */}
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <form onSubmit={handleSearch}>
                <div className="row g-3">
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
            <h5 className="text-white mb-0">
              {filteredBooks.length} Book{filteredBooks.length !== 1 ? 's' : ''} Found
            </h5>
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
                <button 
                  className="btn btn-warning mt-3" 
                  onClick={() => { 
                    setSearchQuery(''); 
                    setCategory('all'); 
                    fetchBooks(); 
                  }}
                >
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
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark"
          style={{ opacity: 0.5, zIndex: 1035 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;