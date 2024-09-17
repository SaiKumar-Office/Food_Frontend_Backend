/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { firmId, firmName } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
    } catch (error) {
      console.error('Failed to Fetch the Products');
    }
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const updateCartItems = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Function to update product quantity in backend
  const updateProductQuantityInBackend = async (productId, quantityChange) => {
    try {
      const response = await fetch(`${API_URL}/product/decrease-quantity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: quantityChange, // Can be positive (for increase) or negative (for decrease)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Quantity updated:', data);

        // Update the product's available quantity in the frontend
        setProducts(products.map(p =>
          p._id === productId ? { ...p, availableQuantity: data.availableQuantity } : p
        ));
      } else {
        alert('Failed to update quantity in backend');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Add product to cart
  const addToCart = async (product) => {
    if (product.availableQuantity === 0) {
      alert('This product is out of stock');
      return;
    }
  
    let updatedCartItems = [...cartItems];
    const existingProductIndex = updatedCartItems.findIndex(item => item._id === product._id);
  
    // If the product is already in the cart, increase the quantity by 1
    if (existingProductIndex >= 0) {
      updatedCartItems[existingProductIndex].quantity += 1;
    } else {
      // Add the product to the cart with quantity of 1
      updatedCartItems.push({ ...product, quantity: 1 });
    }
  
    updateCartItems(updatedCartItems);
    await updateProductQuantityInBackend(product._id, -1); // Decrease available quantity by 1
  };

  // Increase quantity
  const increaseQuantity = async (productId) => {
    let updatedCartItems = [...cartItems];
    const existingProductIndex = updatedCartItems.findIndex(item => item._id === productId);
  
    if (existingProductIndex >= 0) {
      updatedCartItems[existingProductIndex].quantity += 1;
      updateCartItems(updatedCartItems);
      await updateProductQuantityInBackend(productId, -1); // Decrease available quantity by 1
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (productId) => {
    let updatedCartItems = [...cartItems];
    const existingProductIndex = updatedCartItems.findIndex(item => item._id === productId);
  
    // If product exists in the cart, decrease the quantity
    if (existingProductIndex >= 0) {
      const currentQuantity = updatedCartItems[existingProductIndex].quantity;
  
      if (currentQuantity === 1) {
        // If the quantity is 1, remove the product from the cart
        updatedCartItems = updatedCartItems.filter(item => item._id !== productId);
      } else {
        // Otherwise, decrease the quantity by 1
        updatedCartItems[existingProductIndex].quantity -= 1;
      }
  
      updateCartItems(updatedCartItems);
      await updateProductQuantityInBackend(productId, 1); // Increase available quantity by 1
    }
  };

  const getProductQuantity = (productId) => {
    const productInCart = cartItems.find(item => item._id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  useEffect(() => {
    productHandler();
  });

  return (
    <>
      <TopBar cartItemCount={cartItems.length} />
      <section className="productSection">
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
        <h3>{firmName}</h3>
        {products.map((item) => (
          <div className='productBox' key={item._id}>
            <div>
              <div><strong>{item.productName}</strong></div>
              <div>₹{item.price}</div>
              <div>{item.description}</div>
              <div>Available: {item.availableQuantity}</div> {/* Show available quantity */}
            </div>
            <div className='productGroup'>
              <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
              {/* Check if product is in cart */}
              {getProductQuantity(item._id) > 0 ? (
                <div className="quantityControl">
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{getProductQuantity(item._id)}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
              ) : (
                item.availableQuantity > 0 ? (
                  <div className="addButton" onClick={() => addToCart(item)}>ADD</div>
                ) : (
                  <div className="outOfStock">Out of Stock</div>
                )
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Swiggy-like Cart Button */}
      {cartItems.length > 0 && (
        <div className="cartButtonContainer">
          <button className="cartButton" onClick={() => navigate('/cart')}>
            View Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
          </button>
        </div>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default ProductMenu;


// import React, { useState, useEffect } from 'react';
// import { API_URL } from '../api';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import TopBar from './TopBar';

// const ProductMenu = () => {
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const { firmId, firmName } = useParams();
//   const navigate = useNavigate(); // Hook for navigation

//   const productHandler = async () => {
//     try {
//       const response = await fetch(`${API_URL}/product/${firmId}/products`);
//       const newProductData = await response.json();
//       setProducts(newProductData.products);
//     } catch (error) {
//       console.error('Failed to Fetch the Products');
//     }
//   };

//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCartItems(storedCartItems);
//   }, []);

//   const getProductQuantity = (productId) => {
//     const productInCart = cartItems.find(item => item._id === productId);
//     return productInCart ? productInCart.quantity : 0;
//   };

//   useEffect(() => {
//     productHandler();
//   }, [firmId]);

//   return (
//     <>
//       <TopBar cartItemCount={cartItems.length} />
//       <section className="productSection">
//         <div style={{ margin: '5px 0' }}>
//           <button
//             onClick={() => navigate(-1)}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#1A3636',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               transition: 'background-color 0.3s ease, transform 0.3s ease',
//             }}
//           >
//             &larr; Back
//           </button>
//         </div>
//         <h3>{firmName}</h3>
//         {products.map((item) => (
//           <div className="productBox" key={item._id}>
//             <div>
//               <div><strong>{item.productName}</strong></div>
//               <div>₹{item.price}</div>
//               <div>{item.description}</div>
//               <div>Available: {item.availableQuantity}</div> {/* Show available quantity */}
//             </div>
//             <div className="productGroup">
//               <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
//               <div>
//                 {/* Link to Single Product Page */}
//                 <Link to={`/product/${item._id}`}>
//                   <button style={{ padding: '10px', backgroundColor: '#ffcc00', border: 'none', cursor: 'pointer' }}>
//                     View Product
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// };

// export default ProductMenu;
