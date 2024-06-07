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
  /* 
  const sendAuthCode = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/member/send-auth-code",
        {
          email: userEmail,
          userId,
          userName,
        }
      );
      setAuthCode(response.data.authCode);
      console.log("Auth code sent:", response.data.authCode);
    } catch (error) {
      console.error("Error sending auth code:", error);
    }
  }; */

  const handleSendAuthCode = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/member/send-auth-code",
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
      navigate("/member/FindAccount/resetPassword", { state: { email } });
    } else {
      setError("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="content">
      <SubTitle title="이메일 인증" />
      {email && <div>Email: {email}</div>}
      <button onClick={handleSendAuthCode}>인증번호 전송</button>
      <input
        type="text"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="인증번호 입력"
      />
      <button onClick={handleVerifyAuthCode}>인증하기</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {/*  <input
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={sendAuthCode}>Send Auth Code</button>
      {userEmail && <p>Email: {userEmail}</p>}
      {authCode && <p>Auth Code: {authCode}</p>}{" "} */}
    </div>
  );
};

export default EmailAuth;
