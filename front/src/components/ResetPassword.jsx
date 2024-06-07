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
      await axios.post("http://127.0.0.1:8000/reset-password", {
        email,
        newPassword,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/member/login");
    } catch (error) {
      setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="content">
      <SubTitle title="비밀번호 재설정" />
      {email && <div>Email: {email}</div>}
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="새 비밀번호"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
      />
      <button onClick={handleResetPassword}>비밀번호 재설정</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default ResetPassword;
