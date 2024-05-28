import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import LocationNotice from "../components/LocationNotice.jsx";
import SubTitleNotice from "../components/SubTitleNotice.jsx";
import TableNotice from "../components/TableNotice.jsx";

export default function Notice() {
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    fetch("data/notice.json")
      .then((res) => res.json())
      .then((result) => setNoticeList(result))
      .catch((error) => console.log(error));

    // axios.get('http://127.0.0.1:8080/notice') 서버연동
    // 	.then(res => setNoticeList(res.data))
    // 	.catch(erorr => console.log(erorr))
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
            <span className="count-no-red">{noticeList.length}</span> 개의
            게시물
          </span>
        </span>
      </div>
      <TableNotice noticeList={noticeList} />
    </div>
  );
}
