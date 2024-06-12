import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const YouTubeSlider = () => {
  const [videos] = useState([
    { id: 'PnsvEIEdMog', 
      title: 'YouTube Developers Live: Embedded Web Player Customization', 
      image: 'https://elineptr1902.cdn-nhncommerce.com/data/hero/9165dddfa5cec82a21f19e81de25a929_52972.jpg'},

    { id: 'BE_Q4C3lZDo', 
      title: 'Rick Astley - Never Gonna Give You Up',
      image: 'https://elineptr1902.cdn-nhncommerce.com/data/hero/0b17a55d0706a387cddfd08a6fbb1929_44446.jpg' },

    { id: 's0ZQ_mgWXOM', 
      title: 'Charlie Puth - Attention [Official Video]',
      image: 'https://elineptr1902.cdn-nhncommerce.com/data/hero/b2cbd6825765596b22d6fcb9c83beb7e_12749.jpg' }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <div className='youtube-slider-wrap'>
      <div className="youtube-slider">
        <div className='youtube-slider-button-box'>
          <button className="youtube-slider-button prev" onClick={handlePrev}></button>
          <button className="youtube-slider-button next" onClick={handleNext}></button>
        </div>
        <div className="slider-video-wrapper">
          {videos.slice(currentIndex, currentIndex + 1).map((video, index) => (
            <Link to={`https://www.youtube.com/watch?v=${video.id}`} key={index}>
              <img className='youtube-img'
                src={video.image}
                alt={`slide-${currentIndex + index}`}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouTubeSlider;
