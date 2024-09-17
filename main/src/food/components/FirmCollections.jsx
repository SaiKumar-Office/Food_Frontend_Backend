/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React,{ useState, useEffect } from 'react'
import { API_URL } from '../api'
import { Link } from 'react-router-dom'



const FirmCollections = () => {
  const [firmData, setFirmData] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('All')

  const firmDataHandler = async() => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors)
      // console.log('firmData:', newFirmData)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    firmDataHandler()
  }, [])
  // const [selectedRegion, setSelectedRegion] = useState('All')
  const filterHandler = (region) => {
    setSelectedRegion(region)
  }

  return (
    <>
      <h3>Famous Restaurants are Here.........</h3>
      <div className="filterButton">
        <button onClick={()=>filterHandler('All')} > All</button>
        <button onClick={()=>filterHandler('South-Indian')} >South-Indian</button>
        <button onClick={()=>filterHandler('North-Indian')} >North-Indian</button>
        <button onClick={()=>filterHandler('Chinese')} >Chinese</button>
        <button onClick={()=>filterHandler('Bakery')} >Bakery</button>
      </div>
      <section className="firmSection">
        {firmData.map((e) => {
          return e.firm.map((item)=>{
            if(selectedRegion === 'All' || item.region.includes(selectedRegion.toLocaleLowerCase()))
            {
              
                return (
                  <>
                    <Link to={`/products/${item._id}/${item.firmName}`} className='link'>
                      <div className='firmGroupBox'>
                        <div className='firmGroup'>
                      <img src={`${API_URL}/uploads/${item.image}`} />
                      <div className="firmOffer">
                        {item.offer}
                      </div>
                    </div>
                    <div className='firmDetails'>
                      
                    <strong>{item.firmName}</strong><br />
                    <div className="firmArea">{item.region.join(', ')}</div>
                    <div className="firmArea">{item.area}</div>
                      
                    </div>                    
                    </div>
                    </Link>
                    </>
                  
                )
              
            }
          })

          return null;
        })}

      </section>
    </>
  )
}

export default FirmCollections