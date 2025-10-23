import React, { useState, useEffect } from 'react';

function Signup() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  // Hide toast after 2 seconds
  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(() => setToast({ show: false, message: '', type: '' }), 2000);
    }
    return () => clearTimeout(timer);
  }, [toast.show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email && password.length >= 6) {
        setToast({ show: true, message: 'Signup successful!', type: 'success' });
        setFname('');
        setLname('');
        setEmail('');
        setPassword('');
      } else {
        setToast({ show: true, message: 'Password must be at least 6 characters.', type: 'danger' });
      }
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' }}>
      <div className="p-3 rounded shadow" style={{ background: '#fff', minWidth: 350 }}>
        <h2 className="mb-4 text-center" style={{ color: '#2563eb' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-1">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={fname}
              onChange={e => setFname(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lname}
              onChange={e => setLname(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        {/* Toast Message */}
        {toast.show && (
          <div className={`toast show align-items-center text-bg-${toast.type} border-0 mt-3 w-100`} style={{ zIndex: 999 }}>
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

export default Signup;