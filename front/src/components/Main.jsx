import React from "react";
import BannerSlider from './BannerSlider';
import ScrollUp from "./ScrollUp";
import MainNotice from "./MainNotice";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";
import '../css/product.css'
import OnlineStore from "./OnlieStore";
export default function Main() {
  return (
    <div>
        <BannerSlider />
        <ImageSlider mainsub_title1="NEW" mainsub_title2="RELEASE"/>
        <ImageSlider mainsub_title1="EVER" mainsub_title2="MUSIC"/>
        <ImageSlider mainsub_title1="EVER" mainsub_title2="MD"/>
				<MainNotice notice_title1="NEWS &" notice_title2="NOTICE" />
        <div className="evertv-title-wrap">
          <span className='evertv-title'>
              <h2>EVER</h2>
              <h2>TV</h2>
          </span>
          <iframe className="evertv" width="1240" height="515" src="https://www.youtube.com/embed/PnsvEIEdMog?si=OgS-dDnF2DmA4kkC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div className="bannerAD">
          <Link to="https://everlineshop.com/board/view.php?&bdId=bulkpurchase&sno=6">
            <img src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/img/banner/527240edf39824fd5c835e23afd541ae_65681.jpeg" alt="" />
          </Link>
        </div>
        <div className="onlinestore-title-wrap">
          <span className='onlinestore-title'>
              <h2>ONLINE</h2>
              <h2>STORE</h2>
          </span>
          <OnlineStore/>
        </div>
        <ScrollUp/>
    </div>
  );
}
