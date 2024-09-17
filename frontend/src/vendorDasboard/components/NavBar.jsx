import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = ({showLoginHandler, showRegisterHandler, showLogOut, logOutHandler, showWelcomeHandler}) => {
  
  const firmName = localStorage.getItem('firmName');
  

  return (
    <div className="navSection">
        <div className="company" onClick={showWelcomeHandler}> 
            Admin Dashboard
        </div>
        <div className="firmName">
            <h4>Restaurant Name : {firmName}</h4>
            
        </div>
        <div className="userAuth">
          {!showLogOut ?  <>
           <span onClick={showLoginHandler}>Login </span>
          <span onClick={showRegisterHandler}>Register</span>
          </> : <span onClick={logOutHandler} className='logout'> Logout</span>  
          }
          
        </div>
    </div>
  )
}

export default NavBar