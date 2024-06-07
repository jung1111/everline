import React from "react";
import BannerSlider from './BannerSlider';
import MainSub from "./MainSub";

export default function Main() {
  return (
    <div>
        <BannerSlider />
        <MainSub mainsub_title1="NEW" mainsub_title2="RELEASE"/>
        <MainSub mainsub_title1="EVER" mainsub_title2="MUSIC"/>
        <MainSub mainsub_title1="EVER" mainsub_title2="MD"/>
    </div>
  );
}
