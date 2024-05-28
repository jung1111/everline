import React from "react";
import { Link, useLocation } from "react-router-dom";
import OrderTable from "./OrderTable.jsx";
import OrderInfo from "./OrderInfo.jsx";
import DeliveryInfo from "../../components/DeliveryInfo.jsx";

export default function OrderPage() {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };

  return (
    <div className="content" id="content">
      <div className="sub-title">
        <h1>주문 상세 / 결제</h1>
      </div>
      <div className="order-details">
        <OrderTable selectProducts={selectedItems} />
        <Link to={"/carts"}>
          <button>장바구니 가기</button>
        </Link>
        <OrderInfo />
        <DeliveryInfo />
        <button>결제하기</button>
      </div>
    </div>
  );
}
