import '../css/product.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BannerSlider() {
const [banners, setBanners] = useState([])

useEffect(()=>{
  axios
    .get("http://localhost:3000/data/slide.json")
    .then(res=> setBanners(res.data))
    .catch(error=>console.log(error));
},{})


const [currentBanner, setCurrentBanner] = useState(0);

  const goToPrevBanner = () => {
    const prevBanner = (currentBanner + banners.length - 1) % banners.length;
    setCurrentBanner(prevBanner);
  };

  const goToNextBanner = () => {
    const nextBanner = (currentBanner + 1) % banners.length;
    setCurrentBanner(nextBanner);
  };

  return (
    <div className="BannerSlider-container">
      <div className="BannerSlider-content">
        {banners.map((banner, index)=>(
          <div>
          <h3 style={{ display: index === currentBanner ? 'block' : 'none' }}><h6 style={{ display: index === currentBanner ? 'block' : 'none' }}>OFFICIAL MD</h6>{banner.title}</h3>
          <img key={index} src={banner.image} alt={`Banner ${currentBanner + 1}`} style={{ display: index === currentBanner ? 'block' : 'none' }} />
          <Link to="/product"><button className='more-btn' style={{ display: index === currentBanner ? 'block' : 'none' }}>More</button></Link>
        </div>
        ))}
          <button onClick={goToPrevBanner} className="prev"></button>
          <button onClick={goToNextBanner} className="next"></button>
      </div>
      <span className='officialmd'>OFFICIAL MD</span>
    </div>
  );
}