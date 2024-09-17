/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import TopBar from '../components/TopBar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const updateCartItems = (updatedCartItems) => {
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    updateCartItems(updatedCartItems);
  };

  const increaseQuantity = (index) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartItems(updatedCartItems);
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        const newQuantity = item.quantity - 1;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(item => item !== null);
    updateCartItems(updatedCartItems);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle Proceed to Checkout
  const handleCheckout = async () => {
    try {
      // Send API request to update product quantities in backend
      const response = await fetch(`${API_URL}/product/update-quantities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }), // Send the cart items with quantities
      });

      if (response.ok) {
        
        localStorage.removeItem('cartItems');
        setCartItems([]);
        navigate('/payment');
      } else {
        alert('Failed to checkout. Please try again.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to checkout. Please try again.');
    }
  };

  return (
    <>
      <TopBar />
      <section className="cartSection">
      <div style={{ margin: '5px 0' }}>
  <button
    onClick={() => navigate(-1)}
    style={{
      padding: '10px 20px', 
      backgroundColor: '#1A3636', 
      color: 'white', 
      border: 'none', 
      borderRadius: '5px', 
      cursor: 'pointer', 
      fontSize: '16px', 
      fontWeight: 'bold', 
      transition: 'background-color 0.3s ease, transform 0.3s ease',
      display: 'inline-flex', 
      alignItems: 'center',
      
    }}
    onMouseOver={(e) => {
      e.target.style.backgroundColor = '#333';
      e.target.style.transform = 'scale(1.05)';
    }}
    onMouseOut={(e) => {
      e.target.style.backgroundColor = '#1A3636';
      e.target.style.transform = 'scale(1)';
    }}
  >
    &larr; Back
  </button>
</div>
        <h3>Your Cart</h3>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div className='cartBox' key={index}>
                <div>
                  <strong>{item.productName}</strong>
                  <div>₹{item.price * item.quantity}</div>
                  <div>{item.description}</div>
                  <div className="quantityControl">
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                </div>
                <div className='cartGroup'>
                  <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
                  <div className="removeButton" onClick={() => removeFromCart(index)}>Remove</div>
                </div>
              </div>
            ))}
            
            {/* Total Price Display */}
            <div className="totalPrice">
              <h4>Total Price: ₹{getTotalPrice()}</h4>
            </div>
            
            {/* Checkout Button */}
            <div className="checkout">
              <button onClick={handleCheckout} className="checkoutButton">
                <Link to='/payment' className='payment'>Proceed to Checkout</Link>
              </button>
            </div>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Cart;
