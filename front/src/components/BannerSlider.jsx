
import '../css/product.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

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
  const goToBanner = (index) => {
    setCurrentBanner(index);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextBanner(),
    onSwipedRight: () => goToPrevBanner(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
        <div className="BannerSlider-container" >
          <div className="BannerSlider-content">
            <div className='currentBanner-left'>{`0${currentBanner+1}`}</div>
            <div className='currentBanner-right'>{`0${currentBanner+2}`}</div>
            {banners.map((banner, index)=>(
              <div {...handlers} className='BannerSlider-imgbox'>
                <h3 style={{ display: index === currentBanner ? 'block' : 'none' }}><h6 style={{ display: index === currentBanner ? 'block' : 'none' }}>OFFICIAL MD</h6>{banner.title}
                  <p>{banner.release}</p>
                  <Link to="/product" ><button className='more-btn' style={{ display: index === currentBanner ? 'block' : 'none' }}>More &nbsp;&nbsp;‣</button></Link>
                </h3>
                <img key={index} src={banner.image} alt={`Banner ${currentBanner + 1}`} style={{ display: index === currentBanner ? 'block' : 'none' }} />
              </div>
            ))}
              <button onClick={goToPrevBanner} className="prev"></button>
              <button onClick={goToNextBanner} className="next"></button>
          </div>
          <div className="pagination">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`pagination-dot ${index === currentBanner ? 'active' : ''}`}
            onClick={() => goToBanner(index)}
          ></div>
        ))}
      </div>
          <span className='officialmd'>OFFICIAL MD</span>
  </div>
  );
}