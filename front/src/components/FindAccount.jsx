import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import SubTitle from "./SubTitle.jsx";

const FindAccount = () => {
  const [mode, setMode] = useState("id"); // 'id' 또는 'ps'

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 id나 비밀번호 찾기를 처리하는 로직.
    console.log("Submitted:", mode);
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
                  /*     type="text"
                  name="userName"
                  ref={userNameRef}
                  value={formData.userName}
                  onChange={handleChange} */
                  placeholder=" 이름"
                  style={{
                    fontSize: "15px",
                    paddingLeft: "20px", // 여백 조절
                  }}
                />
              </li>
              <li>
                <input
                  /*     type="text"
                  name="userName"
                  ref={userNameRef}
                  value={formData.userName}
                  onChange={handleChange} */
                  placeholder=" 핸드폰 번호"
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
              <li onClick={() => handleSwitchMode("ps")}>비밀번호찾기</li>
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

      {mode === "ps" && (
        <div className="member" onSubmit={handleSubmit}>
          <SubTitle title="비밀번호찾기" />
          <form className="find-form">
            <ul>
              <li>
                <input
                  /*     type="text"
                  name="userName"
                  ref={userNameRef}
                  value={formData.userName}
                  onChange={handleChange} */
                  placeholder=" 아이디"
                  style={{
                    fontSize: "15px",
                    paddingLeft: "20px", // 여백 조절
                  }}
                />
              </li>
              <li>
                <input
                  /*     type="text"
                  name="userName"
                  ref={userNameRef}
                  value={formData.userName}
                  onChange={handleChange} */
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
