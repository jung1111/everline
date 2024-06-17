import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const OnlineStore = () => {
  return (
    <div className="onlinestore">
      <div>
        <span>
          <img
            className="onlinestore-img"
            src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/store/pic_store_cafe.jpg"
            alt=""
          />
        </span>
        <div className="onlinestore-location">
          <span>
            <p>에버라인 뮤직 & 카페</p>
            <p>1F/B1F : EVERLINE MUSIC & CAFE, 2F : EVERLINE EVENT HALL</p>
          </span>
          <span>
            <button className="onlinestore-location-btn1" type="button">
              <FontAwesomeIcon icon={faPhone} />
            </button>
            <Link to="https://map.kakao.com/?map_type=TYPE_MAP&itemId=743136707&q=%EC%97%90%EB%B2%84%EB%9D%BC%EC%9D%B8+%EB%AE%A4%EC%A7%81%26%EC%B9%B4%ED%8E%98&urlLevel=3&urlX=487212&urlY=1127617">
              <button className="onlinestore-location-btn2" type="button">
                <FontAwesomeIcon icon={faLocationDot} />
              </button>
            </Link>
          </span>
        </div>
      </div>
      <div>
        <span>
          <img
            className="onlinestore-img"
            src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/store/pic_store_hyundai.jpg"
            alt=""
          />
        </span>
        <div className="onlinestore-location">
          <span>
            <p>에버라인 여의도 더현대점 3층</p>
            <p>3F ALBUM & GOODS & EVENT</p>
          </span>
          <span>
            <button className="onlinestore-location-btn1" type="button">
              <FontAwesomeIcon icon={faPhone} />
            </button>
            <Link to="https://map.kakao.com/?map_type=TYPE_MAP&itemId=397063169&q=%EC%97%90%EB%B2%84%EB%9D%BC%EC%9D%B8+%EB%8D%94%ED%98%84%EB%8C%80%EC%84%9C%EC%9A%B8+%ED%94%84%EB%A1%9C%EB%AA%A8%EC%85%98%EC%A0%90&urlLevel=3&urlX=484135&urlY=1118372">
              <button className="onlinestore-location-btn2" type="button">
                <FontAwesomeIcon icon={faLocationDot} />
              </button>
            </Link>
          </span>
        </div>
      </div>
      <div>
        <span>
          <img
            className="onlinestore-img"
            src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/store/pic_store_hyundai5F.jpeg"
            alt=""
          />
        </span>
        <div className="onlinestore-location">
          <span>
            <p>에버라인 여의도 더현대점 5층</p>
            <p>5F ALBUM & GOODS & EVENT</p>
          </span>
          <span>
            <button className="onlinestore-location-btn1" type="button">
              <FontAwesomeIcon icon={faPhone} />
            </button>
            <Link to="https://map.kakao.com/?map_type=TYPE_MAP&itemId=397063169&q=%EC%97%90%EB%B2%84%EB%9D%BC%EC%9D%B8+%EB%8D%94%ED%98%84%EB%8C%80%EC%84%9C%EC%9A%B8+%ED%94%84%EB%A1%9C%EB%AA%A8%EC%85%98%EC%A0%90&urlLevel=3&urlX=484135&urlY=1118372">
              <button className="onlinestore-location-btn2" type="button">
                <FontAwesomeIcon icon={faLocationDot} />
              </button>
            </Link>
          </span>
        </div>
      </div>
      <div>
        <span>
          <img
            className="onlinestore-img"
            src="https://elineptr1902.cdn-nhncommerce.com/data/skin/front/everline/images/store/pic_store_hyundai5F.jpeg"
            alt=""
          />
        </span>
        <div className="onlinestore-location">
          <span>
            <p>에버라인 동대문 현대시티아울렛 B1F</p>
            <p>B1F ALBUM & GOODS & EVENT</p>
          </span>
          <span>
            <button className="onlinestore-location-btn1" type="button">
              <FontAwesomeIcon icon={faPhone} />
            </button>
            <Link to="https://map.kakao.com/?map_type=TYPE_MAP&q=%EB%8F%99%EB%8C%80%EB%AC%B8+%ED%98%84%EB%8C%80%EC%95%84%EC%9A%B8%EB%A0%9B&urlLevel=3&urlX=501700&urlY=1130343">
              <button className="onlinestore-location-btn2" type="button">
                <FontAwesomeIcon icon={faLocationDot} />
              </button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default OnlineStore;
