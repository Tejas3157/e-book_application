import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hide toast after 2 seconds
  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(() => setToast({ show: false, message: '' }), 2000);
    }
    return () => clearTimeout(timer);
  }, [toast.show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === 'admin' && password === 'admin') {
        localStorage.setItem('userToken', 'sampleToken'); // ✅ Add this line
        navigate('/dashboard');
      } else {
        setToast({ show: true, message: 'Invalid credentials' });
      }
    }, 1000);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg,  #000428, #004e92)',
      }}
    >
      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: 420 }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold text-primary">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email or Phone Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaLock />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sign-up redirect */}
          <div className="text-center mt-4">
            <span className="text-muted">Don't have an account? </span>
            <a href="/signup" className="text-decoration-none fw-semibold text-primary">
              Sign up
            </a>
          </div>

          {/* Toast Notification */}
          {toast.show && (
            <div
              className="toast align-items-center text-bg-danger border-0 show mt-3 w-100"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className="toast-body">{toast.message}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
