import React from 'react';
import '../css/product.css'
import YouTubeSlider from './YouTubeSlider';
import YouTubeDetail from './YouTubeDetail';

const EverTv = () => {
  return (
    <div className='evertv-wrap'>
      <div className='marquee-wrap base01'>
        <div className='marquee'>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
        </div>
        <div className='marquee base01'>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
        </div>
      </div>
      <div className='youtube_deco'>
                <div className='youtube_pic base01'>
                    <img src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/main/deco_youtube_circle_txt.svg" alt="" />
                </div>
                <div className='youtube_pic base02'>
                    <img src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/main/deco_youtube_play.svg" alt="" />
                </div>
                <div className='youtube_pic base03'>
                    <img src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/main/deco_youtube_play_c.svg" alt="" />
                </div>
            </div>
            <YouTubeSlider/>
      <div className='marquee-wrap base01'>
        <div className='marquee'>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
        </div>
        <div className='marquee base01'>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
          <span>EVER TV </span>
        </div>
      </div>
    </div>
  );
};

export default EverTv;
