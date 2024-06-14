import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SubTitle from "./SubTitle.jsx";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state ? location.state.email : null;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    console.log("Reset button clicked"); // 추가
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      console.log("Sending request to server..."); // 추가
      const response = await axios.post(
        "http://192.168.50.76:8000/member/FindAccount/updateUserPassword",
        {
          email,
          newPassword,
        }
      );
      console.log("Response from server:", response.data); // 추가
      if (response.data.success) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/member");
      } else {
        setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error during password reset:", error); // 추가
      setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div className="content">
      <SubTitle title="비밀번호 재설정" />
      <div className="member">
        <div className="findaccount-emailauth">
          {email && <div className="findaccount-email">{email}</div>}
          <ul className="findaccount-emailauth-ul">
            <li className="findaccount-emailauth-first">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호"
              />
            </li>
            <li className="findaccount-emailauth-first">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
              />
            </li>
            <li className="findaccount-emailauth-btn2">
              <button className="red-btn" onClick={handleResetPassword}>
                비밀번호 재설정
              </button>
            </li>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
