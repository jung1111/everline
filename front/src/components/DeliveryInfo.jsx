import React, { useState } from "react";

export default function DeliveryInfo() {
  return (
    <div className="delivery-info">
      <h2>배송정보</h2>
      <table>
        <tbody>
          <tr>
            <td>배송지 확인</td>
            <td>
              <label>
                <input type="radio" name="deliveryOption" value="basic" />
                기본 배송지
              </label>
              <label>
                <input type="radio" name="deliveryOption" value="recent" />
                최근 배송지
              </label>
              <label>
                <input type="radio" name="deliveryOption" value="new" />
                직접 입력
              </label>
              <label>
                <input type="radio" name="deliveryOption" value="sameAsOrder" />
                주문자정보와 동일
              </label>
              <button>배송지 관리</button>
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
              <button>우편번호 검색</button>
              <input type="text" name="zipCode" placeholder="우편번호" />

              <input type="text" name="address" placeholder="주소" />
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input type="text" name="phone" />
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
              <input type="text" name="note" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
