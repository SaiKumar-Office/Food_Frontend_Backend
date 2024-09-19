/* eslint-disable no-unused-vars */
import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import LandingPage from './food/pages/LandingPage'
import {Routes, Route} from 'react-router-dom'
import ProductMenu from './food/components/ProductMenu'
import Cart from './food/pages/Cart'
import Login from './food/components/login'
import Register from './food/components/Register'
import Payment from './food/pages/Payment'
import SingleProduct from './food/components/SingleProduct'
import Order from './food/pages/Order'
import Terms from './food/pages/Terms'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:firmId/:firmName" element={<ProductMenu />} />
        
        {/* <Route path="/product/:productId" element={<SingleProduct />} /> */}
        {/* <Route path="/user/:userId" element={<Main />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<Order />} />
        <Route path="/terms&policy" element={<Terms />} />
      </Routes>
      
    </div>
  )
}

export default App