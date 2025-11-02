import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { FaSearch, FaFilter } from 'react-icons/fa';

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

    if (searchQuery) {
      filtered = filtered.filter(book => {
        const title = book.volumeInfo?.title?.toLowerCase() || '';
        const authors = book.volumeInfo?.authors?.join(' ').toLowerCase() || '';
        return title.includes(searchQuery.toLowerCase()) || 
               authors.includes(searchQuery.toLowerCase());
      });
    }

    // client-side category filtering when category is not 'all'
    if (category && category !== 'all') {
      filtered = filtered.filter(book => {
        const cats = book.volumeInfo?.categories || [];
        // categories can be strings like "Fiction" or arrays; normalize to array
        return cats.some(cat => cat.toLowerCase().includes(category.toLowerCase()));
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
  }, [books, searchQuery, sortBy, category]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <DashboardLayout>
      {/* Search and Filter Section */}
      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-3 p-md-4">
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-12 col-md-5">
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

              <div className="col-6 col-md-3">
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

              <div className="col-6 col-md-2">
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

              <div className="col-12 col-md-2">
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
      <div className="row g-3">
        {loading ? (
          <div className="col-12 text-center text-white py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading books...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="col-12 text-center text-white py-5">
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
              <div className="col-6 col-sm-4 col-md-3 col-xl-2 mb-3" key={item.id}>
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
                    <h6 className="card-title mb-1 text-truncate" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                      {title}
                    </h6>
                    <p className="card-text mb-0 text-truncate" style={{ fontSize: '0.75rem', color: '#888' }}>
                      {authors}
                    </p>
                    <p className="card-text mt-1" style={{ fontSize: '0.75rem', color: '#888' }}>
                      ⭐ {rating}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;