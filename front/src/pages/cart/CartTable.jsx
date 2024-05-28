import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <div id="content">
        <>
          <table className="cart-area" border="1">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
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
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheck(index)}
                    />
                  </td>
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
                      <div>
                        <button
                          onClick={openCouponPopup}
                          style={{ display: "block" }}
                        >
                          coupon
                        </button>
                        <Link to={`/detail/${item.id}`}>{item.name}</Link>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>{item.qty}개</span>
                      <button onClick={() => openPopup(item)}>옵션변경</button>
                    </div>
                  </td>
                  <td>{item.price?.toLocaleString()}원</td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>적립</span>
                      <span>
                        상품 +
                        {Math.round((item.price * item.qty * 0.01) / 10) * 10}원
                      </span>
                    </div>
                  </td>
                  <td>{(item.price * item.qty).toLocaleString()}원</td>
                  {index === 0 && (
                    <td rowSpan={cartItems.length}>
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
                      <span>
                        적립예정 마일리지:{" "}
                        {Math.round((totalPrice(selectedItems) * 0.01) / 10) *
                          10}
                        원
                      </span>
                    </div>
                    <div>
                      <span>
                        총 {selectedItems.length} 개의 상품금액{" "}
                        {totalPrice(selectedItems).toLocaleString()}원 + 배송비{" "}
                        {totalDeliveryCharge()}원 = 합계{" "}
                        {(
                          totalPrice(selectedItems) + totalDeliveryCharge()
                        ).toLocaleString()}
                        원
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </div>
      {showPopup && selectedProduct && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: "100px" }}
              />
              <p>{selectedProduct.name}</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() =>
                    decreaseQuantity(
                      cartItems.findIndex(
                        (item) => item.id === selectedProduct.id
                      )
                    )
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  value={selectedProduct.qty}
                  onChange={(e) =>
                    handleQuantityChange(
                      cartItems.findIndex(
                        (item) => item.id === selectedProduct.id
                      ),
                      parseInt(e.target.value)
                    )
                  }
                  style={{
                    appearance: "none",
                    border: "none",
                    outline: "none",
                    width: "40px",
                    textAlign: "center",
                  }}
                />
                <button
                  onClick={() =>
                    increaseQuantity(
                      cartItems.findIndex(
                        (item) => item.id === selectedProduct.id
                      )
                    )
                  }
                >
                  +
                </button>
              </div>
              <p>
                {(selectedProduct.price * selectedProduct.qty).toLocaleString()}
                원
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button onClick={cancelPopup}>취소</button>
              <button onClick={confirmPopup}>확인</button>
            </div>
          </div>
        </div>
      )}
      {showCouponPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>쿠폰 적용하기</h3>
            <div style={{ padding: "20px" }}>
              <p>여기에 사용 가능한 쿠폰 리스트를 표시합니다.</p>
              <button
                onClick={closeCouponPopup}
                style={{ marginRight: "10px" }}
              >
                취소
              </button>
              <button
                onClick={() => {
                  console.log("쿠폰 적용");
                }}
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
