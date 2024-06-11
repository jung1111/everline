import React, { useState, useRef } from "react";
import "../css/member.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SubTitle from "../components/SubTitle.jsx";
import { ReactComponent as NaverIcon } from "../svg/icon_sns_login_naver.svg";
import { ReactComponent as KakaoIcon } from "../svg/icon_sns_login_kakao.svg";
import { ReactComponent as AppleIcon } from "../svg/icon_sns_login_apple.svg";
import * as cookie from "../util/cookies.js";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const userIdRef = useRef(null);
  const userPassRef = useRef(null);
  const [formData, setFormData] = useState({ userId: "", userPass: "" });

  const handleChange = (e) => {
    const { name, value } = e.target; // {name:userId, value:'test'},{name:userPass, value:'1234'}
    setFormData({ ...formData, [name]: value });
  };

  /**
   * 로그인 버튼 클릭 - 서버연동
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validataionCheck()) {
      const url = "http://127.0.0.1:8000/member/login";
      axios({
        method: "POST",
        url: url,
        data: formData,
      })
        .then((res) => {
          console.log("result ->", res.data);
          if (res.data.cnt === 1) {
            console.log("token", res.data.token);
            cookie.setCookie("x-auth-jwt", res.data.token);
            // cookie에 저장된 token에서 userInfo를 localstorage에서 저장
            const userInfo = jwtDecode(res.data.token); //복호화
            // alert(JSON.stringify(userInfo));
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            alert("로그인 성공!!");
            navigate("/"); //홈으로 이동
          } else {
            alert("로그인 실패, 다시 입력해주세요");
            setFormData({ userId: "", userPass: "" });
            userIdRef.current.focus();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const validataionCheck = () => {
    let checkFlag = true;

    if (!formData.userId.trim()) {
      alert("아이디를 입력해주세요");
      userIdRef.current.focus();
      checkFlag = false;
    } else if (!formData.userPass.trim()) {
      alert("패스워드를 입력해주세요");
      userPassRef.current.focus();
      checkFlag = false;
    }
    return checkFlag;
  };

  return (
    <div className="content">
      <SubTitle title="로그인" style={{ fontWeight: "900" }} />
      <div className="member">
        <form className="member-form" onSubmit={handleSubmit}>
          <div className="login-info">
            <ul className="member-input">
              <li>
                <input
                  type="text"
                  name="userId"
                  ref={userIdRef}
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="  아이디"
                  className="input-field"
                />
              </li>
              <li>
                <input
                  type="password"
                  name="userPass"
                  ref={userPassRef}
                  value={formData.userPass}
                  onChange={handleChange}
                  placeholder="  비밀번호"
                  className="input-field"
                />
              </li>
            </ul>

            <ul className="member-find-btn">
              <li>
                <label className="custom-checkbox-label">
                  <input type="checkbox" className="custom-checkbox" /> 아이디
                  저장
                </label>
              </li>
              <li>
                <Link to="/member/FindAccount">
                  <span>아이디 찾기</span>
                </Link>
              </li>
              <li>|</li>
              <li>
                <Link to="/member/FindAccount">
                  <span>비밀번호 찾기</span>
                </Link>
              </li>
            </ul>
            <ul className="member-btn">
              <li>
                <button className="red-btn" type="submit">
                  로그인
                </button>
                <Link to="/member/signup" style={{ textDecoration: "none" }}>
                  <button className="white-btn" type="button">
                    <span className="member-link-color1">회원가입</span>
                  </button>
                </Link>
              </li>
            </ul>

            <ul className="member-sns-btn">
              <li>
                <Link to="https://bit.ly/3weQpic">
                  <button className="naver-btn" type="button">
                    <NaverIcon />
                    네이버 아이디로 로그인
                  </button>
                </Link>
                <Link to="https://bit.ly/44x2wDK">
                  <button className="kakao-btn" type="button">
                    <KakaoIcon />
                    카카오 아이디로 로그인
                  </button>
                </Link>
                <Link to="https://apple.co/3UxpE0v">
                  <button className="apple-btn" type="button">
                    <AppleIcon />
                    애플 아이디로 로그인
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
