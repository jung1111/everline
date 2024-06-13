import React from "react";
import { Link, useLocation } from "react-router-dom";
import OrderTable from "../components/order/OrderTable.jsx";
import OrderInfo from "../components/order/OrderInfo.jsx";
import DeliveryInfo from "../components/order/DeliveryInfo.jsx";
import "../css/order.css";
import Location from "../components/Location.jsx";
import SubTitle from "../components/SubTitle.jsx";
import PaymentInformation from "../components/order/PaymentInformation.jsx";
import OrderFinal from "../components/order/OrderFinal.jsx";
export default function OrderPage() {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  console.log(selectedItems);
  // 총 가격 계산
  const totalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  // 총 배송비 계산
  const totalDeliveryCharge = () => {
    return totalPrice(selectedItems) < 70000 ? 3500 : 0;
  };

  return (
    <div className="content">
      <Location depth1="주문서 작성 / 결제" />
      <SubTitle title="주문서 작성 / 결제" />
      <div className="order-area-box">
        <OrderTable
          selectProducts={selectedItems}
          totalPrice={totalPrice}
          totalDeliveryCharge={totalDeliveryCharge}
        />
        <Link to={"/carts"}>
          <button className="control-button btn-point-shop">
            장바구니 가기
          </button>
        </Link>
        <OrderInfo />
        <DeliveryInfo />
        <PaymentInformation
          selectProducts={selectedItems}
          totalPrice={totalPrice}
          totalDeliveryCharge={totalDeliveryCharge}
        />
        <OrderFinal selectProducts={selectedItems} totalPrice={totalPrice} />
      </div>
    </div>
  );
}
