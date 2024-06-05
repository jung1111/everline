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
  const [selectDomain, setSelectDomain] = useState(null);
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
    axios
      .get("/data/member.json")
      .then((response) => {
        const data = response.data[0];
        setOrderInfo({
          userName: data.userName,
          address: data.address,
          detailAddress: data.detailAddress,
          phone: data.phone,
          mobile: data.mobile,
          emailId: data.emailId,
          zipcode: data.zipcode,
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
      <table className="order-info-table">
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
            <td>{`[${orderInfo.zipcode}] ${orderInfo.address} ${orderInfo.detailAddress}`}</td>
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
                <div className="order-email-select-box">
                  <div
                    className="domain-select-header"
                    onClick={toggleDropdown}
                  >
                    {selectDomain || "직접입력"}
                  </div>
                  {isOpen && (
                    <div className="domain-select-dropdown">
                      {domains.map((domain) => (
                        <div
                          key={domain}
                          className="domain-select-option"
                          onClick={() => handleDomainClick(domain)}
                        >
                          {domain}
                        </div>
                      ))}
                    </div>
                  )}

                  <FontAwesomeIcon
                    className="order-select-arrow"
                    icon={faAngleDown}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
