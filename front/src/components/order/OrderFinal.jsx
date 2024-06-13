import React, { useState } from "react";
import axios from "axios";

export default function OrderFinal({
  effectiveTotalPrice,
  usedMileage,
  stackMileage,
}) {
  const userId = "test";
  const [isAgreed, setIsAgreed] = useState(false);

  const handleOrder = async () => {
    if (!isAgreed) {
      alert("구매진행에 동의해 주세요.");
      return;
    }
    try {
      const useMileageResponse = await axios.post(
        "http://localhost:8000/order/usemileage",
        {
          USER_ID: userId,
          usedMil: usedMileage,
        }
      );

      if (useMileageResponse.status !== 200) {
        alert("마일리지 사용 처리 중 문제가 발생했습니다.");
        return;
      }

      const stackMileageResponse = await axios.post(
        "http://localhost:8000/order/stackmileage",
        {
          USER_ID: userId,
          stackMil: stackMileage,
        }
      );

      if (stackMileageResponse.status === 200) {
        alert("주문이 성공적으로 완료되었습니다.");
      } else {
        alert("마일리지 적립 처리 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error during the order process:", error);
      alert("주문 처리 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="order-final">
      <div className="order-final-info">
        <span>결제금액</span>{" "}
        <span>
          {" "}
          {effectiveTotalPrice > 0 ? effectiveTotalPrice.toLocaleString() : 0}원
        </span>
      </div>

      <div className="final-agree-box">
        <input
          id="final-agree"
          type="checkbox"
          className="custom-checkbox"
          checked={isAgreed}
          onChange={() => setIsAgreed(!isAgreed)}
        />
        <label htmlFor="final-agree">
          <strong style={{ fontWeight: "bolder" }} className="final-strong">
            [필수]{" "}
          </strong>
          구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
        </label>
      </div>
      <div>
        <button
          style={{ fontWeight: "bolder" }}
          className="btn-order-final"
          onClick={handleOrder}
        >
          주문
        </button>
      </div>
    </div>
  );
}
