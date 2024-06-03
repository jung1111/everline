import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubTitle from "./SubTitle.jsx";
import axios from "axios";

const FindAccount = () => {
  const [mode, setMode] = useState("id"); // 'id' 또는 'ps'
  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber1: "010",
    mobileNumber2: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setFormData({
      userName: "",
      mobileNumber1: "010",
      mobileNumber2: "",
    });
    setResult(null);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://127.0.0.1:8000/member/FindAccount/findUserId",
        {
          userName: formData.userName,
          mobileNumber1: formData.mobileNumber1,
          mobileNumber2: formData.mobileNumber2,
        }
      );
      const { userId, userName } = result.data; // 서버에서 반환하는 데이터 구조에 맞게 userId 추출
      setResult(userId);
      setError(null);
      if (userId) {
        console.log("ID----------->", userId);
        alert(`${userName}님 아이디는 ${userId} 입니다.`);
      } else {
        alert("입력하신 정보에 맞는 아이디가 존재하지 않습니다");
      }
    } catch (error) {
      setError(error.result ? error.result.data.error : "Error occurred");
      setResult(null);
    }
  };

  return (
    <div className="content">
      {mode === "id" && (
        <div className="member" onSubmit={handleSubmit}>
          <SubTitle title="아이디찾기" />
          <form className="find-form">
            <ul>
              <li>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder=" 이름"
                  style={{
                    fontSize: "15px",
                    paddingLeft: "20px", // 여백 조절
                  }}
                />
              </li>
              <li>
                <input
                  type="text"
                  name="mobileNumber1"
                  value={formData.mobileNumber1}
                  onChange={handleChange}
                  placeholder=" 핸드폰 앞자리"
                  style={{ fontSize: "15px", paddingLeft: "20px" }}
                />
                <input
                  type="text"
                  name="mobileNumber2"
                  value={formData.mobileNumber2}
                  onChange={handleChange}
                  placeholder=" 핸드폰 뒷자리"
                  style={{ fontSize: "15px", paddingLeft: "20px" }}
                />
              </li>
            </ul>
          </form>
          <div className="find-btn">
            <ul className="find-info">
              <li onClick={() => handleSwitchMode("ps")}>비밀번호찾기</li>
            </ul>
            <li>
              <button className="red-btn" type="submit" onClick={handleSubmit}>
                확인
              </button>
              <button className="white-btn" type="button">
                <Link to="/member">로그인</Link>
              </button>
            </li>
          </div>
        </div>
      )}

      {mode === "ps" && (
        <div className="member" onSubmit={handleSubmit}>
          <SubTitle title="비밀번호찾기" />
          <form className="find-form">
            <ul>
              <li>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder=" 아이디"
                  style={{
                    fontSize: "15px",
                    paddingLeft: "20px", // 여백 조절
                  }}
                />
              </li>
              <li>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder=" 이름"
                  style={{
                    fontSize: "15px",
                    paddingLeft: "20px", // 여백 조절
                  }}
                />
              </li>
            </ul>
          </form>
          <div className="find-btn">
            <ul className="find-info">
              <li onClick={() => handleSwitchMode("id")}>아이디찾기</li>
            </ul>
            <li>
              <button className="red-btn" type="button">
                확인
              </button>
              <button className="white-btn" type="submit">
                <Link to="/member">로그인</Link>
              </button>
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindAccount;
