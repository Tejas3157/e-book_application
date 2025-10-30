import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaCreditCard } from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.location.reload();
  };

  const total = cart.length * 10.99; // mock total

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-success">My Cart</h3>
        <button className="btn btn-outline-secondary" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft className="me-1" /> Back
        </button>
      </div>
      <div className="row g-3">
        {cart.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((book) => (
              <div className="col-md-3 col-sm-6" key={book.id}>
                <div className="card shadow-sm border-0 h-100">
                  <img
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      "https://via.placeholder.com/150x200?text=No+Image"
                    }
                    className="card-img-top"
                    alt={book.volumeInfo.title}
                  />
                  <div className="card-body text-center">
                    <h6 className="text-truncate">{book.volumeInfo.title}</h6>
                    <small className="text-muted d-block mb-2">
                      {book.volumeInfo.authors?.[0] || "Unknown"}
                    </small>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeItem(book.id)}
                    >
                      <FaTrash className="me-1" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 mt-4 text-end">
              <h5>Total: ${total.toFixed(2)}</h5>
              <button className="btn btn-success">
                <FaCreditCard className="me-2" />
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
