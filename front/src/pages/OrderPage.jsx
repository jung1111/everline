import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import OrderTable from "../components/order/OrderTable.jsx";
import OrderInfo from "../components/order/OrderInfo.jsx";
import DeliveryInfo from "../components/order/DeliveryInfo.jsx";
import "../css/order.css";
import Location from "../components/Location.jsx";
import SubTitle from "../components/SubTitle.jsx";
import PaymentInformation from "../components/order/PaymentInformation.jsx";

export default function OrderPage({ decrementCartCount, userId }) {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  const [orderInfo, setOrderInfo] = useState({
    userName: "",
    address: "",
    detailAddress: "",
    phone: "",
    mobile: "",
    emailId: "",
    zipcode: "",
  });
  const [mileage, setMileage] = useState({
    mil: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/order/info?USER_ID=${userId}`)
      .then((response) => {
        const data = response.data;
        setOrderInfo({
          userName: data.USER_NAME,
          address: data.ADDRESS,
          phone: data.PHONE,
          mobile: data.MOBILE_NUMBER,
          emailId: data.EMAIL_ID,
          zipcode: data.ZIPCODE,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the order info!", error);
      });
  }, []);

  // 총 가격 계산
  const totalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  // 총 배송비 계산
  const totalDeliveryCharge = () => {
    return totalPrice(selectedItems) < 70000 ? 3500 : 0;
  };

  // 마일리지
  useEffect(() => {
    axios
      .get(`http://localhost:8000/order/mileage?USER_ID=${userId}`)
      .then((response) => {
        const data = response.data;
        setMileage(data);
      })
      .catch((error) => console.log(error));
  }, []);

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
        <OrderInfo orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
        <DeliveryInfo orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
        <PaymentInformation
          selectedItems={selectedItems}
          totalPrice={totalPrice}
          totalDeliveryCharge={totalDeliveryCharge}
          mileage={mileage}
          decrementCartCount={decrementCartCount}
          userId={userId}
        />
      </div>
    </div>
  );
}
