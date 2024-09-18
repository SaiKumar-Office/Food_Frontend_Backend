import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

const UserDetails = () => {
  const [orders, setOrders] = useState([]);
  const [newStatus, setNewStatus] = useState({}); // Object to handle status changes for each order

  // Fetch all orders from the backend
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders/all-orders`);
      const data = await response.json();
      setOrders(data);

    //   const data = await response.json();
    //   setOrders(data.orders);
      console.log("orders:", data)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Update order status in the backend
  const updateOrderStatus = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus[orderId], // Get status from the input field
        }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        alert(`Order status updated to: ${updatedOrder.status}`);
        setOrders(orders.map((order) => 
          order._id === orderId ? { ...order, status: updatedOrder.status } : order
        ));
      } else {
        const errorData = await response.json();
        console.error('Failed to update status:', errorData);
        alert('Error updating status: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status.');
    }
  };

  // Handle status change for each order
  const handleStatusChange = (orderId, newStatusValue) => {
    setNewStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatusValue,
    }));
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h1>Admin: Manage Orders</h1>
      {!orders.length ? (
        <p>No Orders Found</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Update Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={newStatus[order._id] || order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => updateOrderStatus(order._id)}>
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDetails;
