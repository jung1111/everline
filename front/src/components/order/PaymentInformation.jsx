import React, { useState } from "react";
import OrderFinal from "./OrderFinal.jsx";

export default function PaymentInformation({
  selectedItems,
  totalDeliveryCharge,
  totalPrice,
  mileage,
  decrementCartCount,
  userId,
}) {
  const [usedMileage, setUsedMileage] = useState(0);
  const [useFullMileage, setUseFullMileage] = useState(false);

  const stackMileage = Math.round((totalPrice(selectedItems) * 0.01) / 10) * 10; // 예상 적립 마일리지

  const handleMileageChange = (e) => {
    const value = Number(e.target.value);
    if (value > mileage.mil) {
      setUsedMileage(mileage.mil);
      setUseFullMileage(true);
    } else {
      setUsedMileage(value);
      setUseFullMileage(value === mileage.mil);
    }
  };

  const handleFullMileageUse = () => {
    setUsedMileage(useFullMileage ? 0 : mileage.mil);
    setUseFullMileage(!useFullMileage);
  };

  const effectiveTotalPrice =
    totalPrice(selectedItems) + totalDeliveryCharge() - usedMileage;

  const remainingMileage = mileage.mil - usedMileage;

  return (
    <>
      <div className="payment-info">
        <h3 className="order-title-all">결제정보</h3>

        <table className="order-table-type payment-table">
          <tbody>
            <tr>
              <td>상품 합계 금액</td>
              <td>
                {" "}
                <span style={{ fontWeight: "bolder" }}>
                  {totalPrice(selectedItems).toLocaleString()}원
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
                  {stackMileage}원
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
                  <input
                    type="text"
                    className="payment-table-mileage-input"
                    value={usedMileage}
                    onChange={handleMileageChange}
                    max={mileage.mil}
                  />
                  <span>원</span>
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={useFullMileage}
                    onChange={handleFullMileageUse}
                  />
                  <span>전액 사용하기</span>
                  <span className="payment-table-mileage-held">
                    (보유 마일리지 : {remainingMileage.toLocaleString()}원)
                  </span>
                </div>
              </td>
            </tr>

            <tr>
              <td>총 합계 금액</td>
              <td>
                <span style={{ fontWeight: "bolder" }}>
                  {effectiveTotalPrice > 0
                    ? effectiveTotalPrice.toLocaleString()
                    : 0}
                  원
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <OrderFinal
        effectiveTotalPrice={effectiveTotalPrice}
        usedMileage={usedMileage}
        stackMileage={stackMileage}
        selectedItems={selectedItems}
        decrementCartCount={decrementCartCount}
        userId={userId}
      />
    </>
  );
}
