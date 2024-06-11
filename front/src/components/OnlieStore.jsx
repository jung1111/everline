import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


const OnlineStore = ({img, mainsub_title1, mainsub_title2,location,locationDetail}) => {


    return (
    <div className='onlinestore'>
        <div>
            <span>
                <img className='onlinestore-img' src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/store/pic_store_cafe.jpg" alt="" />
            </span>
            <div className='onlinestore-location'>
                <span>
                    <p>에버라인 뮤직 & 카페</p>
                    <p>1F/B1F : EVERLINE MUSIC & CAFE, 2F : EVERLINE EVENT HALL</p>
                </span>
                <span >
                    <button className='onlinestore-location-btn1' type="button"><FontAwesomeIcon icon={faPhone}/></button>
                    <button className='onlinestore-location-btn2' type="button"><FontAwesomeIcon icon={faLocationDot}/></button>
                </span>
            </div>
        </div>
        <div>
            <span>
                <img className='onlinestore-img' src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/store/pic_store_hyundai.jpg" alt="" />
            </span>
            <div className='onlinestore-location'>
                <span>
                    <p>에버라인 여의도 더현대점 3층</p>
                    <p>3F ALBUM & GOODS & EVENT</p>
                </span>
                <span >
                    <button className='onlinestore-location-btn1' type="button"><FontAwesomeIcon icon={faPhone}/></button>
                    <button className='onlinestore-location-btn2' type="button"><FontAwesomeIcon icon={faLocationDot}/></button>
                </span>
            </div>
        </div>
        <div>
            <span>
                <img className='onlinestore-img' src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/store/pic_store_hyundai5F.jpeg" alt="" />
            </span>
            <div className='onlinestore-location'>
                <span>
                    <p>에버라인 여의도 더현대점 5층</p>
                    <p>5F ALBUM & GOODS & EVENT</p>
                </span>
                <span >
                    <button className='onlinestore-location-btn1' type="button"><FontAwesomeIcon icon={faPhone}/></button>
                    <button className='onlinestore-location-btn2' type="button"><FontAwesomeIcon icon={faLocationDot}/></button>
                </span>
            </div>
        </div>
        <div>
            <span>
                <img className='onlinestore-img' src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/store/pic_store_hyundai5F.jpeg" alt="" />
            </span>
            <div className='onlinestore-location'>
                <span>
                    <p>에버라인 동대문 현대시티아울렛 B1F</p>
                    <p>B1F ALBUM & GOODS & EVENT</p>
                </span>
                <span >
                    <button className='onlinestore-location-btn1' type="button"><FontAwesomeIcon icon={faPhone}/></button>
                    <button className='onlinestore-location-btn2' type="button"><FontAwesomeIcon icon={faLocationDot}/></button>
                </span>
            </div>
        </div>

      </div>
  );
};

export default OnlineStore;
