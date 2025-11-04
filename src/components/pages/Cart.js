import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { FaTrash, FaCreditCard } from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.location.reload();
  };

  const total = cart.length * 10.99;

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 className="fw-bold text-white">
          <FaCreditCard className="me-2" />
          My Cart ({cart.length} items)
        </h3>
      </div>
      
      <div className="row g-3">
        {cart.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-light text-center">
              <h5>Your cart is empty.</h5>
              <button className="btn btn-primary mt-3" onClick={() => navigate('/dashboard')}>
                Browse Books
              </button>
            </div>
          </div>
        ) : (
          <>
            {cart.map((book) => (
              <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={book.id}>
                <div className="card shadow-sm border-0 h-100">
                  <img
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      "https://via.placeholder.com/150x200?text=No+Image"
                    }
                    className="card-img-top"
                    alt={book.volumeInfo.title}
                    style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => navigate(`/book/${book.id}`)}
                  />
                  <div className="card-body text-center p-2">
                    <h6 className="text-truncate">{book.volumeInfo.title}</h6>
                    <small className="text-muted d-block mb-1">
                      {book.volumeInfo.authors?.[0] || "Unknown"}
                    </small>
                    <p className="text-success fw-bold mb-2">$10.99</p>
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => removeItem(book.id)}
                    >
                      <FaTrash className="me-1" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="col-12 mt-4">
              <div className="card shadow-lg border-0">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4 className="mb-2">Order Summary</h4>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal ({cart.length} items):</span>
                        <span className="fw-bold">${total.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Tax (10%):</span>
                        <span className="fw-bold">${(total * 0.1).toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <h5 className="mb-0">Total:</h5>
                        <h5 className="mb-0 text-success">${(total * 1.1).toFixed(2)}</h5>
                      </div>
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <button 
                        className="btn btn-success btn-lg"
                        onClick={() => navigate('/checkout')}
                      >
                        <FaCreditCard className="me-2" />
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Cart;