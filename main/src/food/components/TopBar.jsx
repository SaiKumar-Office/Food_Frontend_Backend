/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiShoppingCart } from "react-icons/hi";
import {FidgetSpinner} from 'react-loader-spinner'
import { RiWeightLine } from "react-icons/ri";

import SearchBar from './SearchBar';
import Order from '../pages/Order';

const TopBar = ({ cartItemCount }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  const navigate = useNavigate();
    
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const storedUsername = localStorage.getItem('username');
    
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      
      setTimeout(() => {
        navigate('/login'); 
      }, 0); 
    } else {
      navigate('/cart'); 
    }
  };
  const handleOrderClick = () => {
    if (!isLoggedIn) {
      
      setTimeout(() => {
        navigate('/login'); 
      }, 0); 
    } else {
      navigate('/order'); 
    }
  };

  return (
    <section className='topBarSection'>
      {/* <img 
        src="/assets/item/logo.png" 
        alt="Logo" 
        style={{ height: '40px', width: 'auto', marginRight: '15px' }} 
        className='img'
      />  */}
      
      <div className="companyTitle">
        <Link to='/' className='link'>
          <h2>Quick Bites</h2>
          <img src='/assets/item/logo3.png' style={{ height: '70px', width: 'auto'}} 
        className='img' />
        </Link>
        
      </div>
      
      {/* <div className="searchBar">
        <input 
          type="text" 
          placeholder="Search for Your Dish" 
        />
      </div> */}
      <SearchBar /> 
      
      
      <div className="name">
        {isLoggedIn && <>
      <span className='welcome'>Welcome, {username}</span>
      {/* <FidgetSpinner
        visible={true}
        height="30" 
        width="30"  
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{ 
          gap: '10px',
          marginRight:'70px'
        }}
        wrapperClass="fidget-spinner-wrapper" /> */}
    </>
    }
        
      </div>
      <div>
        {isLoggedIn ? (
          <span onClick={handleLogout} style={{ cursor: 'pointer' }} className='logout'>
            Logout</span>
        ) : (
          <>
            <Link to="/login" className="login">Login</Link>
            <Link to="/register" className="register">SignUp</Link>
          </>
        )}
      </div>
      <Link to='/order'><div className="order"><RiWeightLine className='orderIcon' onClick={handleOrderClick} /></div></Link>
      <div className='cart'>
        <HiShoppingCart className='cartIcon' onClick={handleCartClick}/>
        <span className='cartCount'>{cartItemCount}</span> 
      </div>
       
    </section>
  );
};

export default TopBar;



