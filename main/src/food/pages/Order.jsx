/* eslint-disable no-unused-vars */
// components/Order.jsx
import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { useParams } from 'react-router-dom';
import TopBar from '../components/TopBar';

const Order = () => {
  const { orderId } = useParams();
  const [orderStatus, setOrderStatus] = useState('Fetching status...');

  useEffect(() => {
    // Fetch the order status from the backend
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/${orderId}/status`);
        const data = await response.json();
        setOrderStatus(data.status);
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();

    // Polling every 5 seconds to update order status
    const interval = setInterval(fetchOrderStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div>
        <TopBar />
      <h1>Order Status</h1>
      <p>Order #{orderId} - Status: {orderStatus}</p>
    </div>
  );
};

export default Order;
