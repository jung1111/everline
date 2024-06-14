import React, { useEffect, useState } from "react";
import axios from "axios";
import SubTitle from "./SubTitle";
import "../css/resultorder.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../util/localStorage.js";

export default function OrderResult() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userId = getUser().userId;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/order/getOrders?USER_ID=${userId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [userId]);

  const handleOrderClick = (orderId) => {
    navigate(`/orderDetails/${orderId}`);
  };

  return (
    <div className="content">
      <SubTitle title="주문내역조회" />
      <div className="order-result-all">
        {orders.length === 0 ? (
          <p>주문 내역이 없습니다</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>주문번호</th>
                <th>주문일자</th>
                <th>총 금액</th>
                <th>사용한 마일리지</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  onClick={() => handleOrderClick(order.order_id)}
                >
                  <td>{order.order_id}</td>
                  <td>{new Date(order.odate).toLocaleDateString()}</td>
                  <td>{order.total_price.toLocaleString()}원</td>
                  <td>{order.used_mileage.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
