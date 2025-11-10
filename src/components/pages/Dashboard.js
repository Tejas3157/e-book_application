import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import { FaSearch, FaFilter, FaHeart, FaShoppingCart, FaBook, FaStar } from 'react-icons/fa';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

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
    fetchBooks();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    let query = searchQuery.trim() || 'bestseller';
    
    if (category !== 'all') {
      query += `+subject:${category}`;
    }
    
    fetchBooks(query, sortBy);
  };

  const handleBookClick = async (bookId) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`,
        {
          params: {
            key: 'AIzaSyBgmIp6nmfzvr76PTjxLiMB9_VetnY7vjE'
          }
        }
      );
      setSelectedBook(response.data);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching book details:', err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find(item => item.id === selectedBook.id);
    
    if (!exists) {
      wishlist.push(selectedBook);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setToast({ show: true, message: 'Added to wishlist!', type: 'success' });
    } else {
      setToast({ show: true, message: 'Already in wishlist!', type: 'warning' });
    }
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2000);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item.id === selectedBook.id);
    
    if (!exists) {
      cart.push(selectedBook);
      localStorage.setItem('cart', JSON.stringify(cart));
      setToast({ show: true, message: 'Added to cart!', type: 'success' });
    } else {
      setToast({ show: true, message: 'Already in cart!', type: 'warning' });
    }
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2000);
  };

  const addToReadingList = () => {
    const readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    const exists = readingList.find(item => item.id === selectedBook.id);
    
    if (!exists) {
      readingList.push(selectedBook);
      localStorage.setItem('readingList', JSON.stringify(readingList));
      setToast({ show: true, message: 'Added to reading list!', type: 'success' });
    } else {
      setToast({ show: true, message: 'Already in reading list!', type: 'warning' });
    }
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2000);
  };

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
      <div className="row g-3 g-md-4">
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
              <div className="col-6 col-sm-4 col-lg-3 col-xl-2-4 col-xxl-2 mb-3" key={item.id}>
                <div 
                  className="card h-100 shadow-sm border-0" 
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onClick={() => handleBookClick(item.id)}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="card-img-top"
                      style={{ 
                        height: '280px', 
                        objectFit: 'cover', 
                        borderRadius: '8px 8px 0 0',
                        width: '100%'
                      }}
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted"
                      style={{ height: '280px', borderRadius: '8px 8px 0 0' }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="card-body p-3">
                    <h6 
                      className="card-title mb-2 text-truncate" 
                      style={{ fontSize: '0.95rem', fontWeight: 600 }}
                      title={title}
                    >
                      {title}
                    </h6>
                    <p 
                      className="card-text mb-1 text-truncate" 
                      style={{ fontSize: '0.8rem', color: '#666' }}
                      title={authors}
                    >
                      {authors}
                    </p>
                    <p className="card-text mt-2 mb-0" style={{ fontSize: '0.85rem', color: '#888' }}>
                      ⭐ {rating}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Book Details Modal */}
      {showModal && selectedBook && (
        <>
          <div 
            className="modal-backdrop fade show" 
            style={{ zIndex: 1040 }}
            onClick={closeModal}
          />
          <div 
            className="modal fade show d-block" 
            style={{ zIndex: 1050 }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Book Details</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={closeModal}
                  />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-4 text-center mb-3 mb-md-0">
                      <img
                        src={
                          selectedBook.volumeInfo.imageLinks?.thumbnail ||
                          selectedBook.volumeInfo.imageLinks?.smallThumbnail ||
                          'https://via.placeholder.com/300x400?text=No+Image'
                        }
                        alt={selectedBook.volumeInfo.title}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '400px' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <h3 className="fw-bold mb-3">{selectedBook.volumeInfo.title}</h3>
                      <p className="text-muted mb-2">
                        <strong>Author(s):</strong> {selectedBook.volumeInfo.authors?.join(', ') || 'Unknown'}
                      </p>
                      <p className="text-muted mb-2">
                        <strong>Publisher:</strong> {selectedBook.volumeInfo.publisher || 'N/A'}
                      </p>
                      <p className="text-muted mb-2">
                        <strong>Published:</strong> {selectedBook.volumeInfo.publishedDate || 'N/A'}
                      </p>
                      <p className="text-muted mb-2">
                        <strong>Pages:</strong> {selectedBook.volumeInfo.pageCount || 'N/A'}
                      </p>
                      <p className="text-muted mb-2">
                        <strong>Categories:</strong> {selectedBook.volumeInfo.categories?.join(', ') || 'N/A'}
                      </p>
                      <div className="mb-3">
                        <strong>Rating:</strong>{' '}
                        <span className="text-warning">
                          <FaStar /> {selectedBook.volumeInfo.averageRating || 'No rating'}
                        </span>
                        {selectedBook.volumeInfo.ratingsCount && (
                          <span className="text-muted ms-2">
                            ({selectedBook.volumeInfo.ratingsCount} ratings)
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <strong>Description:</strong>
                        <div 
                          className="mt-2" 
                          style={{ maxHeight: '200px', overflowY: 'auto', textAlign: 'justify' }}
                          dangerouslySetInnerHTML={{ 
                            __html: selectedBook.volumeInfo.description || 'No description available.' 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={addToWishlist}>
                    <FaHeart className="me-2" />
                    Add to Wishlist
                  </button>
                  <button className="btn btn-success" onClick={addToCart}>
                    <FaShoppingCart className="me-2" />
                    Add to Cart
                  </button>
                  <button className="btn btn-info text-white" onClick={addToReadingList}>
                    <FaBook className="me-2" />
                    Add to Reading List
                  </button>
                  {selectedBook.volumeInfo.previewLink && (
                    <a 
                      href={selectedBook.volumeInfo.previewLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-warning"
                    >
                      Preview Book
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`toast show align-items-center text-bg-${toast.type} border-0 position-fixed bottom-0 end-0 m-3`}
          style={{ zIndex: 9999 }}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
          </div>
        </div>
      )}

      <style>{`
        /* 5 books per row for 1200px to 1500px */
        @media (min-width: 1200px) and (max-width: 1499px) {
          .col-xl-2-4 {
            flex: 0 0 auto;
            width: 20%;
          }
        }
        
        /* 6 books per row for screens 1500px and above */
        @media (min-width: 1500px) {
          .col-xxl-2 {
            flex: 0 0 auto;
            width: 16.666667%;
          }
        }
        
        /* Ensure proper spacing on all screen sizes */
        @media (max-width: 575.98px) {
          .col-6 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

export default Dashboard;