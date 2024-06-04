import React from "react";
import { Link, useLocation } from "react-router-dom";
import OrderTable from "../components/order/OrderTable.jsx";
import OrderInfo from "../components/order/OrderInfo.jsx";
import DeliveryInfo from "../components/DeliveryInfo.jsx";
import "../css/order.css";
import Location from "../components/Location.jsx";
import SubTitle from "../components/SubTitle.jsx";
export default function OrderPage() {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };

  return (
    <div className="content">
      <Location depth1="주문서 작성 / 결제" />
      <SubTitle title="주문서 작성 / 결제" />
      <div className="order-area-box">
        <OrderTable selectProducts={selectedItems} />
        <Link to={"/carts"}>
          <button className="control-button btn-point-shop">
            장바구니 가기
          </button>
        </Link>
        <OrderInfo />
        <DeliveryInfo />
        <button>결제하기</button>
      </div>
    </div>
  );
}
