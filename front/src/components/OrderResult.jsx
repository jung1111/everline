import React from "react";
import SubTitle from "./SubTitle";
import "../css/resultorder.css";

export default function OrderResult() {
  return (
    <div className="content">
      <SubTitle title="주문내역조회" />
      <div className="order-result-all">
        <p>주문내역이 없습니다</p>
      </div>
    </div>
  );
}
