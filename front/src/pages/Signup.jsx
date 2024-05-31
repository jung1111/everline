import React, { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import DaumPostcode from "react-daum-postcode";
import {
  passCheck,
  validateCheck,
  changeEmailDomain,
} from "../apis/validate.js";
import SubTitle from "../components/SubTitle.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    userId: "",
    userPass: "",
    userPassCheck: "",
    userName: "",
    mobileNumber1: "010",
    mobileNumber2: "",
    phoneNumber1: "",
    phoneNumber2: "",
    emailId: "",
    emailDomain: "",
    snsSent: false,
    zipcode: "",
    address: "",
    detailAddress: "",
    birthdayYear: "",
    birthdayMonth: "",
    birthdayDay: "",
    service: false,
    personal: false,
    agreeAll: false,
  });

  const refs = {
    userIdRef: useRef(null),
    userPassRef: useRef(null),
    userPassCheckRef: useRef(null),
    userNameRef: useRef(null),
    mobileNumber1Ref: useRef(null),
    mobileNumber2Ref: useRef(null),
    phoneNumber1Ref: useRef(null),
    phoneNumber2Ref: useRef(null),
    emailIdRef: useRef(null),
    emailDomainRef: useRef(null),
    snsSentRef: useRef(null),
    zipcodeRef: useRef(null),
    addressRef: useRef(null),
    detailAddressRef: useRef(null),
    birthdayYearRef: useRef(null),
    birthdayMonthRef: useRef(null),
    birthdayDayRef: useRef(null),
  };

  const [mode, setMode] = useState("individual");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * 아이디 중복체크
   */
  const handleIdCheck = () => {
    if (refs.userIdRef.current.value == "") {
      alert("아이디를 입력해주세요");
      refs.userIdRef.current.focus();
    } else {
      const url = "http://127.0.0.1:8000/member/idCheck";
      const userId = refs.userIdRef.current.value;
      axios({
        method: "post",
        url: url,
        data: { userId: userId },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.cnt === 1) {
            alert("이미 사용중인 아이디 입니다. 다시 입력해주세요");
            refs.userIdRef.current.focus();
          } else {
            alert("사용 가능한 아이디입니다.");
            refs.emailIdRef.current.focus();
          }
        })
        .catch(
          (error) => console.error("Error:", error) // 디버그 로그
        );
    }
  };

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleAddress = (e) => {
    setFormData({ ...formData, zipcode: e.zipcode, address: e.address });
  };

  const completeHandler = (data) => {
    const { address, zonecode } = data;
    handleAddress({ zipcode: zonecode, address: address });
  };

  const closeHandler = (state) => {
    if (state === "FORCE_CLOSE") {
      setIsOpen(false);
    } else if (state === "COMPLETE_CLOSE") {
      setIsOpen(false);
      refs.detailAddressRef.current.value = "";
      refs.detailAddressRef.current.focus();
    }
  };

  const themeObj = {
    bgColor: "#FFFFFF",
    pageBgColor: "#FFFFFF",
    postcodeTextColor: "#C05850",
    emphTextColor: "#222222",
  };

  const postCodeStyle = {
    width: "360px",
    height: "480px",
  };

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setFormData({ ...formData, birthdayYear: e.target.value });
  };
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setFormData({ ...formData, birthdayMonth: e.target.value });
  };
  const handleDayChange = (e) => {
    setDay(e.target.value);
    setFormData({ ...formData, birthdayDay: e.target.value });
  };

  const handleAgreeAll = (e) => {
    const isChecked = e.target.checked;
    setFormData({
      ...formData,
      agreeAll: isChecked,
      service: isChecked,
      personal: isChecked,
    });
  };

  const handleAgree = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: checked };
      const allAgreed = newFormData.service && newFormData.personal;
      return { ...newFormData, agreeAll: allAgreed };
    });
  };

  const handleSubmit = async () => {
    if (validateCheck(refs, formData)) {
      if (passCheck(refs)) {
        const url = "http://127.0.0.1:8000/member/signup";
        axios({
          method: "post",
          url: url,
          data: formData,
        })
          .then((res) => {
            //console.log("result ->", res.data);
            //console.log("formdata ->", formData);
            if (res.data.cnt === 1) {
              alert("회원가입성공");
              window.location.href = "/member";
            } else {
              alert("회원가입 실패, 정보를 다시 입력하세요");
            }
          })
          .catch();
      }
    }
  };
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/member");
  };

  return (
    <div className="content">
      <SubTitle title="회원가입" />
      <div className="member">
        <form className="signup-form">
          <h3>회원종류</h3>
          <ul className="signup-type">
            <li onClick={() => handleSwitchMode("individual")}>
              <p>개인회원</p>
            </li>
            <li onClick={() => handleSwitchMode("bussiness")}>
              <p>사업자회원</p>
            </li>
          </ul>

          <h3>기본정보</h3>
          <ul className="basic-info">
            <li>
              <input
                type="text"
                name="userId"
                placeholder="아이디"
                style={{ fontSize: "15px", paddingLeft: "20px" }}
                value={formData.userId}
                onChange={handleChange}
                ref={refs.userIdRef}
              />
              <button type="button" onClick={handleIdCheck}>
                중복확인
              </button>
            </li>
            <li>
              <p>
                이메일<span>*</span>
              </p>
              <input
                type="text"
                name="emailId"
                value={formData.emailId}
                ref={refs.emailIdRef}
                onChange={handleChange}
              />
              @
              <input
                type="text"
                name="emailDomain"
                value={formData.emailDomain}
                onChange={handleChange}
                ref={refs.emailDomainRef}
              />
              <select
                name="emailDomain"
                onChange={(e) => changeEmailDomain(e, refs, handleChange)}
              >
                <option value="self">직접입력</option>
                <option value="naver.com">네이버</option>
                <option value="gmail.com">구글</option>
                <option value="hotmail.com">MS</option>
              </select>
            </li>
            <li>
              <input
                type="checkbox"
                ref={refs.snsSentRef}
                name="snsSent"
                id="snsSent"
                onChange={(e) =>
                  setFormData({ ...formData, snsSent: e.target.checked })
                }
                checked={formData.snsSent}
              />
              <span>정보/이벤트 SMS 수신에 동의합니다.</span>
            </li>
            <li>
              <input
                type="password"
                name="userPass"
                placeholder="비밀번호"
                style={{ fontSize: "15px", paddingLeft: "20px" }}
                value={formData.userPass}
                onChange={handleChange}
                ref={refs.userPassRef}
              />
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faExclamation} />{" "}
                영문대문자/영문소문자/숫자/특수문자 중 2종류 이상을 조합하여
                10자리 이상
              </span>
            </li>
            <li>
              <input
                type="password"
                name="userPassCheck"
                placeholder="비밀번호 확인"
                style={{ fontSize: "15px", paddingLeft: "20px" }}
                value={formData.userPassCheck}
                onChange={handleChange}
                ref={refs.userPassCheckRef}
              />
            </li>
            <li>
              <input
                type="text"
                name="userName"
                placeholder="이름"
                style={{ fontSize: "15px", paddingLeft: "20px" }}
                value={formData.userName}
                ref={refs.userNameRef}
                onChange={handleChange}
              />
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faExclamation} /> 배송 문제를 방지하기
                위해 본인의 실명을 작성해주세요.
              </span>
            </li>
            <li>
              {/* 필수전화번호 */}
              <select name="mobileNumber1">
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
              </select>
              <input
                type="text"
                name="mobileNumber2"
                value={formData.mobileNumber2}
                onChange={handleChange}
                ref={refs.mobileNumber2Ref}
                placeholder="휴대폰 번호"
              />
            </li>
            <li>
              {/* 일반전화번호 */}
              <select name="phoneNumber1">
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
              </select>
              <input
                type="text"
                name="phoneNumber2"
                value={formData.phoneNumber2}
                onChange={handleChange}
                ref={refs.phoneNumber2Ref}
                placeholder="전화번호"
              />
            </li>
            <li>
              <p>주소</p>
              <div>
                <input
                  type="text"
                  name="zipcode"
                  ref={refs.zipcodeRef}
                  value={formData.zipcode}
                  readOnly
                />
                <button type="button" onClick={handleToggle}>
                  주소검색
                </button>
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                ref={refs.addressRef}
              />
              <input
                type="text"
                name="detailAddress"
                value={formData.detailAddress}
                onChange={handleChange}
                ref={refs.detailAddressRef}
                placeholder="상세주소를 입력해주세요"
              />
              {isOpen && (
                <div>
                  <DaumPostcode
                    className="postmodal"
                    theme={themeObj}
                    style={postCodeStyle}
                    onComplete={completeHandler}
                    onClose={closeHandler}
                  />
                </div>
              )}
            </li>
            <li>
              <select
                value={year}
                onChange={handleYearChange}
                ref={refs.birthdayYearRef}
              >
                <option value="">년도</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                value={month}
                onChange={handleMonthChange}
                ref={refs.birthdayMonthRef}
              >
                <option value="">월</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={day}
                onChange={handleDayChange}
                ref={refs.birthdayDayRef}
              >
                <option value="">일</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faExclamation} /> 생일 쿠폰 등 혜택을
                위해 생일을 입력해 주세요.
              </span>
            </li>
            {mode === "bussiness" && (
              <>
                <li>
                  <input type="text" placeholder="상호" />
                </li>
                <li>
                  <input type="text" placeholder="사업자번호" />
                </li>
              </>
            )}
          </ul>
          <ul className="agreement">
            <h3>약관동의</h3>
            <li>
              <input
                type="checkbox"
                name="agreeAll"
                checked={formData.agreeAll}
                onChange={handleAgreeAll}
              />
              <p>에버라인</p>
              <p>의 모든 약관을 확인하고 전체 동의합니다.</p>
            </li>
            <li>
              <input
                type="checkbox"
                name="service"
                checked={formData.service}
                onChange={handleAgree}
              />
              <p>[필수]</p> <p>이용약관</p>
              <a
                href="https://www.everlineshop.com/service/agreement.php?code=001001"
                target="_blank"
              >
                전체
              </a>
            </li>
            <li>
              <input
                type="checkbox"
                name="personal"
                checked={formData.personal}
                onChange={handleAgree}
              />
              <p>[필수]</p> <p>개인정보 수집 및 이용</p>
              <a
                href="https://www.everlineshop.com/service/private.php"
                target="_blank"
              >
                전체
              </a>
            </li>
          </ul>
          <ul className="buttons">
            <li>
              <button
                className="white-btn"
                type="button"
                onClick={handleSubmit}
              >
                회원가입
              </button>
            </li>
            <li>
              <button type="button" onClick={handleCancel}>
                취소
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
