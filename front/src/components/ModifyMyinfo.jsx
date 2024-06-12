import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SubTitle from "./SubTitle.jsx";
import "../css/modify.css";

export default function ModifyMyinfo() {
  const [userInfo, setUserInfo] = useState({
    USER_ID: "",
    USER_NAME: "",
    MOBILE_NUMBER: "",
    EMAIL_ID: "",
    ZIPCODE: "",
    ADDRESS: "",
  });

  const { userId } = useParams(); // Assuming you're passing the user ID through the URL params
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user info when component mounts
    axios
      .get(`http://127.0.0.1:8000/modify/info?USER_ID=${userId}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => console.error("Error fetching user info:", error));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:8000/modify/update", userInfo)
      .then((response) => {
        if (response.data.success) {
          alert("회원정보가 성공적으로 수정되었습니다.");
          navigate("/mypage");
        } else {
          alert("회원정보 수정에 실패했습니다.");
        }
      })
      .catch((error) => console.error("Error updating user info:", error));
  };

  return (
    <div className="content">
      <SubTitle title="회원정보수정" />
      <div className="modify-all">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="USER_ID">아이디:</label>
            <input
              type="text"
              id="USER_ID"
              name="USER_ID"
              value={userInfo.USER_ID}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label className="USER_NAME">이름:</label>
            <input
              type="text"
              id="USER_NAME"
              name="USER_NAME"
              value={userInfo.USER_NAME}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label className="MOBILE_NUMBER">전화번호:</label>
            <input
              type="text"
              id="MOBILE_NUMBER"
              name="MOBILE_NUMBER"
              value={userInfo.MOBILE_NUMBER}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="EMAIL_ID">이메일:</label>
            <input
              type="email"
              id="EMAIL_ID"
              name="EMAIL_ID"
              value={userInfo.EMAIL_ID}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="ZIPCODE">우편번호:</label>
            <input
              type="text"
              id="ZIPCODE"
              name="ZIPCODE"
              value={userInfo.ZIPCODE}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="ADDRESS">주소:</label>
            <input
              type="text"
              id="ADDRESS"
              name="ADDRESS"
              value={userInfo.ADDRESS}
              onChange={handleChange}
            />
          </div>
          <button type="submit">수정</button>
        </form>
      </div>
    </div>
  );
}
