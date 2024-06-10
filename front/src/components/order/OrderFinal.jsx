export default function OrderFinal({ totalPrice, selectProducts }) {
  return (
    <div className="order-final">
      <div className="order-final-info">
        <span>결제금액</span>{" "}
        <span>{totalPrice(selectProducts)?.toLocaleString()}원</span>
      </div>

      <div className="final-agree-box">
        <input id="final-agree" type="checkbox" className="custom-checkbox" />
        <label htmlFor="final-agree">
          <strong style={{ fontWeight: "bolder" }} className="final-strong">
            [필수]{" "}
          </strong>
          구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
        </label>
      </div>
      <div>
        <button style={{ fontWeight: "bolder" }} className="btn-order-final">
          주문
        </button>
      </div>
    </div>
  );
}
