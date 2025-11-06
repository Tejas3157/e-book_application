import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Image from '../Images/Logo.png';
import { FaHome, FaBook, FaCheckCircle, FaHeart, FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Get username from localStorage
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile && userProfile.firstName) {
      setUserName(userProfile.firstName);
    } else {
      // Default to "Admin" if no profile exists
      setUserName('Admin');
    }
  }, [location]);

  const handleLogout = () => {
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

  const handleMenuClick = (path) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000428, #004e92)' }}>
      {/* Top Header */}
      <div 
        className="fixed-top shadow-sm"
        style={{
          background: 'linear-gradient(90deg, #000428 100%, #004e92 0%)',
          zIndex: 1050
        }}
      >
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              {/* Hamburger - Only show on mobile */}
              {isMobile && (
                <button
                  className="btn btn-outline-light me-3"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
              )}
              
              <div className="d-flex align-items-center">
                <img src={Image} alt="Logo" width="40" height="32" className="me-2" />
                <h5 className="text-white mb-0 d-none d-md-block">
                  <span style={{ color: '#00d4ff' }}>Book</span>
                  <span style={{ color: '#ff8a00' }}>Verse</span>
                </h5>
              </div>
            </div>
            
            <div className="d-flex gap-2 align-items-center">
              <span className="text-white d-none d-md-inline small">
                Welcome, <span className="fw-bold" style={{ color: '#00d4ff' }}>{userName}</span>!
              </span>
              <button 
                className="btn btn-outline-light btn-sm d-none d-lg-inline-flex align-items-center gap-2"
                onClick={() => navigate('/profile')}
              >
                <FaUser />
                {userName}
              </button>
              <button 
                className="btn btn-danger btn-sm d-none d-lg-inline-flex align-items-center gap-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex" style={{ paddingTop: '70px' }}>
        {/* Sidebar for Desktop - Always visible on large screens */}
        <div 
          className="d-none d-lg-block"
          style={{
            width: '280px',
            position: 'fixed',
            height: 'calc(100vh - 70px)',
            overflowY: 'auto',
            background: 'linear-gradient(180deg, #000428, #004e92)',
            boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
            zIndex: 1040
          }}
        >
          <SidebarContent 
            menuItems={menuItems} 
            handleMenuClick={handleMenuClick}
            handleLogout={handleLogout}
            location={location}
            isMobile={false}
            userName={userName}
          />
        </div>

        {/* Mobile Sidebar Overlay - Only on small screens */}
        {isMobile && sidebarOpen && (
          <>
            <div
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
              style={{ opacity: 0.5, zIndex: 1045, marginTop: '70px' }}
              onClick={() => setSidebarOpen(false)}
            />
            <div
              className="position-fixed top-0 start-0 h-100"
              style={{
                width: '280px',
                marginTop: '70px',
                overflowY: 'auto',
                zIndex: 1046,
                background: 'linear-gradient(180deg, #000428, #004e92)',
                boxShadow: '2px 0 10px rgba(0,0,0,0.5)',
                transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              <SidebarContent 
                menuItems={menuItems} 
                handleMenuClick={handleMenuClick}
                handleLogout={handleLogout}
                location={location}
                isMobile={true}
                userName={userName}
              />
            </div>
          </>
        )}

        {/* Main Content */}
        <div 
          className="flex-grow-1"
          style={{
            marginLeft: isMobile ? '0' : '280px',
            transition: 'margin-left 0.3s',
            width: '100%',
            minHeight: 'calc(100vh - 70px)'
          }}
        >
          <div className="container-fluid py-4 px-3 px-lg-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Content Component
function SidebarContent({ menuItems, handleMenuClick, handleLogout, location, isMobile, userName }) {
  return (
    <>
      {/* User Info Section */}
      <div className="p-4 text-center border-bottom border-secondary">
        <div 
          className="mx-auto mb-2 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '80px', height: '80px', fontSize: '36px' }}
        >
          <FaUser />
        </div>
        <h6 className="text-white fw-bold mb-0">{userName}</h6>
        <p className="text-white-50 small mb-0">Reader</p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-3">
        <ul className="list-unstyled">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index} className="mb-2">
                <button
                  onClick={() => handleMenuClick(item.path)}
                  className={`btn w-100 text-start text-white d-flex align-items-center justify-content-between p-3 rounded ${isActive ? 'active-menu' : ''}`}
                  style={{
                    background: isActive ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    border: isActive ? '1px solid #00d4ff' : 'none',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <span>
                    <item.icon className="me-3" style={{ color: isActive ? '#00d4ff' : 'white' }} />
                    {item.label}
                  </span>
                  {item.badge !== null && item.badge > 0 && (
                    <span className="badge bg-danger rounded-pill">{item.badge}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button - Show on mobile */}
      {isMobile && (
        <div className="p-3 mt-3">
          <button
            onClick={handleLogout}
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center p-3 rounded"
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default DashboardLayout;