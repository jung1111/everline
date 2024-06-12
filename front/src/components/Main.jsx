import React from "react";
import BannerSlider from "./BannerSlider";
import ScrollUp from "./ScrollUp";
import MainNotice from "./MainNotice";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";
import "../css/product.css";
import OnlineStore from "./OnlieStore";
import EverTv from "./EverTv.jsx";
export default function Main() {
  return (
    <div>
      <BannerSlider />
      <ImageSlider mainsub_title1="NEW" mainsub_title2="RELEASE" />
      <ImageSlider mainsub_title1="EVER" mainsub_title2="MUSIC" />
      <ImageSlider mainsub_title1="EVER" mainsub_title2="MD" />
      <MainNotice notice_title1="NEWS &" notice_title2="NOTICE" />
      <EverTv />
      <div className="bannerAD">
        <Link to="https://everlineshop.com/board/view.php?&bdId=bulkpurchase&sno=6">
          <img
            src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/img/banner/527240edf39824fd5c835e23afd541ae_65681.jpeg"
            alt=""
          />
        </Link>
      </div>
      <div className="onlinestore-title-wrap">
        <span className="onlinestore-title">
          <h2>ONLINE</h2>
          <h2>STORE</h2>
        </span>
        <OnlineStore />
      </div>
      <ScrollUp />
    </div>
  );
}
