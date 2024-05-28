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
        <button onClick={removeSelectedItems}>선택 상품 삭제</button>
        <button onClick={continueShopping}>쇼핑 계속하기</button>
        <button onClick={orderSelectedItems}>선택 상품주문</button>
        <button onClick={orderAllItems}>전체 상품 주문</button>
      </div>
    </>
  );
}
