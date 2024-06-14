import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../util/localStorage.js";

export default function OrderFinal({
  effectiveTotalPrice,
  usedMileage,
  stackMileage,
  selectedItems,
  decrementCartCount,
}) {
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();
  const userId = getUser().userId;

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
        // 주문 정보 전송
        const placeOrderResponse = await axios.post(
          "http://localhost:8000/order/placeOrder",
          {
            userId: userId,
            items: selectedItems,
            total_price: effectiveTotalPrice,
            used_mileage: usedMileage,
          }
        );

        if (placeOrderResponse.status === 200) {
          // 장바구니에서 아이템 삭제
          await axios.post("http://localhost:8000/carts/deleteItems", {
            userId: userId,
            items: selectedItems,
          });

          decrementCartCount(selectedItems.length);
          alert("주문이 성공적으로 완료되었습니다.");
          navigate("/mypage/order-result"); // 주문 완료 후 주문 내역 페이지로 이동
        } else {
          alert("주문 처리 중 문제가 발생했습니다.");
        }
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
