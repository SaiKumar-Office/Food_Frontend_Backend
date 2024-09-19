/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import logo from './load.gif';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import TopBar from '../components/TopBar';
import "./payment.css";
import { BallTriangle } from 'react-loader-spinner';

const Payment = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [orderStatus, setOrderStatus] = useState('Processing your order...');
  
  const totalCycles = 2; 

  // Show text after a delay
  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1400); 

    return () => clearTimeout(textTimer);
  }, []);

  // Simulate loading cycles and update order status
  useEffect(() => {
    if (cycleCount < totalCycles) {
      const loadingTimer = setTimeout(() => {
        setCycleCount(cycleCount + 1);

        // Update order status dynamically
        if (cycleCount === 0) {
          setOrderStatus('Preparing your order...');
        } 
      }, 2000); 

      return () => clearTimeout(loadingTimer);
    } else {
      setLoadingComplete(true);
      setOrderStatus('Order Placed!');
    }
  }, [cycleCount]);

  return (
    <>
      <TopBar />
      <div className="payment-container">
        {/* <button
          className='backbutton'
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button> */}

        <h1>
          <span className={showText ? 'wipe' : ''}>Payment Done</span>
        </h1>

        {/* Display order status */}
        <h2 className="order-status">{orderStatus}</h2>

        {!loadingComplete ? (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <>
            <img className="gif" src={logo} alt="loading..." />
            <div className="buttonContainer">
              <Link to="/">
                <button className="back">Back to Home</button>
              </Link>
              <Link to="/order">
                <button className="back">Your Orders</button>
              </Link>
            </div>

          </>
        )}
        
      </div>
    </>
  );
};

export default Payment;
