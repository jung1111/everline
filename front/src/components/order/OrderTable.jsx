import React from "react";
import { Link } from "react-router-dom";

export default function OrderTable({
  selectProducts,
  totalDeliveryCharge,
  totalPrice,
}) {
  return (
    <div>
      <h3 className="order-table-title order-title-all">주문상세내역</h3>
      <table className="order-table">
        <thead className="order-table-head">
          <tr>
            <th>상품/옵션 정보</th>
            <th>수량</th>
            <th>상품금액</th>
            <th>할인/적립</th>
            <th>합계금액</th>
            <th>배송비</th>
          </tr>
        </thead>
        <tbody className="order-table-body">
          {selectProducts.map((item, index) => (
            <tr key={item.id}>
              <td>
                <div className="product-info" style={{ maxWidth: "400px" }}>
                  <Link to={`/product/${item.pid}`}>
                    <img
                      src={`http://192.168.50.76:8000/${item.image}`}
                      alt="상품 이미지"
                      className="product-image"
                    />
                  </Link>
                  <Link
                    to={`/product/${item.pid}`}
                    style={{ fontWeight: "500" }}
                  >
                    {item.title}
                  </Link>
                </div>
              </td>

              <td className="order-table-quantity">{item.qty}개</td>
              <td style={{ fontWeight: "bold" }}>
                {item.price.toLocaleString()}원
              </td>
              <td>
                <div className="discount-info cart">
                  <span className="discount-info-strong">적립</span>
                  <span>
                    상품&nbsp;
                    <span style={{ fontWeight: "bold" }}>
                      +{Math.round((item.price * item.qty * 0.01) / 10) * 10}원
                    </span>
                  </span>
                </div>
              </td>
              <td style={{ fontWeight: "bold" }}>
                {(item.price * item.qty).toLocaleString()}원
              </td>
              {index === 0 && (
                <td rowSpan={selectProducts.length} className="delivery-charge">
                  고정배송비 <br />
                  {totalDeliveryCharge()}원<br />
                  (택배-선결제)
                </td>
              )}
            </tr>
          ))}
          <tr className="summary-row">
            <td colSpan="6">
              <div className="summary">
                <div className="mileage-info">
                  <span>
                    적립예정 마일리지:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {Math.round((totalPrice(selectProducts) * 0.01) / 10) *
                        10}
                      원
                    </span>
                  </span>
                </div>
                <div className="total-price-info">
                  <span>
                    총 {selectProducts.length} 개의 상품금액{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      {totalPrice(selectProducts).toLocaleString()}원
                    </span>{" "}
                    &nbsp; + &nbsp; 배송비{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      {selectProducts.length === 0 ? 0 : totalDeliveryCharge()}
                      원
                    </span>
                    &nbsp; &nbsp; = &nbsp; &nbsp;{" "}
                    <span style={{ fontWeight: "bold" }}>합계 </span>
                    <span
                      className="total-price-info-strong"
                      style={{ fontWeight: "bolder" }}
                    >
                      {(
                        totalPrice(selectProducts) +
                        (selectProducts.length === 0
                          ? 0
                          : totalDeliveryCharge())
                      ).toLocaleString()}
                      원
                    </span>
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
