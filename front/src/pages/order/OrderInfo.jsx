import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrderInfo() {
  const [orderInfo, setOrderInfo] = useState({
    userName: "",
    address: "",
    detailAddress: "",
    phone: "",
    mobile: "",
    emailId: "",
    emailDomain: "naver.com",
    zipcode: "",
  });

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
          emailDomain: data.emailDomain,
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

  const handleDomainChange = (e) => {
    setOrderInfo({
      ...orderInfo,
      emailDomain: e.target.value,
    });
  };

  return (
    <div className="order-info">
      <h2>주문자 정보</h2>
      <table>
        <tbody>
          <tr>
            <td>주문하시는 분 *</td>
            <td>
              <input type="text" name="userName" value={orderInfo.userName} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>주소 </td>
            <td>{`[${orderInfo.zipcode}] ${orderInfo.address} ${orderInfo.detailAddress}`}</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input type="text" name="phone" value={orderInfo.phone} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>휴대폰 번호 *</td>
            <td>
              <input type="text" name="mobile" value={orderInfo.mobile} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>이메일 *</td>
            <td className="member_email">
              <input type="text" name="emailId" value={orderInfo.emailId} onChange={handleChange} />@
              <select name="emailDomain" value={orderInfo.emailDomain} onChange={handleDomainChange}>
                <option value="self">직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="daum.net">daum.net</option>
                <option value="nate.com">nate.com</option>
                <option value="hotmail.com">hotmail.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="icloud.com">icloud.com</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
