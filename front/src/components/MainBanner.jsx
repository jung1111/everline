/* import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/swiper.css"; // 슬라이더 스타일링을 위한 CSS 파일을 import합니다.

const TOTAL_SLIDES = 3;

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidelist, setSlideList] = useState([]);
  useEffect(() => {
    axios
      .get("/data/slide.json")
      .then((res) => setSlideList(res.data))
      .catch((error) => console.log(error));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % TOTAL_SLIDES);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? TOTAL_SLIDES - 1 : prevSlide - 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="slider-container">
      <div
        className="slides"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "none",
        }}
      >
        {slidelist.map((slide, index) => (
          <div key={slide.id} className="slide">
            <div>
                <div className="slide_num">
                  <div>{currentSlide+1}</div>
                  <div>{currentSlide+2}</div>
                </div>
                <div className="slide_container">
                  <div className="slide_content">
                    <span>OIFFICIAL MD</span>
                    <strong>{slide.title}</strong>
                    <p>판매기간</p>
                    <Link to="/product"><div>More</div></Link>
                  </div>
                  <img className="slide_img" src={slide.image} alt={`Slide ${index + 1}`}/>
                  <div className="slide_bottom">OFFICIAL MD</div>
                </div>
            </div>
          </div>
        ))}
      </div>
<div className="button_box">
        <div>
          <button className="prev_btn" onClick={prevSlide}>이전</button>
        </div>
        <div>
          <button className="next_btn" onClick={nextSlide}>다음</button>
        </div>
</div>
    </div>
  );
};

export default Slider; */
