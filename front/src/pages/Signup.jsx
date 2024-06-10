import React, { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import DaumPostcode from "react-daum-postcode";
import { passCheck, validateCheck } from "../apis/validate.js";
import SubTitle from "../components/SubTitle.jsx";
import Location from "../components/Location.jsx";
import { useNavigate } from "react-router-dom";
import "../css/member.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../css/order.css";

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
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectDomain, setSelectDomain] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDropdown = () => {
    setIsOpen2(!isOpen2);
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

  const handleDomainClick = (option) => {
    setSelectDomain(option);
    setIsOpen2(false);
    setFormData((prevInfo) => {
      let emailId = prevInfo.emailId;
      const atIndex = emailId.indexOf("@");
      if (option === "직접입력") {
        if (atIndex !== -1) {
          emailId = emailId.slice(0, atIndex) + "@";
        }
      } else {
        if (atIndex !== -1) {
          emailId = emailId.slice(0, atIndex);
        }
        emailId = `${emailId}@${option}`;
      }
      return { ...prevInfo, emailId };
    });
  };

  const domains = [
    "직접입력",
    "naver.com",
    "hanmail.com",
    "daum.net",
    "nate.com",
    "hotmail.com",
    "gmail.com",
    "icloud.com",
  ];

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
      <Location depth1="회원가입" depth2="정보입력" />
      <SubTitle title="회원가입" />
      <div className="signup">
        <form className="member-form">
          <div className="member-back">
            <p className="member-subtitle">회원종류</p>
            <ul className="member-signup-type">
              <li onClick={() => handleSwitchMode("individual")}>
                <p>개인회원</p>
              </li>
              <li onClick={() => handleSwitchMode("business")}>
                <p>사업자회원</p>
              </li>
            </ul>
            <p className="member-subtitle">기본정보</p>
            <ul className="signup-input">
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
                <tbody>
                  <tr>
                    <td>
                      <div className="order-email">
                        <input
                          className="order-email-main"
                          type="text"
                          name="emailId"
                          value={formData.emailId}
                          ref={refs.emailIdRef}
                          onChange={handleChange}
                        />
                        <div
                          className="order-email-select-box"
                          onClick={toggleDropdown}
                        >
                          <div
                            className={`domain-select-header ${
                              isOpen2 ? "open-tg" : ""
                            }`}
                          >
                            {selectDomain}
                            <FontAwesomeIcon
                              className="order-select-arrow"
                              icon={faAngleDown}
                            />
                          </div>
                          <div
                            className={`domain-select-dropdown ${
                              isOpen2 ? "open" : ""
                            }`}
                          >
                            {domains.map((domain) => (
                              <div
                                key={domain}
                                style={{ fontWeight: 500 }}
                                className={`domain-select-option ${
                                  selectDomain === domain ? "d-selected" : ""
                                }`}
                                onClick={() => handleDomainClick(domain)}
                              >
                                {domain}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
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
                <span className="member-text">
                  ! 정보/이벤트 SMS 수신에 동의합니다.
                </span>
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
                <div className="phone-input">
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
                    className="input-field"
                  />
                </div>
              </li>
              <li className="member-address">
                <input
                  type="text"
                  name="zipcode"
                  ref={refs.zipcodeRef}
                  value={formData.zipcode}
                  placeholder="우편번호"
                  readOnly
                />
                <button type="button" onClick={handleToggle}>
                  주소검색
                </button>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  ref={refs.addressRef}
                  placeholder="주소"
                  style={{ marginBottom: "10px" }}
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
              <tbody>
                <tr>
                  <td className="member-birthday">
                    <select
                      className="birthday-select"
                      value={year}
                      onChange={handleYearChange}
                      ref={refs.birthdayYearRef}
                      style={{ width: "140px" }}
                    >
                      <option value="">년도</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    <select
                      className="birthday-select"
                      value={month}
                      onChange={handleMonthChange}
                      ref={refs.birthdayMonthRef}
                      style={{ width: "100px" }}
                    >
                      <option value="">월</option>
                      {months.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      className="birthday-select"
                      value={day}
                      onChange={handleDayChange}
                      ref={refs.birthdayDayRef}
                      style={{ width: "100px" }}
                    >
                      <option value="">일</option>
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
              <li>
                <span className="member-text">
                  ! 생일 쿠폰 등 혜택을 위해 생일을 입력해 주세요.
                </span>
              </li>
              {mode === "business" && (
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
            <p className="member-subtitle">약관동의</p>
            <ul className="member-agreement">
              <li className="member-agreement-item">
                <input
                  type="checkbox"
                  name="agreeAll"
                  checked={formData.agreeAll}
                  onChange={handleAgreeAll}
                />
                <p>에버라인의 모든 약관을 확인하고 전체 동의합니다.</p>
              </li>
              <li className="member-agreement-item">
                <input
                  type="checkbox"
                  name="service"
                  checked={formData.service}
                  onChange={handleAgree}
                />
                <p>[필수] 이용약관</p>
                <a
                  href="https://www.everlineshop.com/service/agreement.php?code=001001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  전체
                </a>
              </li>
              <li className="member-agreement-item">
                <input
                  type="checkbox"
                  name="personal"
                  checked={formData.personal}
                  onChange={handleAgree}
                />
                <p>[필수] 개인정보 수집 및 이용</p>
                <a
                  href="https://www.everlineshop.com/service/private.php"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  전체
                </a>
              </li>
            </ul>
            <ul className="member-buttons">
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
          </div>
        </form>
      </div>
    </div>
  );
}
