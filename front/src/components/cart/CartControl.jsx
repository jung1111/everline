import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getUser } from "../../util/localStorage.js";

export default function CartControl({
  cartItems,
  setCartItems,
  decrementCartCount,
}) {
  const navigate = useNavigate();
  const userId = getUser().userId;
  console.log("idddd", getUser().userId);

  // 선택된 항목 삭제
  const removeSelectedItems = async () => {
    const selectedItems = cartItems.filter((item) => item.checked);
    try {
      const response = await axios.post("http://localhost:8000/carts/remove", {
        items: selectedItems.map((item) => ({ cid: item.cid, userId: userId })),
      });
      if (response.data.success) {
        const filteredCartList = cartItems.filter((item) => !item.checked);
        setCartItems(filteredCartList);
        decrementCartCount(selectedItems.length);
      } else {
        console.error("Error removing items from cart");
      }
    } catch (error) {
      console.error("Error removing items from cart:", error);
    }
  };

  // 쇼핑 계속하기
  const continueShopping = () => {
    navigate("/product");
  };

  // 선택된 항목 주문
  const orderSelectedItems = () => {
    const selectedItems = cartItems.filter((item) => item.checked);
    navigate("/order", { state: { selectedItems } });
  };

  // 모든 항목 주문
  const orderAllItems = () => {
    navigate("/order", { state: { selectedItems: cartItems } });
  };

  return (
    <>
      <div>
        <div className="cart-control">
          <div className="cart-control-buttons">
            <button onClick={removeSelectedItems} className="control-button">
              선택 상품 삭제
            </button>
            <button
              className="control-button btn-point-red"
              style={{ marginLeft: "5px" }}
            >
              선택 상품 찜
            </button>
          </div>
          <div>
            <button
              onClick={continueShopping}
              className="control-button btn-point-shop"
            >
              쇼핑 계속하기
            </button>
          </div>
        </div>

        <div className="cart-tip">
          <span>
            <FontAwesomeIcon icon={faCircleExclamation} /> 주문서 작성단계에서
            할인/마일리지 적용을 하실 수 있습니다.
          </span>
          <span>
            <FontAwesomeIcon icon={faCircleExclamation} />
            &nbsp;7만 원 이상 구매 시 무료배송
          </span>
        </div>

        <div className="cart-order-btn">
          <button
            onClick={orderSelectedItems}
            className="order-button btn-point-red"
          >
            선택 상품주문
          </button>
          <button
            onClick={orderAllItems}
            className="order-button btn-point-all"
          >
            전체 상품 주문
          </button>
        </div>
      </div>
    </>
  );
}
