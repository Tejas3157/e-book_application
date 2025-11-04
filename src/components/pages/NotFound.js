import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';

function NotFound() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('userToken');

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #000428, #004e92)'
      }}
    >
      <div className="text-center text-white px-3">
        <div className="mb-4">
          <FaExclamationTriangle style={{ fontSize: '120px', color: '#ff8a00' }} />
        </div>
        
        <h1 className="display-1 fw-bold mb-3" style={{ fontSize: '150px' }}>404</h1>
        
        <h2 className="mb-3">Page Not Found</h2>
        
        <p className="lead mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          {isAuthenticated ? (
            <>
              <button
                className="btn btn-warning btn-lg px-4"
                onClick={() => navigate('/dashboard')}
              >
                <FaHome className="me-2" />
                Back to Dashboard
              </button>
              <button
                className="btn btn-outline-light btn-lg px-4"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft className="me-2" />
                Go Back
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-warning btn-lg px-4"
                onClick={() => navigate('/')}
              >
                <FaHome className="me-2" />
                Back to Home
              </button>
              <button
                className="btn btn-outline-light btn-lg px-4"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft className="me-2" />
                Go Back
              </button>
            </>
          )}
        </div>

        <div className="mt-5">
          <p className="text-white-50 small">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;