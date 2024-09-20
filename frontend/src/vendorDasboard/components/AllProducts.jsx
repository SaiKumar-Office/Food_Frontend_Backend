import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);

  // Function to update product quantity
  
  const updateProductQuantity = async (productId, quantityChange) => {
    try {
        const response = await fetch(`${API_URL}/product/update-quantity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId,
                quantity: quantityChange, // Positive for increase, negative for decrease
            }),
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            setProducts(products.map(p =>
                p._id === productId ? { ...p, availableQuantity: updatedProduct.availableQuantity } : p
            ));
        } else {
            const errorData = await response.json();
            console.error('Error updating quantity:', errorData);
            alert('Failed to update quantity: ' + (errorData.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        alert('Failed to update quantity: ' + (error.message || 'Unknown error'));
    }
};

// Increase quantity
const increaseQuantity = async (productId) => {
    await updateProductQuantity(productId, 1); // Increase by 1
};

// Decrease quantity
const decreaseQuantity = async (productId) => {
    await updateProductQuantity(productId, -1); // Decrease by 1
};




    

  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        alert('Product deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete product');
      alert('Failed to delete product');
    }
  };

  return (
    <div>
      {!products.length ? (
        <p>No Products Added</p>
      ) : (
        <table className='product-table'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button onClick={() => decreaseQuantity(item._id)} disabled={item.availableQuantity <= 0}>-</button>
                    {item.availableQuantity}
                    <button onClick={() => increaseQuantity(item._id)}>+</button>
                  </td>
                  <td>
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        style={{ width: '150px', height: '80px' }}
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => deleteProductById(item._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
