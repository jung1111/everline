import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubTitle from "./SubTitle.jsx";
import axios from "axios";

const FindAccountPs = () => {
  const [mode, setMode] = useState("ps"); // 'id' 또는 'ps'
  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber1: "010",
    mobileNumber2: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        "http://localhost:8000/member/FindAccount/findUserId",
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

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/member/FindAccount/findUserPs",
        {
          userName: formData.userName,
          userId: formData.userId,
        }
      );
      const { cnt, email } = result.data;
      console.log(email);
      if (cnt === 1 && email) {
        navigate("/member/FindAccount/emailAuth", { state: { email } });
      } else {
        alert("사용자 정보가 일치하지 않습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="content">
      {mode === "id" && (
        <>
          <SubTitle title="아이디찾기" />
          <div className="member" onSubmit={handleSubmit}>
            <form className="findaccount-form">
              <div className="findaccount-all">
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
                  <li className="findaccount-firstnum">
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
              </div>
            </form>
            <div className="find-btn">
              <ul className="find-info">
                <li onClick={() => handleSwitchMode("ps")}>비밀번호찾기</li>
              </ul>
              <li>
                <button
                  className="red-btn"
                  type="submit"
                  onClick={handleSubmit}
                >
                  확인
                </button>
                <button className="white-btn" type="button">
                  로그인
                </button>
              </li>
            </div>
          </div>
        </>
      )}

      {mode === "ps" && (
        <>
          <SubTitle title="비밀번호찾기" />
          <div className="member" onSubmit={handleSubmit2}>
            <form className="findaccount-form">
              <div className="findaccount-all">
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
              </div>
            </form>
            <div className="find-btn">
              <ul className="find-info">
                <li onClick={() => handleSwitchMode("id")}>아이디찾기</li>
              </ul>
              <li className="find-btn">
                <button
                  className="red-btn"
                  type="button"
                  onClick={handleSubmit2}
                >
                  확인
                </button>
                <button className="white-btn" type="submit">
                  로그인
                </button>
              </li>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FindAccountPs;
