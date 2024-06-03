import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartControl({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  // 선택된 항목 삭제
  const removeSelectedItems = () => {
    const filteredCartList = cartItems.filter((item) => !item.checked);
    setCartItems(filteredCartList);
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
            <button className="control-button">선택 상품 찜</button>
          </div>
          <div>
            <button onClick={continueShopping} className="control-button">
              쇼핑 계속하기
            </button>
          </div>
        </div>

        <div className="cart-tip">
          <span>
            주문서 작성단계에서 할인/마일리지 적용을 하실 수 있습니다.
          </span>
          <span>7만 원 이상 구매 시 무료배송</span>
        </div>

        <div className="cart-order-btn">
          <button onClick={orderSelectedItems} className="order-button">
            선택 상품주문
          </button>
          <button onClick={orderAllItems} className="order-button">
            전체 상품 주문
          </button>
        </div>
      </div>
    </>
  );
}
