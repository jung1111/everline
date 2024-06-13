import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function OrderInfo() {
  const [orderInfo, setOrderInfo] = useState({
    userName: "",
    address: "",
    detailAddress: "",
    phone: "",
    mobile: "",
    emailId: "",
    zipcode: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectDomain, setSelectDomain] = useState("직접입력");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDomainClick = (option) => {
    setSelectDomain(option);
    setIsOpen(false);
    setOrderInfo((prevInfo) => {
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

  useEffect(() => {
    const userId = "test";
    axios
      .get(`http://127.0.0.1:8000/order/info?USER_ID=${userId}`)
      .then((response) => {
        const data = response.data;
        setOrderInfo({
          userName: data.USER_NAME,
          address: data.ADDRESS,
          phone: data.PHONE,
          mobile: data.MOBILE_NUMBER,
          emailId: data.EMAIL_ID,
          zipcode: data.ZIPCODE,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the order info!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({
      ...orderInfo,
      [name]: value,
    });
  };

  return (
    <div className="order-info">
      <h3 className="order-title-all">주문자 정보</h3>
      <table className="order-table-type order-info-table">
        <tbody>
          <tr>
            <td>주문하시는 분 *</td>
            <td>
              <input
                type="text"
                name="userName"
                value={orderInfo.userName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>주소 </td>
            <td>{`[${orderInfo.zipcode}] ${orderInfo.address} `}</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input
                type="text"
                name="phone"
                value={orderInfo.phone}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>휴대폰 번호 *</td>
            <td>
              <input
                type="text"
                name="mobile"
                value={orderInfo.mobile}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>이메일 *</td>
            <td>
              <div className="order-email">
                <input
                  className="order-email-main"
                  type="text"
                  name="emailId"
                  value={orderInfo.emailId}
                  onChange={handleChange}
                />
                <div
                  className="order-email-select-box"
                  onClick={toggleDropdown}
                >
                  <div
                    className={`domain-select-header ${
                      isOpen ? "open-tg" : ""
                    }`}
                  >
                    {selectDomain}
                    <FontAwesomeIcon
                      className="order-select-arrow"
                      icon={faAngleDown}
                    />
                  </div>
                  <div
                    className={`domain-select-dropdown ${isOpen ? "open" : ""}`}
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
      </table>
    </div>
  );
}
