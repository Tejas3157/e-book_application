// ==================== UserProfile.js ====================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaBook,
  FaHeart,
  FaShoppingCart,
  FaCheckCircle,
} from 'react-icons/fa';

function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    bio: 'Book lover and avid reader',
    favoriteGenre: 'Fiction',
    joinDate: 'January 2025',
  });

  const [stats, setStats] = useState({
    readingList: 0,
    completed: 0,
    wishlist: 0,
    cart: 0,
  });

  // Load profile and stats, and protect route
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (savedProfile) {
      setUserData((prev) => ({
        ...prev,
        ...savedProfile,
      }));
    } else if (storedUser) {
      setUserData((prev) => ({
        ...prev,
        firstName: storedUser.firstName || prev.firstName,
        lastName: storedUser.lastName || prev.lastName,
        email: storedUser.email || prev.email,
        phone: storedUser.phone || prev.phone,
        bio: storedUser.bio || prev.bio,
        favoriteGenre: storedUser.favoriteGenre || prev.favoriteGenre,
        joinDate: storedUser.joinDate || prev.joinDate,
      }));
    }

    const readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    const completedBooks =
      JSON.parse(localStorage.getItem('completedBooks')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    setStats({
      readingList: readingList.length,
      completed: completedBooks.length,
      wishlist: wishlist.length,
      cart: cart.length,
    });
  }, [navigate]);

  // Auto-hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(
        () => setToast({ show: false, message: '', type: '' }),
        2000
      );
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(userData));

    // Keep auth user in sync with profile data
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...storedUser,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        favoriteGenre: userData.favoriteGenre,
        bio: userData.bio,
        joinDate: userData.joinDate,
      })
    );

    setIsEditing(false);
    setToast({
      show: true,
      message: 'Profile updated successfully!',
      type: 'success',
    });
  };

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout>
      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-lg-4">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center p-4">
              <div
                className="mx-auto mb-3 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '100px', height: '100px', fontSize: '40px' }}
              >
                <FaUser />
              </div>
              <h4 className="fw-bold">
                {userData.firstName} {userData.lastName}
              </h4>
              <p className="text-muted mb-2">{userData.email}</p>
              <p className="text-muted small">
                Member since {userData.joinDate}
              </p>

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
                <div className="row g-2">
                  <div className="col-6">
                    <div className="p-2 bg-light rounded">
                      <FaBook className="text-info fs-5 mb-1" />
                      <h6 className="mb-0">{stats.readingList}</h6>
                      <small className="text-muted">Reading</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 bg-light rounded">
                      <FaCheckCircle className="text-success fs-5 mb-1" />
                      <h6 className="mb-0">{stats.completed}</h6>
                      <small className="text-muted">Completed</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 bg-light rounded">
                      <FaHeart className="text-danger fs-5 mb-1" />
                      <h6 className="mb-0">{stats.wishlist}</h6>
                      <small className="text-muted">Wishlist</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 bg-light rounded">
                      <FaShoppingCart className="text-warning fs-5 mb-1" />
                      <h6 className="mb-0">{stats.cart}</h6>
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
                        onChange={(e) =>
                          handleChange('firstName', e.target.value)
                        }
                        disabled={!isEditing}
                        required
                      />
                    </div>
                  </div>

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
                        onChange={(e) =>
                          handleChange('lastName', e.target.value)
                        }
                        disabled={!isEditing}
                        required
                      />
                    </div>
                  </div>

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
                        onChange={(e) =>
                          handleChange('email', e.target.value)
                        }
                        disabled={!isEditing}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaPhone />
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        value={userData.phone}
                        onChange={(e) =>
                          handleChange('phone', e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Favorite Genre
                    </label>
                    <select
                      className="form-select"
                      value={userData.favoriteGenre}
                      onChange={(e) =>
                        handleChange('favoriteGenre', e.target.value)
                      }
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

                  <div className="col-12">
                    <label className="form-label fw-semibold">Bio</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={userData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

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
              <div className="row g-2">
                <div className="col-md-6">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => navigate('/reading-list')}
                  >
                    <FaBook className="me-2" />
                    View Reading List
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => navigate('/wishlist')}
                  >
                    <FaHeart className="me-2" />
                    View Wishlist
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-outline-success w-100"
                    onClick={() => navigate('/cart')}
                  >
                    <FaShoppingCart className="me-2" />
                    View Cart
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-outline-info w-100"
                    onClick={() => navigate('/dashboard')}
                  >
                    <FaBook className="me-2" />
                    Browse Books
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast.show && (
        <div
          className={`toast show align-items-center text-bg-${toast.type} border-0 position-fixed bottom-0 end-0 m-3`}
          style={{ zIndex: 9999 }}
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default UserProfile;
