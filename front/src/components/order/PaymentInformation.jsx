import React, { useState } from "react";

export default function PaymentInformation({
  selectProducts,
  totalDeliveryCharge,
  totalPrice,
}) {
  return (
    <div className="payment-info">
      <h3 className="order-title-all">결제정보</h3>

      <table className="order-table-type payment-table">
        <tbody>
          <tr>
            <td>상품 합계 금액</td>
            <td>
              <span style={{ fontWeight: "bolder" }}>
                {totalPrice(selectProducts).toLocaleString()}원
              </span>{" "}
            </td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>{totalDeliveryCharge().toLocaleString()}원</td>
          </tr>
          <tr>
            <td>할인 및 적립</td>
            <td style={{ fontWeight: "400" }}>
              예상 적립 마일리지 :&nbsp;&nbsp;
              <span style={{ fontWeight: "bold" }}>
                {" "}
                (+)
                {Math.round((totalPrice(selectProducts) * 0.01) / 10) * 10}원
              </span>
            </td>
          </tr>
          <tr>
            <td>쿠폰 사용</td>
            <td>
              {" "}
              <button
                className="btn-payment-coupon"
                style={{ fontWeight: 700 }}
              >
                쿠폰 조회 및 적용
              </button>
            </td>
          </tr>
          <tr>
            <td>마일리지 사용</td>
            <td>
              <div className="payment-table-mileage">
                <input type="text" className="payment-table-mileage-input" />
                <span>원</span>
                <input type="checkbox" className="custom-checkbox" />
                <span>전액 사용하기</span>
                <span className="payment-table-mileage-held">
                  (보유 마일리지 : 1,000 원)
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td>총 합계 금액</td>
            <td>
              <span style={{ fontWeight: "bolder" }}>
                {(
                  totalPrice(selectProducts) +
                  (selectProducts.length === 0 ? 0 : totalDeliveryCharge())
                ).toLocaleString()}
                원
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
