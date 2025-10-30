import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaHeart, FaShoppingCart, FaBook, FaStar } from 'react-icons/fa';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchBookDetails = async () => {
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
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ show: false, message: '', type: '' }), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find(item => item.id === book.id);
    
    if (!exists) {
      wishlist.push(book);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setToast({ show: true, message: 'Added to wishlist!', type: 'success' });
    } else {
      setToast({ show: true, message: 'Already in wishlist!', type: 'warning' });
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item.id === book.id);
    
    if (!exists) {
      cart.push(book);
      localStorage.setItem('cart', JSON.stringify(cart));
      setToast({ show: true, message: 'Added to cart!', type: 'success' });
    } else {
      setToast({ show: true, message: 'Already in cart!', type: 'warning' });
    }
  };

  const addToReadingList = () => {
    const readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    const exists = readingList.find(item => item.id === book.id);
    
    if (!exists) {
      readingList.push(book);
      localStorage.setItem('readingList', JSON.stringify(readingList));
      setToast({ show: true, message: 'Added to reading list!', type: 'success' });
    } else {
      setToast({ show: true, message: 'Already in reading list!', type: 'warning' });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000428, #004e92)' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container py-5 text-center">
        <h3>Book not found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const info = book.volumeInfo || {};
  const image = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || 'https://via.placeholder.com/300x400?text=No+Image';
  const title = info.title || 'Untitled';
  const authors = info.authors?.join(', ') || 'Unknown Author';
  const publisher = info.publisher || 'Unknown Publisher';
  const publishedDate = info.publishedDate || 'N/A';
  const pageCount = info.pageCount || 'N/A';
  const categories = info.categories?.join(', ') || 'N/A';
  const rating = info.averageRating || 'No rating';
  const ratingsCount = info.ratingsCount || 0;
  const description = info.description || 'No description available.';
  const language = info.language || 'N/A';
  const previewLink = info.previewLink;

  return (
    <div style={{ background: 'linear-gradient(135deg, #000428, #004e92)', minHeight: '100vh' }}>
      <div className="container py-5">
        <button className="btn btn-outline-light mb-4" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </button>

        <div className="card shadow-lg border-0">
          <div className="card-body p-4">
            <div className="row">
              {/* Book Image */}
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <img 
                  src={image} 
                  alt={title} 
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                />
                
                {/* Action Buttons */}
                <div className="mt-4 d-flex flex-column gap-2">
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
                  {previewLink && (
                    <a href={previewLink} target="_blank" rel="noopener noreferrer" className="btn btn-warning">
                      Preview Book
                    </a>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className="col-md-8">
                <h1 className="fw-bold mb-3" style={{ color: '#000428' }}>{title}</h1>
                <h5 className="text-muted mb-3">by {authors}</h5>

                {/* Rating */}
                <div className="mb-3">
                  <span className="text-warning fs-5">
                    <FaStar /> {rating}
                  </span>
                  <span className="text-muted ms-2">({ratingsCount} ratings)</span>
                </div>

                {/* Book Info Grid */}
                <div className="row mb-4">
                  <div className="col-6 col-md-4 mb-3">
                    <strong>Publisher:</strong>
                    <p className="mb-0 text-muted">{publisher}</p>
                  </div>
                  <div className="col-6 col-md-4 mb-3">
                    <strong>Published:</strong>
                    <p className="mb-0 text-muted">{publishedDate}</p>
                  </div>
                  <div className="col-6 col-md-4 mb-3">
                    <strong>Pages:</strong>
                    <p className="mb-0 text-muted">{pageCount}</p>
                  </div>
                  <div className="col-6 col-md-4 mb-3">
                    <strong>Language:</strong>
                    <p className="mb-0 text-muted">{language.toUpperCase()}</p>
                  </div>
                  <div className="col-12 col-md-8 mb-3">
                    <strong>Categories:</strong>
                    <p className="mb-0 text-muted">{categories}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="fw-bold mb-3">Description</h4>
                  <div 
                    className="text-muted" 
                    style={{ lineHeight: '1.8', textAlign: 'justify' }}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default BookDetails;