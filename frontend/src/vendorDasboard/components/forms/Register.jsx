import React, { useState } from 'react'

import { API_URL } from '../../data/apiPath';


const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({username, email, password })
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setUsername("");
          setEmail("");
          setPassword("");
          alert("Vendor registered successfully");
          showLoginHandler();
        }

    } catch (error) {
      console.error("restration failed", error);
      alert("Registartion Failed")
      
    }
  }


  return (
    <div className="registerSection">
      
            <form className='authForm' onSubmit={handleSubmit}>
            <h3>RestaurantOwner-Register</h3>
              <label>UserName</label>
              <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your FullName'/>
              <label>Email</label>
              <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email'/>
              <label>Password</label>
              <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password'/>
              <div className='btnSubmit'>
                  <button type='submit'>Register</button>
              </div>
            </form>
    </div>
  )
}

export default Register