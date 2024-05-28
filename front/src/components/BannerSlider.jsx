import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BannerSlider = () => {
const [currentIndex, setCurrentIndex] = useState(0);
const [slidelist, setSlideList] = useState([]);

    useEffect(() => {
    axios
    .get("/data/slide.json")
    .then((res) => setSlideList(res.data))
    .catch((error) => console.log(error));
}, []);

const goToPrevSlide = () => {
    const index = (currentIndex - 1 + slidelist.length) % slidelist.length;
    setCurrentIndex(index);
};

const goToNextSlide = () => {
    const index = (currentIndex + 1) % slidelist.length;
    setCurrentIndex(index);
};

return (
    <div className="banner_slider">
        <div className="banner_slider_number"> 
            <span>{currentIndex +2}</span>
            <span>{currentIndex +1}</span>
        </div>
        <div className="button_box_prev">
            <button className="prev" onClick={goToPrevSlide}></button>
        </div>
        <div className="slider_container">
            {slidelist.map((banner, index) => (
            <div key={index} className={`slide ${index === currentIndex ? "active" : ""}`}>
                <div className="slide_box"> 
                    <div className="caption">
                        <p>OFFICIAL MD</p>
                        <strong>{banner.title}</strong>
                        <p>발매일</p>
                        <Link to="/product"><button className="more" type="button">More</button></Link>
                    </div>
                    <img className ="img"src={banner.image} alt="" />
                    <div>OFFICIAL MD</div>
                </div>
            </div>
            ))}
        </div>
        <div className="button_box_next">
            <button className="next" onClick={goToNextSlide}></button>
        </div>
    </div>
  );
};

export default BannerSlider;
