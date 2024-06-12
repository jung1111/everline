import '../css/product.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

export default function BannerSlider() {
  const [banners, setBanners] = useState([]); // 배너 데이터를 저장할 상태
  const [currentBanner, setCurrentBanner] = useState(0); // 현재 보여줄 배너의 인덱스를 저장할 상태

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/slide.json") // 배너 데이터를 가져오는 API 호출
      .then(res => setBanners(res.data)) // 데이터를 받아 상태에 저장
      .catch(error => console.log(error)); // 에러 로그 출력
  }, []);

  const goToPrevBanner = () => {
    const prevBanner = (currentBanner + banners.length - 1) % banners.length;
    setCurrentBanner(prevBanner); // 이전 배너로 이동
  };

  const goToNextBanner = () => {
    const nextBanner = (currentBanner + 1) % banners.length;
    setCurrentBanner(nextBanner); // 다음 배너로 이동
  };

  const goToBanner = (index) => {
    setCurrentBanner(index); // 특정 배너로 이동
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextBanner(),
    onSwipedRight: () => goToPrevBanner(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="BannerSlider-container" {...handlers} >
      <div className='BannerSlider-wrap'>
          <div className='BannerSlider-content'>
          <div className='currentBanner-left'>{`0${currentBanner + 1}`}</div>
            <div className="BannerSlider-button"><button  onClick={goToPrevBanner} className="btn-prev"></button></div>
            {banners.length > 0 && (
              <h3>
                  <h6>OFFICIAL MD</h6>
                  {banners[currentBanner].title}
                  <p>{banners[currentBanner].release}</p>
                  <Link className='link' to="/product">
                    <button className='more-btn'>More &nbsp;&nbsp;‣</button>
                  </Link>
                </h3>
            )}
          {banners.length > 0 && (
            <div className='BannerSlider-imgbox'><img src={banners[currentBanner].image} alt={`Banner ${currentBanner + 1}`} /></div>
            )}
          <div className="BannerSlider-button"><button onClick={goToNextBanner} className="btn-next"></button></div>
          <div className='currentBanner-right'>{`0${(currentBanner + 1) % banners.length + 1}`}</div>
        </div>
 
      </div>
        <div className='officialmd-box'>
          <span className='officialmd'>OFFICIAL MD</span>
            <div className="pagination">
          {banners.map((_, index) => (
          <div
          key={index}
          className={`pagination-dot ${index === currentBanner ? 'active' : ''}`}
          onClick={() => goToBanner(index)}
          ></div>
          ))}
        </div>
        </div>
    </div>
  );
}
