import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faN } from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const userIdRef = useRef(null);
  const userPassRef = useRef(null);
  const [formData, setFormData] = useState({ userId: "", userPass: "" });

  const handleChange = (e) => {
    const { name, value } = e.target; // {name:userId, value:'test'},{name:userPass, value:'1234'}
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    //submit 버튼이 클릭했습니다. 이벤트!!!
    e.preventDefault();

    if (validataionCheck()) {
      //validataionCheck() 결과가 true이면 서버전송
      console.log(formData);

      //서버전송 GET : 패킷(header) : url => axios.get()  ==> /:id
      //서버전송 POST : 패킷(body) => axios.post()
    }
  };

  //validataionCheck()
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
      <div className="member">
        <div className="sub-title">
          <h1>로그인</h1>
          <h2></h2>
        </div>
        <form className="member-form" onSubmit={handleSubmit}>
          <ul>
            <li>
              <input
                type="text"
                name="userId"
                ref={userIdRef}
                value={formData.userId}
                onChange={handleChange}
                placeholder="  아이디"
                style={{
                  fontSize: "15px",
                  paddingLeft: "20px", // 여백 조절
                }}
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
                style={{
                  fontSize: "15px",
                  paddingLeft: "20px", // 여백 조절
                }}
              />
            </li>
          </ul>
          <div className="member-btn">
            <ul className="find-info">
              <li>
                <Link to="/member/FindAccount">아이디 찾기 </Link>
              </li>
              <li>|</li>
              <li>
                <Link to="/member/FindAccount">비밀번호 찾기</Link>
              </li>
            </ul>
            <li>
              <button className="red-btn" type="submit">
                로그인
              </button>
              <button className="white-btn" type="button">
                <Link to="/member/signup">회원가입</Link>
              </button>
            </li>
            <li>
              <button className="naver-btn" type="button">
                <FontAwesomeIcon
                  icon={faN}
                  style={{ fontSize: "17px", fontWeight: "bold" }}
                />
                <Link to="https://bit.ly/3weQpic"> 네이버 아이디로 로그인</Link>
              </button>
              <button className="kakao-btn" type="button">
                <FontAwesomeIcon
                  icon={faComment}
                  style={{ fontSize: "15px" }}
                />
                <Link to="https://bit.ly/44x2wDK"> 카카오 아이디로 로그인</Link>
              </button>
              <button className="apple-btn" type="button">
                <FontAwesomeIcon icon={faApple} style={{ fontSize: "20px" }} />
                <Link to="https://apple.co/3UxpE0v"> 애플 아이디로 로그인</Link>
              </button>
            </li>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}
