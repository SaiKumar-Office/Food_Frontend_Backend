// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';
import { API_URL } from '../api';
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Handle search function
  const handleSearch = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(searchTerm)}`);
      const result = await response.json();
      
      console.log(result); // Log the result to check what the API returns
  
      if (result.length > 0) {
        setSearchResults(result);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Error during search:', error);
      alert('Failed to perform search');
    }
  };
  

  // Handle product selection
  const handleSelectProduct = (product) => {
    if (product.products.productName || product.firmName) {
      navigate(`/products/${product._id}/${product.firmName}`);
      // navigate(`/products/${product._id}/${product.productName}`);      
      // /:firmId/:productId
      setShowResults(false);
    } else {
      console.error('Product ID or firmName is missing.');
    }
  };

  // if (product.productName) {
  //   navigate(`/products/${product.productName}/${product.firmName}`);
  // }
  // else {
  //   navigate(`/products/${product._id}/${product.firmName}`);
  // }

  
  



  // const handleSelectProduct = (product) => {
  //   if (product._id && product.firmName) {
  //     if (product.type === 'restaurant') {
  //       // Navigate to the restaurant page
  //       navigate(`/restaurant/${product._id}`);
  //     } else if (product.type === 'product') {
  //       // Navigate to the products page with the correct product and firm details
  //       navigate(`/products/${product._id}/${product.firmName}`);
  //     }
  //     setShowResults(false);
  //   } else {
  //     console.error('Product ID or firmName is missing.');
  //   }
  // };
  

  // Clear results when search term is cleared
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search for products or restaurants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}><IoSearchOutline className='search'/></button>

      {showResults && (
        <div className="searchResults">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              // eslint-disable-next-line react/jsx-key
              <div
                className="searchResultItem" 
                onClick={() => handleSelectProduct(product)}
              >
                {/* key={product._id}  */}
                {product.firmName}
                {product.productName}
                 {/* Display firmName */}
              </div>
            ))
          ) : (
            <div className="searchResultItem">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
