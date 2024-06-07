import React from "react";
import BannerSlider from './BannerSlider';
import MainSub from "./MainSub";
import ScrollUp from "./ScrollUp";
import MainNotice from "./MainNotice";

export default function Main() {
  return (
    <div>
        <BannerSlider />
        <MainSub mainsub_title1="NEW" mainsub_title2="RELEASE"/>
        <MainSub mainsub_title1="EVER" mainsub_title2="MUSIC"/>
        <MainSub mainsub_title1="EVER" mainsub_title2="MD"/>
				<MainNotice notice_title1="NEWS &" notice_title2="NOTICE" />
        <ScrollUp/>
    </div>
  );
}
