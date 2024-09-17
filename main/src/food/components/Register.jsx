import React, { useState } from 'react';
import { API_URL } from '../api';
import { Link,useNavigate } from 'react-router-dom';
import TopBar from './TopBar';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/register`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({username, email, password })
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          alert("User registered successfully");
          setUsername("");
          setEmail("");
          setPassword("");
          navigate('/login'); 
        }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration Failed");
    }
  }

  const handleUsernameChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
    setUsername(capitalizedValue);
  };
  


  return (
    <>
      <TopBar />
    <div className="registerSection">
      <form className='authForm' onSubmit={handleSubmit}>
        <h3>Registration</h3>
        <label>UserName</label>
        <input 
          type='text' 
          name='username' 
          value={username} 
          onChange={handleUsernameChange} 
          placeholder='Enter your FullName'
        />
        <label>Email</label>
        <input 
          type='text' 
          name='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Enter your email' 
        />
        <label>Password</label>
        <input 
          type='password' 
          name='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Enter your Password' 
        />
        
        <div className='btnSubmit'>
          <button type='submit'>Register</button>
        </div>
      </form>
      <h4 className="text-lg font-bold">
          Already have an account? {' '}
          <Link to="/login" style={{color:"orangered"}}>
            <span >
              Login
            </span>
          </Link>
        </h4>
    </div>
    </>
  )
}

export default Register;
