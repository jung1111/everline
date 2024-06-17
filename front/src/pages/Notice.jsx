import "../css/board.css";
import React, { useState, useEffect } from "react";
import Location from "../components/Location";
import SubTitle from "../components/SubTitle";
import SubMenu from "../components/SubMenu";
import Table from "../components/Table";
import axios from "axios";

export default function Notice() {
  const [noticeList, setNoticeList] = useState([]); //json데이터
  const [listPage, setListPage] = useState([]); // 목록에 보여줄 게시글
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const pageSize = 8; // 페이지당 게시글 갯수

  const handleChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/notice.json")
      .then((result) => {
        setNoticeList([...result.data]);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    setListPage(noticeList.slice(startIndex, endIndex));
  }, [noticeList, currentPage]);

  return (
    <div className="content">
      <Location depth1="CUSTOMER" depth2="공지사항" />
      <SubTitle title="CUSTOMER" />
      <ul className="sub-menu">
        <SubMenu menu="공지사항" src="/notice" />
        <SubMenu menu="1:1문의" src="/inquiry" />
        <SubMenu menu="FAQ" src="/faq" />
      </ul>
      <Table
        name="notice"
        currentPage={currentPage}
        pageSize={pageSize}
        handleChange={handleChange}
        listPage={listPage}
      />
    </div>
  );
}
