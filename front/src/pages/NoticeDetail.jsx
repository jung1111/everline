import React, { useEffect, useState } from "react";
import "../css/board.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import Location from "../components/Location";
import SubTitle from "../components/SubTitle";
import SubMenu from "../components/SubMenu";
import BoardButton from "../components/BoardButton";
import axios from "axios";

export default function NoticeDetail() {
  const [detailData, setDetailData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/notice.json")
      .then((res) => {
        setDetailData(res.data);
        const jsonData = res.data.find((res) => res.id === id);
        setDetailData(jsonData);
      })

      .catch((erorr) => console.log(erorr));
  }, [id]);

  return (
    <div className="content">
      <Location depth1="CUSTOMER" depth2="공지사항" />
      <SubTitle title="CUSTOMER" />
      <ul className="sub-menu">
        <SubMenu menu="공지사항" src="/notice" />
        <SubMenu menu="1:1문의" src="/inquiry" />
        <SubMenu menu="FAQ" src="/faq" />
      </ul>
      <div className="Board-detail">
        <h1 className="Board-detail-title">{detailData.title}</h1>
        <ul className="Board-detail-view">
          <li>
            <span className="Board-detail-icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <strong className="Board-detail-author">{detailData.author}</strong>
          </li>
          <li>
            <span className="Board-detail-icon">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <span className="Board-detail-date">{detailData.date}</span>
          </li>
        </ul>
        <div className="Board-detail-cont">
          <img src={detailData.img} alt={detailData.title} />
        </div>
        <Link to="/notice">
          <div className="BoardButton">
            <BoardButton button="목록" />
          </div>
        </Link>
      </div>
    </div>
  );
}
