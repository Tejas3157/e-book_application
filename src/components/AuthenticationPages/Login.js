import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      // if (email === 'admin' && password === 'admin') {
      //   navigate('/dashboard');
      // } else {
      //   setToast({ show: true, message: 'Invalid credentials' });
      // }

      (email === 'admin' && password === 'admin')
        ? navigate('/dashboard')
        : setToast({ show: true, message: 'Invalid credentials' });
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="p-5 rounded shadow" style={{ background: '#fff', minWidth: 350 }}>
        <h2 className="mb-4 text-center" style={{ color: '#2563eb' }}>Login</h2>
        <form
        //  onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          <button
            onClick={handleSubmit}
            type='button'
            // type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {/* Toast Message */}
        {toast.show && (
          <div className="toast show align-items-center text-bg-danger border-0 mt-3 w-100" style={{ zIndex: 999 }}>
            <div className="d-flex">
              <div className="toast-body">
                {toast.message}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;