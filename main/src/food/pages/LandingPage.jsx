/* eslint-disable no-unused-vars */
import React from 'react'
import TopBar from '../components/TopBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollections from '../components/FirmCollections'
import Footer from '../components/Footer'
// import { API_URL } from '../api'

const LandingPage = () => {
  return (
    <div>
      <TopBar  />
      <div className="landingSection">
        <ItemsDisplay />
        <Chains />
        <FirmCollections />
        {/* <div className='productGroup'>
              <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
              {getProductQuantity(item._id) > 0 ? (
                <div className="quantityControl">
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{getProductQuantity(item._id)}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
              ) : (
                <div className="addButton" onClick={() => addToCart(item)}>ADD</div>
              )}
            </div> */}
        
      </div>
      <Footer />
      
    </div>
  )
}

export default LandingPage