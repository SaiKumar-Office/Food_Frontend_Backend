import React from 'react'

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle,
  showUserDetailsHandler
}) => {
  return (
    <div className='sideBarSection'>
      <ul>
        {/* Conditionally render the "Add Firm" option */}
        {showFirmTitle && <li onClick={showFirmHandler}>Add Firm</li>}
        
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>

        {/* Clicking this will trigger the showUserDetailsHandler */}
        <li onClick={showUserDetailsHandler}>User Details</li>
      </ul>
    </div>
  )
}

export default SideBar
