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

export default function WinnerNoticeDetail() {
  const [winnerList, setWinnerList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://192.168.50.76:3000/data/winner.json")
      .then((res) => {
        setWinnerList(res.data);
        const result = res.data.find((res) => res.id === id);
        setWinnerList(result);
      })
      .catch((error) => console.log(error));
  }, [id]);

  console.log(winnerList);

  return (
    <div className="content">
      <Location depth1="EVENT" depth2="당첨자발표" />
      <SubTitle title="EVENT" />
      <ul className="sub-menu">
        <SubMenu menu="이벤트목록" src="/eventlist" />
        <SubMenu menu="당첨자발표" src="/winner" />
      </ul>
      <div className="Board-detail">
        <h1 className="Board-detail-title">{winnerList.title}</h1>
        <ul className="Board-detail-view">
          <li>
            <span className="Board-detail-icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <strong className="Board-detail-author">{winnerList.author}</strong>
          </li>
          <li>
            <span className="Board-detail-icon">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <span className="Board-detail-date">{winnerList.date}</span>
          </li>
        </ul>
        <div className="Board-detail-cont">
          <div className="line-break">
            {winnerList.cont &&
              winnerList.cont
                .split("\n")
                .map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </div>
        <Link to="/winner">
          <div className="BoardButton">
            <BoardButton button="목록" />
          </div>
        </Link>
      </div>
    </div>
  );
}
