import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SubTitle from "./SubTitle";

export default function OrderResultDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();

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

  const handleDeleteOrder = () => {
    axios
      .delete(`http://localhost:8000/order/deleteOrder/${orderId}`)
      .then((response) => {
        if (response.status === 200) {
          alert("주문이 성공적으로 취소되었습니다.");
          navigate("/mypage/order-result");
        }
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        alert("주문 취소 중 문제가 발생했습니다.");
      });
  };

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
        <button onClick={handleDeleteOrder}>주문 취소</button>
      </div>
    </div>
  );
}
