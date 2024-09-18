/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { API_URL } from '../api'; // Adjust the import path according to your project structure
import TopBar from './TopBar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        setEmail('');
        setPassword('');
        console.log(data.username); 
        navigate('/'); // Redirect to the dashboard or any other page
      } else {
        setErrorMessage(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <TopBar />
      <div className='loginSection'>
      <form className='authForm' onSubmit={loginHandler}>
        <h3>Login</h3>
        {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          required
        />
        <label>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
          required
        />
        <span
          className='showPassword'
          onClick={handleShowPassword}
        >
          {showPassword ? 'Hide' : 'Show'}
        </span>
        
        
        <div className='btnSubmit'>
          <button type='submit'>Login</button>
        </div>
        
      </form>
      <h4 className="text-lg font-bold">
        Don't have an account?  {' '}
          <Link to="/register" style={{color:"orangered"}}>
            <span >
              Register
            </span>
          </Link>
        </h4>
    </div>
    
    </>
  );
};

export default Login;
