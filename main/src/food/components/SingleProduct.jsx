/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import TopBar from './TopBar';
import './singleProductPage.css';


const SingleProduct = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`);
      const data = await response.json();
      setProduct(data.product);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch product details', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <TopBar />
      <div className="singleProductPage">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
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
          }}
        >
          &larr; Back
        </button>

        <div className="productDetails">
          <h2>{product.productName}</h2>
          <img src={`${API_URL}/uploads/${product.image}`} alt={product.productName} />
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Available Quantity:</strong> {product.availableQuantity}</p>
          <button
            onClick={() => navigate(`/cart`)} // You can implement an "Add to Cart" here
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffcc00',
              border: 'none',
              borderRadius: '5px',
              color: '#1A3636',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
