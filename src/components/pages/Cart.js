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
          My Cart
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
                    <small className="text-muted d-block mb-2">
                      {book.volumeInfo.authors?.[0] || "Unknown"}
                    </small>
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
                <div className="card-body p-4 d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Total: ${total.toFixed(2)}</h4>
                  <button className="btn btn-success btn-lg">
                    <FaCreditCard className="me-2" />
                    Proceed to Checkout
                  </button>
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