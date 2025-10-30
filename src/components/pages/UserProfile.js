import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaEdit, FaBook, FaHeart, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';

function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  // User data
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    bio: 'Book lover and avid reader',
    favoriteGenre: 'Fiction',
    joinDate: 'January 2025'
  });

  // Stats
  const [stats, setStats] = useState({
    readingList: 0,
    completed: 0,
    wishlist: 0,
    cart: 0
  });

  useEffect(() => {
    // Load user data from localStorage
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (savedProfile) {
      setUserData(savedProfile);
    }

    // Calculate stats
    const readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    const completedBooks = JSON.parse(localStorage.getItem('completedBooks')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    setStats({
      readingList: readingList.length,
      completed: completedBooks.length,
      wishlist: wishlist.length,
      cart: cart.length
    });
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ show: false, message: '', type: '' }), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(userData));
    setIsEditing(false);
    setToast({ show: true, message: 'Profile updated successfully!', type: 'success' });
  };

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #000428, #004e92)', minHeight: '100vh' }}>
      <div className="container py-5">
        <button className="btn btn-outline-light mb-4" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </button>

        <div className="row g-4">
          {/* Profile Card */}
          <div className="col-lg-4">
            <div className="card shadow-lg border-0">
              <div className="card-body text-center p-4">
                <div 
                  className="mx-auto mb-3 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '120px', height: '120px', fontSize: '48px' }}
                >
                  <FaUser />
                </div>
                <h4 className="fw-bold">{userData.firstName} {userData.lastName}</h4>
                <p className="text-muted mb-3">{userData.email}</p>
                <p className="text-muted small">Member since {userData.joinDate}</p>
                
                {!isEditing && (
                  <button 
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit className="me-2" />
                    Edit Profile
                  </button>
                )}

                {/* Stats */}
                <div className="mt-4">
                  <h6 className="fw-bold mb-3">Reading Statistics</h6>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="p-3 bg-light rounded">
                        <FaBook className="text-info fs-4 mb-2" />
                        <h5 className="mb-0">{stats.readingList}</h5>
                        <small className="text-muted">Reading</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 bg-light rounded">
                        <FaCheckCircle className="text-success fs-4 mb-2" />
                        <h5 className="mb-0">{stats.completed}</h5>
                        <small className="text-muted">Completed</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 bg-light rounded">
                        <FaHeart className="text-danger fs-4 mb-2" />
                        <h5 className="mb-0">{stats.wishlist}</h5>
                        <small className="text-muted">Wishlist</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 bg-light rounded">
                        <FaShoppingCart className="text-warning fs-4 mb-2" />
                        <h5 className="mb-0">{stats.cart}</h5>
                        <small className="text-muted">Cart</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Profile Information</h4>
                
                <form onSubmit={handleSave}>
                  <div className="row g-3">
                    {/* First Name */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">First Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Last Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          value={userData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaPhone />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          value={userData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {/* Favorite Genre */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Favorite Genre</label>
                      <select
                        className="form-select"
                        value={userData.favoriteGenre}
                        onChange={(e) => handleChange('favoriteGenre', e.target.value)}
                        disabled={!isEditing}
                      >
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Biography">Biography</option>
                        <option value="History">History</option>
                      </select>
                    </div>

                    {/* Bio */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">Bio</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={userData.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    {/* Buttons */}
                    {isEditing && (
                      <div className="col-12 d-flex gap-2 justify-content-end">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-success">
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card shadow-lg border-0 mt-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Quick Actions</h5>
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-primary" onClick={() => navigate('/reading-list')}>
                    <FaBook className="me-2" />
                    View Reading List
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => navigate('/wishlist')}>
                    <FaHeart className="me-2" />
                    View Wishlist
                  </button>
                  <button className="btn btn-outline-success" onClick={() => navigate('/cart')}>
                    <FaShoppingCart className="me-2" />
                    View Cart
                  </button>
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

export default UserProfile;