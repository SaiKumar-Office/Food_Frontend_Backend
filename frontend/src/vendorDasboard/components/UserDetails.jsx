// components/UserDetails.jsx
import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

const UserDetails = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Fetch all orders
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders`);
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId) => {
    try {
      await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      alert('Order status updated!');
      setSelectedOrder(null);
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  return (
    <div>
      <h1>Admin: Update Order Status</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order #{order._id} - Status: {order.status}
            <button onClick={() => setSelectedOrder(order)}>Update Status</button>
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <div>
          <h2>Update Status for Order #{selectedOrder._id}</h2>
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button onClick={() => updateOrderStatus(selectedOrder._id)}>Update</button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
