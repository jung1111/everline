import React from "react";
import { Link } from "react-router-dom";

export default function TableNotice({ noticeList }) {
  return (
    <div className="notice">
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
          {noticeList.map((item, index) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
