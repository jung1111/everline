import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SubTitle from "./SubTitle.jsx";

const EmailAuth = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state ? location.state.email : null;
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  const handleSendAuthCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/member/send-auth-code",
        { email }
      );
      setAuthCode(response.data.authCode); // 서버에서 받은 인증번호 저장
      alert("인증번호가 이메일로 전송되었습니다.");
    } catch (error) {
      setError("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleVerifyAuthCode = () => {
    if (inputCode === authCode) {
      alert("인증되었습니다");
      navigate("/member/FindAccount/resetPassword", { state: { email } });
    } else {
      setError("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="content">
      <SubTitle title="이메일 인증" />
      <div className="member">
        <div className="findaccount-emailauth">
          {email && <div className="findaccount-email">{email}</div>}
          <ul className="findaccount-emailauth-ul">
            <li className="findaccount-emailauth-btn">
              <button className="red-btn" onClick={handleSendAuthCode}>
                인증번호 전송
              </button>
            </li>
            <li className="findaccount-emailauth-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="인증번호 입력"
              />
            </li>
            <li>
              <button className="red-btn" onClick={handleVerifyAuthCode}>
                인증하기
              </button>
            </li>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailAuth;
