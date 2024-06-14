import React, { useState } from "react";
import "../css/board.css";
import Location from "../components/Location";
import SubTitle from "../components/SubTitle";
import SubMenu from "../components/SubMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NoticeWrite() {
  const navigate = useNavigate();

  const [boardFormData, setBoardFormData] = useState({
    btitle: "",
    bcontent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoardFormData({ ...boardFormData, [name]: value });
  };
  console.log(boardFormData);

  //등록완료
  const handleWriteSubmit = () => {
    const url = "http://192.168.50.76:8000/inquiry/write";
    axios({
      method: "post",
      url: url,
      data: boardFormData,
    })
      .then((res) => {
        if (res.data.cnt === 1) {
          navigate("/inquiry");
          // alert('등록완료!')
        }
      })
      .catch((error) => console.log(error));
  };

  //다시쓰기
  const handleWriteReset = () => {
    setBoardFormData({ btitle: "", bcontent: "" });
  };

  //리스트로 이동
  const handleNavigate = () => {
    navigate("/inquiry");
  };

  return (
    <div className="content">
      <Location depth1="CUSTOMER" depth2="1:1문의" />
      <SubTitle title="CUSTOMER" />
      <ul className="sub-menu">
        <SubMenu menu="공지사항" src="/notice" />
        <SubMenu menu="1:1문의" src="/inquiry" />
        <SubMenu menu="FAQ" src="/faq" />
      </ul>
      <div className="Board">
        <table className="Board-table">
          <tbody>
            <tr>
              <th scope="row">제목</th>
              <td>
                <input
                  type="text"
                  name="btitle"
                  value={boardFormData.btitle}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">내용</th>
              <td>
                <textarea
                  name="bcontent"
                  value={boardFormData.bcontent}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="BoardButton">
          <button className="red" type="button" onClick={handleWriteSubmit}>
            등록완료
          </button>
          <button type="button" onClick={handleWriteReset}>
            다시쓰기
          </button>
          <button type="button" onClick={handleNavigate}>
            리스트
          </button>
        </div>
      </div>
    </div>
  );
}
