import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import LocationNotice from "../components/Location.jsx";
import SubTitleNotice from "../components/SubTitle.jsx";

export default function Inquiry() {
  const [inqList, setInqList] = useState([]);

  useEffect(() => {
    fetch("data/inquiry.json")
      .then((res) => res.json())
      .then((result) => setInqList(result))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="content">
      <LocationNotice />
      <SubTitleNotice />
      <div className="count">
        <span className="count-no">
          <span className="count-no-icon">
            <FontAwesomeIcon icon={faList} />
          </span>
          <span className="count-no-text">
            <span className="count-no-red">{inqList.length}</span> 개의 게시물
          </span>
        </span>
      </div>
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {/* {
						noticeList.map((item, index)=> (
						<tr key={index}>
							<td className="notice-list-no">{item.no}</td>
							<td className="notice-list-subject">							
								<Link to={`/notice/${item.id}`}>
									<strong>{item.title}</strong>
									<img src={item.srcImg} alt={item.altImg} />
									<img src={item.srcNew} alt={item.altNew} />
								</Link>
							</td>
							<td className="notice-list-name">{item.author}</td>
							<td className="notice-list-date">{item.date}</td>					
						</tr>

						))
					} */}
        </tbody>
      </table>
      <Link to="/inquiry/write">
        <button type="button" style={{ marginTop: "20px" }}>
          글쓰기
        </button>
      </Link>
    </div>
  );
}
