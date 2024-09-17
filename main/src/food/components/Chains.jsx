/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import { API_URL } from '../api'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom'

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  const vendorFirmHandler = async() => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`)
      const newData  = await response.json()

      setVendorData(newData);
      console.log("api Data:",newData);
      setLoading(false)
    } catch (error) {
      console.error(error);
      alert("failed to fetch Data")
      setLoading(true)
    }
  }

  useEffect(() =>{
    vendorFirmHandler()
  },[])


  const handleScroll =(direction)=>{
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;

    if(direction === "left"){
        gallery.scrollTo({
            left: gallery.scrollLeft -scrollAmount,
            behavior: "smooth"
        })
    }else if( direction === "right"){
        gallery.scrollTo({
            left: gallery.scrollLeft + scrollAmount,
            behavior: "smooth"
        })
    }

}

  return (
    <div className='mediaChainSection'>
      <div className="loaderSection">
      {loading && <>
      <div className="loader">Loading ...</div>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#FF4500"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </>
    }
      </div>
    <div className="btnSection">
        <button onClick={()=>handleScroll("left")}>
        <FaRegArrowAltCircleLeft className='btnIcons'/>
        </button>
        <button onClick={()=>handleScroll("right")}>
        <FaRegArrowAltCircleRight className='btnIcons'/>
        </button>
      </div>
      <h3>Recommended Restaurants For You.......</h3>
      <section className="chainSection" id='chainGallery' onScroll={(e)=>setScrollPosition(e.target.scrollLeft)} >
      {vendorData.vendors && vendorData.vendors.map((vendor) => {
        return (
          <>
            <div className="vendorBox">
          {vendor.firm.map((item) => {
            return (
             <>
              {/* <div>
                {item.firmName}
              </div> */}
              <div className="firmImage">
                <Link to={`/products/${item._id}/${item.firmName}`} ><img src={`${API_URL}/uploads/${item.image}`} /></Link>
              </div>

             </>
            )
          })}
            </div>
          </>
        )
      }) }
    </section>
    </div>
    
  )
}

export default Chains;

