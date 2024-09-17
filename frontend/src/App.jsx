import React from 'react'
import LandingPage from './vendorDasboard/pages/LandingPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import NotFound from './vendorDasboard/components/NotFound'
import Welcome from './vendorDasboard/components/Welcome'
// import Login from './vendorDasboard/components/forms/Login'
// import AddFirm from './vendorDasboard/components/forms/AddFirm'
// import AddProduct from './vendorDasboard/components/forms/AddProduct'
const App = () => {
  return (
    <div>
      {/* <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/add-firm' element={<AddFirm />}/>
        <Route path='/add-product' element={<AddProduct />}/>
      </Routes> */}
      <Routes>
          <Route path='/' element = {<LandingPage />}/>
          <Route path='/*' element = {<NotFound />} />
          <Route path='/welcome' element={<Welcome />} />
      </Routes>
      
      
    </div>
  )
}

export default App