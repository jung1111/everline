import React, { useState, useEffect } from "react";
import DeliveryStatePopup from "../../components/order/DeliveryStatepopup.jsx";

export default function DeliveryInfo({ orderInfo }) {
  const [selectedOption, setSelectedOption] = useState("basic");
  const [deliveryInfo, setDeliveryInfo] = useState({
    recipient: "",
    zipcode: "",
    address: "",
    detailAddress: "",
    phone: "",
    mobile: "",
    note: "",
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectedOption === "sameAsOrder" || selectedOption === "basic") {
      setDeliveryInfo({
        recipient: orderInfo.userName,
        zipcode: orderInfo.zipcode,
        address: orderInfo.address,
        phone: orderInfo.phone,
        mobile: orderInfo.mobile,
        note: "",
      });
    }
  }, [selectedOption, orderInfo]);

  useEffect(() => {
    if (selectedOption === "new") {
      setDeliveryInfo({
        recipient: "",
        zipcode: "",
        address: "",
        phone: "",
        mobile: "",
        note: "",
      });
    }
  }, [selectedOption, orderInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({
      ...deliveryInfo,
      [name]: value,
    });
  };

  return (
    <div className="delivery-info">
      <h3 className="order-title-all">배송정보</h3>
      <table className="delivery-info-table order-table-type">
        <tbody>
          <tr>
            <td>배송지 확인</td>
            <td style={{ padding: ".6rem 1rem" }}>
              <div className="delivery-option">
                <label>
                  <input
                    type="radio"
                    className="custom-radio"
                    name="deliveryOption"
                    value="basic"
                    checked={selectedOption === "basic"}
                    onChange={handleOptionChange}
                  />
                  기본 배송지
                </label>
                <label>
                  <input
                    type="radio"
                    className="custom-radio"
                    name="deliveryOption"
                    value="recent"
                    checked={selectedOption === "recent"}
                    onChange={handleOptionChange}
                  />
                  최근 배송지
                </label>
                <label>
                  <input
                    type="radio"
                    className="custom-radio"
                    name="deliveryOption"
                    value="new"
                    checked={selectedOption === "new"}
                    onChange={handleOptionChange}
                  />
                  직접 입력
                </label>
                <label>
                  <input
                    type="radio"
                    className="custom-radio"
                    name="deliveryOption"
                    value="sameAsOrder"
                    checked={selectedOption === "sameAsOrder"}
                    onChange={handleOptionChange}
                  />
                  주문자정보와 동일
                </label>
                <button className="control-button btn-point-shop">
                  배송지 관리
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>받으실분 *</td>
            <td>
              <input
                type="text"
                name="recipient"
                value={deliveryInfo.recipient}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>받으실 곳 *</td>
            <td>
              <div className="delivery-search-box">
                <div className="delivery-zipcode">
                  <input
                    type="text"
                    name="zipcode"
                    value={deliveryInfo.zipcode}
                    onChange={handleChange}
                  />
                  <button className="btn-search-zipcode">우편번호검색</button>
                </div>
                <div className="delivery-address">
                  <input
                    type="text"
                    name="address"
                    className="delivery-address-main"
                    value={deliveryInfo.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input
                type="text"
                name="phone"
                value={deliveryInfo.phone}
                onChange={handleChange}
              />
              &nbsp; &nbsp;&nbsp;
              <span>* 한국 연락처로 꼭 기재해주세요.</span>
            </td>
          </tr>
          <tr>
            <td>휴대폰 번호 *</td>
            <td>
              <input
                type="text"
                name="mobile"
                value={deliveryInfo.mobile}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>남기실 말씀</td>
            <td>
              <input
                type="text"
                name="note"
                className="delivery-note"
                value={deliveryInfo.note}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
