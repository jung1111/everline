import React, { useState, useRef } from "react";
import "../css/member.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faN } from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import SubTitle from "../components/SubTitle.jsx";

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
          <div className="member-back">
            <ul className="member-input">
              <li>
                <input
                  type="text"
                  name="userId"
                  ref={userIdRef}
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="  아이디"
                  class="input-field"
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
                  class="input-field"
                />
              </li>
            </ul>

            <ul className="member-find-btn">
              <li>
                <label>
                  <input type="checkbox" className="custom-checkbox" /> 아이디
                  저장
                </label>
              </li>
              <li>
                <Link to="/member/FindAccount">
                  <span className="member-link-colo1r">아이디 찾기</span>
                </Link>
              </li>
              <li>|</li>
              <li>
                <Link to="/member/FindAccount">
                  <span className="member-link-color1">비밀번호 찾기</span>
                </Link>
              </li>
            </ul>
            <ul className="member-btn">
              <li>
                <button className="red-btn" type="submit">
                  로그인
                </button>
                <button className="white-btn" type="button">
                  <Link to="/member/signup" style={{ textDecoration: "none" }}>
                    <span className="member-link-color2">회원가입</span>
                  </Link>
                </button>
              </li>
            </ul>
            <ul className="member-sns-btn">
              <li>
                <button className="naver-btn" type="button">
                  <FontAwesomeIcon
                    icon={faN}
                    style={{ fontSize: "17px", fontWeight: "bold" }}
                  />
                  <Link
                    to="https://bit.ly/3weQpic"
                    className="member-link-color3"
                  >
                    네이버 아이디로 로그인
                  </Link>
                </button>
                <button className="kakao-btn" type="button">
                  <FontAwesomeIcon
                    icon={faComment}
                    style={{ fontSize: "15px" }}
                  />
                  <Link
                    to="https://bit.ly/44x2wDK"
                    className="member-link-color4"
                  >
                    카카오 아이디로 로그인
                  </Link>
                </button>
                <button className="apple-btn" type="button">
                  <FontAwesomeIcon
                    icon={faApple}
                    style={{ fontSize: "20px" }}
                  />
                  <Link
                    to="https://apple.co/3UxpE0v"
                    className="member-link-color5"
                  >
                    애플 아이디로 로그인
                  </Link>
                </button>
              </li>{" "}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
