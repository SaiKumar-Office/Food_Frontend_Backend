import React, {useState}  from 'react';
import { API_URL } from '../../data/apiPath';
import { Link } from 'react-router-dom';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }

  const loginHandler = async(e)=>{
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
        
      })
      const data =await response.json();
      if(response.ok) {
        alert('Login success');
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token);
        
        
      }
      const vendorId = data.vendorId
      console.log("checking for VendorId:",vendorId)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      window.location.reload()
      
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        // console.log("My Firm Name is ", vendorFirmName)
        localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('firmName', vendorFirmName);
        
        
        
        
      }
      
      // showWelcomeHandler(); 
    } catch (error) {
      console.error(error);
      alert("Login Failed");
      
    }
  }
    
  
  return (
    <div className='loginSection'>
        
        <form className='authForm' onSubmit={loginHandler}>
        <h3>RestaurantOwner-Login</h3>
            <label>Email</label>
            <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email'/>
            <label>Password</label>
            <input   type={showPassword? "text":"password"} name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br />
            <span className='showPassword'
              onClick={handleShowPassword}
              >{showPassword ? 'Hide' : 'Show'}</span>
            {/* <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password'/> */}
            <div className='btnSubmit'>
                <button type='submit'>Login</button>
            </div>
            
        </form>

    </div>
  )
}

export default Login