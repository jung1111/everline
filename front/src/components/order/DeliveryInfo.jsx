import React, { useState } from "react";
import DeliveryStatePopup from "./DeliveryStatepopup";

export default function DeliveryInfo() {
  const [selectedOption, setSelectedOption] = useState("basic");
  const [isOpen, setIsOpen] = useState(false);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const popupOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="delivery-info">
      <h3 className="order-title-all">배송정보</h3>
      <table
        className="
      delivery-info-table 
      order-table-type"
      >
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
                <button
                  className="control-button btn-point-shop"
                  onClick={popupOpen}
                >
                  배송지 관리
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>받으실분 *</td>
            <td>
              <input type="text" name="recipient" />
            </td>
          </tr>
          <tr>
            <td>받으실 곳 *</td>
            <td>
              <div className="delivery-search-box">
                <div className="delivery-zipcode">
                  <input type="text" name="zipcode" />
                  <button className="btn-search-zipcode">우편번호검색</button>
                </div>
                <div className="delivery-address">
                  <input
                    type="text"
                    name="address"
                    className="delivery-address-main"
                  />
                  <input
                    type="text"
                    name="detailAddress"
                    className="delivery-address-detail"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input type="text" name="phone" /> &nbsp; &nbsp;&nbsp;
              <span>* 한국 연락처로 꼭 기재해주세요.</span>
            </td>
          </tr>
          <tr>
            <td>휴대폰 번호 *</td>
            <td>
              <input type="text" name="mobile" />
            </td>
          </tr>
          <tr>
            <td>남기실 말씀</td>
            <td>
              <input type="text" name="note" className="delivery-note" />
            </td>
          </tr>
        </tbody>
      </table>
      {isOpen ? <DeliveryStatePopup setIsOpen={setIsOpen} /> : null}
    </div>
  );
}
