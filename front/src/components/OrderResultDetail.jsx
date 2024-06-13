import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SubTitle from "./SubTitle";

export default function OrderResultDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/order/orderDetails?orderId=${orderId}`)
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, [orderId]);

  return (
    <div className="content">
      <SubTitle title="주문 상세내역" />
      <div className="order-details">
        {orderDetails.length === 0 ? (
          <p>주문 상세내역이 없습니다</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>이미지</th>
                <th>상품명</th>
                <th>수량</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((detail, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`http://localhost:8000/${detail.image}`}
                      alt={detail.ptitle}
                      width="50"
                    />
                  </td>
                  <td>{detail.ptitle}</td>
                  <td>{detail.qty}</td>
                  <td>{detail.price.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
