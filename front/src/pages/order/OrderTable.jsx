import React from "react";
import { Link } from "react-router-dom";

export default function OrderTable({ selectProducts }) {
  // 총 가격 계산
  const totalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  // 총 배송비 계산
  const totalDeliveryCharge = () => {
    return totalPrice(selectProducts) < 70000 ? 3500 : 0;
  };

  return (
    <table className="order-table" border="1">
      <thead>
        <tr>
          <th>상품/옵션 정보</th>
          <th>수량</th>
          <th>상품금액</th>
          <th>할인/적립</th>
          <th>합계금액</th>
          <th>배송비</th>
        </tr>
      </thead>
      <tbody>
        {selectProducts.map((item, index) => (
          <tr key={item.id}>
            <td>
              <div style={{ display: "flex" }}>
                <Link to={`/detail/${item.id}`}>
                  <img
                    src={item.image}
                    alt="상품 이미지"
                    style={{
                      width: "70px",
                      height: "70px",
                      border: "1px solid red",
                    }}
                  />
                </Link>
                <Link to={`/detail/${item.id}`}>{item.name}</Link>
              </div>
            </td>

            <td>{item.qty}개</td>
            <td>{item.price.toLocaleString()}원</td>
            <td>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>적립</span>
                <span>상품 +{Math.round((item.price * item.qty * 0.01) / 10) * 10}원</span>
              </div>
            </td>
            <td>{(item.price * item.qty).toLocaleString()}원</td>
            {index === 0 && (
              <td rowSpan={selectProducts.length}>
                고정배송비 <br />
                {totalDeliveryCharge()}원<br />
                (택배-선결제)
              </td>
            )}
          </tr>
        ))}
        <tr>
          <td colSpan="7">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span>적립예정 마일리지: {Math.round((totalPrice(selectProducts) * 0.01) / 10) * 10}원</span>
              </div>
              <div>
                <span>
                  총 {selectProducts.length} 개의 상품금액 {totalPrice(selectProducts).toLocaleString()}원 + 배송비{" "}
                  {totalDeliveryCharge()}원 = 합계{" "}
                  {(totalPrice(selectProducts) + totalDeliveryCharge()).toLocaleString()}원
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
