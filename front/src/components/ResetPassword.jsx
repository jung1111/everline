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
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/member/FindAccount/updateUserPassword",
        {
          email,
          newPassword,
        }
      );
      if (response.data.success) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/member");
      } else {
        setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
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
