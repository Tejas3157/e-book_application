import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    
    // Load user profile data
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        fullName: `${userProfile.firstName} ${userProfile.lastName}`,
        email: userProfile.email,
        phone: userProfile.phone
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
      
      // Clear cart after successful order
      localStorage.setItem('cart', JSON.stringify([]));
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };

  const subtotal = cart.length * 10.99;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cart.length === 0 && !orderComplete) {
    return (
      <DashboardLayout>
        <div className="text-center py-5">
          <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-body p-5">
              <h3 className="mb-4">Your cart is empty</h3>
              <p className="text-muted mb-4">Add some books to your cart before checking out.</p>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
                Browse Books
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (orderComplete) {
    return (
      <DashboardLayout>
        <div className="text-center py-5">
          <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: '600px' }}>
            <div className="card-body p-5">
              <div className="mb-4">
                <FaCheckCircle className="text-success" style={{ fontSize: '80px' }} />
              </div>
              <h2 className="text-success mb-3">Order Successful!</h2>
              <p className="lead mb-4">Thank you for your purchase!</p>
              <p className="text-muted">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
              <div className="mt-4">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="row g-4">
        {/* Order Summary */}
        <div className="col-lg-4 order-lg-2">
          <div className="card shadow-lg border-0 sticky-top" style={{ top: '90px' }}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="fw-bold">Items ({cart.length})</h6>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {cart.map((book, index) => (
                    <div key={index} className="d-flex align-items-center mb-2 pb-2 border-bottom">
                      <img
                        src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/50x70'}
                        alt={book.volumeInfo.title}
                        style={{ width: '40px', height: '60px', objectFit: 'cover' }}
                        className="me-2"
                      />
                      <div className="flex-grow-1">
                        <small className="d-block text-truncate">{book.volumeInfo.title}</small>
                        <small className="text-muted">${10.99}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2">
                  <span>Total:</span>
                  <span className="text-success">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="col-lg-8 order-lg-1">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <FaCreditCard className="me-2" />
                Checkout
              </h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Billing Information */}
                <h5 className="mb-3">Billing Information</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Zip Code *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <h5 className="mb-3 d-flex align-items-center">
                  <FaLock className="me-2 text-success" />
                  Payment Information
                </h5>
                <div className="alert alert-info">
                  <small>
                    <FaLock className="me-1" />
                    Your payment information is secure and encrypted
                  </small>
                </div>
                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <label className="form-label">Card Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Name on Card *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Expiry Date *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">CVV *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="3"
                      required
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="d-flex gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => navigate('/cart')}
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaLock className="me-2" />
                        Place Order ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Checkout;