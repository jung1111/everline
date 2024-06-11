import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ImageSlider = ({ mainsub_title1, mainsub_title2, target }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios
      .get('/data/product.json')
      .then(res => {
        const filteredImages = res.data.filter(product => product.category === target).map(product => product.image);
        setImages(filteredImages);
      })
      .catch(error => console.error(error));
  }, [target]);

  useEffect(() => {
    const percentage = ((currentIndex + 1) / images.length) * 100;
    setProgress(percentage);
  }, [currentIndex, images]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className='image-slider-wrap'>
      <div className="image-slider">
        <span>
          <h2>{mainsub_title1}</h2>
          <h2>{mainsub_title2}</h2>
          <div className='button-box'>
            <button className="slider-button prev" onClick={handlePrev}></button>
            <button className="slider-button next" onClick={handleNext}></button>
          </div>
        </span>
        <div className="slider-image-wrapper">
          {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
            <Link to={`/Detail/${currentIndex + index+1}`} key={index}>
              <img src={image} alt={`slide-${currentIndex + index}`} />
            </Link>
          ))}
        </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%`, background: `#ee2737` }}></div>
          </div>
      </div>
    </div>
  );
};

export default ImageSlider;
