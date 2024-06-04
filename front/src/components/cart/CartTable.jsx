import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartPopup from "./CartPopup.jsx";

export default function CartTable({ cartItems, setCartItems }) {
  const [allChecked, setAllChecked] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [initialProductState, setInitialProductState] = useState(null);
  const [showCouponPopup, setShowCouponPopup] = useState(false);

  // 장바구니 항목이 모두 선택되었는지 확인
  useEffect(() => {
    setAllChecked(cartItems.every((item) => item.checked));
  }, [cartItems]);

  // 컴포넌트가 처음 렌더링될 때 모든 항목의 체크 상태를 true로 설정
  useEffect(() => {
    const updatedCartList = cartItems.map((item) => ({
      ...item,
      checked: true,
    }));
    setCartItems(updatedCartList);
  }, []);

  // 선택된 항목 필터링
  const selectedItems = cartItems.filter((item) => item.checked);

  // 총 가격 계산
  const totalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  // 총 배송비 계산
  const totalDeliveryCharge = () => {
    if (selectedItems.length === 0) {
      return 0;
    }
    return totalPrice(selectedItems) < 70000 ? 3500 : 0;
  };

  // 항목의 체크 상태 업데이트
  const updateCheckedState = (index, isChecked) => {
    const updatedCartList = [...cartItems];
    updatedCartList[index].checked = isChecked;
    setCartItems(updatedCartList);
    setAllChecked(updatedCartList.every((item) => item.checked));
  };

  // 모든 항목 체크 상태 토글
  const handleCheckAll = () => {
    const updatedCartList = cartItems.map((item) => ({
      ...item,
      checked: !allChecked,
    }));
    setCartItems(updatedCartList);
    setAllChecked(!allChecked);
  };

  // 개별 항목 체크 상태 변경
  const handleCheck = (index) => {
    updateCheckedState(index, !cartItems[index].checked);
  };

  // 수량 증가
  const increaseQuantity = (index) => {
    const updatedCartList = [...cartItems];
    updatedCartList[index].qty += 1;
    setCartItems(updatedCartList);
  };

  // 수량 감소
  const decreaseQuantity = (index) => {
    const updatedCartList = [...cartItems];
    if (updatedCartList[index].qty > 1) {
      updatedCartList[index].qty -= 1;
    }
    setCartItems(updatedCartList);
  };

  // 수량 직접 입력 변경
  const handleQuantityChange = (index, value) => {
    const updatedCartList = [...cartItems];
    updatedCartList[index].qty = value;
    setCartItems(updatedCartList);
  };

  // 팝업 열기
  const openPopup = (item) => {
    setInitialProductState({ ...item });
    setSelectedProduct(item);
    setShowPopup(true);
  };

  // 팝업 닫기 (취소)
  const cancelPopup = () => {
    if (initialProductState) {
      const index = cartItems.findIndex(
        (item) => item.id === initialProductState.id
      );
      const updatedCartList = [...cartItems];
      updatedCartList[index] = initialProductState;
      setCartItems(updatedCartList);
    }
    setShowPopup(false);
    setSelectedProduct(null);
    setInitialProductState(null);
  };

  // 팝업 확인
  const confirmPopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
    setInitialProductState(null);
  };

  // 쿠폰 팝업 열기
  const openCouponPopup = () => {
    setShowCouponPopup(true);
  };

  // 쿠폰 팝업 닫기
  const closeCouponPopup = () => {
    setShowCouponPopup(false);
  };

  console.log(cartItems);

  return (
    <div className="cart-container">
      <table className="cart-table-area">
        <thead className="cart-table-head">
          <tr>
            <th>
              <input
                type="checkbox"
                className="custom-checkbox"
                onClick={handleCheckAll}
                checked={allChecked}
              />
            </th>
            <th>상품/옵션 정보</th>
            <th>수량</th>
            <th>상품금액</th>
            <th>할인/적립</th>
            <th>합계금액</th>
            <th>배송비</th>
          </tr>
        </thead>
        <tbody className="cart-table-body">
          {cartItems.map((item, index) => (
            <tr key={item.id} className="cart-table-product-row">
              <td>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(index)}
                />
              </td>
              <td>
                <div className="product-info">
                  <Link to={`/detail/${item.id}`}>
                    <img
                      src={item.image}
                      alt="상품 이미지"
                      className="product-image"
                    />
                  </Link>
                  <div className="product-details">
                    <button onClick={openCouponPopup} className="coupon-button">
                      COUPON
                    </button>
                    <Link
                      to={`/detail/${item.id}`}
                      style={{ fontWeight: "500" }}
                    >
                      {item.name}
                    </Link>
                  </div>
                </div>
              </td>
              <td>
                <div className="quantity-control cart">
                  <span>{item.qty}개</span>
                  <button
                    onClick={() => openPopup(item)}
                    className="option-button cart red-button"
                  >
                    옵션변경
                  </button>
                </div>
              </td>
              <td style={{ fontWeight: "bold" }}>
                {item.price?.toLocaleString()}원
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
                <td rowSpan={cartItems.length} className="delivery-charge">
                  고정배송비 <br />
                  {totalDeliveryCharge()}원<br />
                  (택배-선결제)
                </td>
              )}
            </tr>
          ))}
          <tr className="summary-row">
            <td colSpan="7">
              <div className="summary">
                <div className="mileage-info">
                  <span>
                    적립예정 마일리지:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {(
                        Math.round((totalPrice(selectedItems) * 0.01) / 10) * 10
                      )?.toLocaleString()}
                      원
                    </span>
                  </span>
                </div>
                <div className="total-price-info">
                  <span>
                    총 {selectedItems.length} 개의 상품금액{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      {totalPrice(selectedItems).toLocaleString()}원
                    </span>{" "}
                    &nbsp; + &nbsp; 배송비{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      {selectedItems.length === 0 ? 0 : totalDeliveryCharge()}원
                    </span>
                    &nbsp; &nbsp; = &nbsp; &nbsp;{" "}
                    <span style={{ fontWeight: "bold" }}>합계 </span>
                    <span
                      className="total-price-info-strong"
                      style={{ fontWeight: "bolder" }}
                    >
                      {(
                        totalPrice(selectedItems) +
                        (selectedItems.length === 0 ? 0 : totalDeliveryCharge())
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
      {showPopup && selectedProduct && (
        <CartPopup
          selectedProduct={selectedProduct}
          cancelPopup={cancelPopup}
          confirmPopup={confirmPopup}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          handleQuantityChange={handleQuantityChange}
          cartItems={cartItems}
        />
      )}
      {showCouponPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>쿠폰 적용하기</h3>
            <div className="coupon-popup-content">
              <p>여기에 사용 가능한 쿠폰 리스트를 표시합니다.</p>
              <button
                onClick={closeCouponPopup}
                className="coupon-popup-cancel"
              >
                취소
              </button>
              <button
                onClick={() => {
                  console.log("쿠폰 적용");
                }}
                className="coupon-popup-apply"
              >
                쿠폰 적용
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
