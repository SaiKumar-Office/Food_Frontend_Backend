/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import './order.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null); // State to manage open dropdown

  const fetchOrders = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`${API_URL}/orders/user/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const newData = await response.json();
      setOrders(newData);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleReorder = (order) => {
    // Logic to add the items from the previous order to the cart
    console.log("Reordering items from order:", order);
  };

  const handleToggleDropdown = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId); // Toggle dropdown
  };

  return (
    <>
      <TopBar />
      <section className="ordersSection">
        <h3>Your Orders</h3>
        {error && <p>Error: {error}</p>}
        {orders.length > 0 ? (
          <div className="ordersList">
            {orders.map((order) => (
              <div key={order._id} className="orderBox">
                <h4>Order ID: {order._id}</h4>
                <div>Status: <strong>{order.status}</strong></div>
                <div>Total Amount: <strong>₹{order.totalAmount}</strong></div>
                <div>Placed On: {new Date(order.createdAt).toLocaleString()}</div>
                <div className="dropdown">
                  <button 
                    className="dropdown-button" 
                    onClick={() => handleToggleDropdown(order._id)}
                  >
                    {openOrderId === order._id ? 'Hide Items' : 'View Items'}
                  </button>
                  {openOrderId === order._id && (
                    <div className="dropdown-content">
                      {order.products.map((product, index) => (
                        <div key={index} className="productItem">
                          <img src={`${API_URL}/uploads/${product.image}`} alt={product.productName} />
                          <strong>{product.productName}</strong> - ₹{product.price} x {product.quantity}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => handleReorder(order)} className='reorder'>Reorder</button>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no orders yet.</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Orders;
