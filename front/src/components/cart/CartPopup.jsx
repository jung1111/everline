import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CartPopup = ({
  selectedProduct,
  cancelPopup,
  confirmPopup,
  decreaseQuantity,
  increaseQuantity,
  handleQuantityChange,
  cartItems,
}) => {
  if (!selectedProduct) {
    return null;
  }

  const selectedIndex = cartItems.findIndex(
    (item) => item.id === selectedProduct.id
  );

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-title">
          <h4>옵션선택</h4>
          <span className="popup-close-wrapper" onClick={cancelPopup}>
            <FontAwesomeIcon icon={faXmark} className="popup-close-btn" />
          </span>
        </div>

        <div className="popup-product-info-box">
          <div className="popup-product-info">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="popup-product-image"
            />
            <p className="popup-product-description">{selectedProduct.name}</p>
          </div>
          <div className="quantity-selector">
            <button onClick={() => decreaseQuantity(selectedIndex)}>-</button>
            <input
              type="number"
              value={selectedProduct.qty}
              onChange={(e) =>
                handleQuantityChange(selectedIndex, parseInt(e.target.value))
              }
              className="quantity-input"
            />
            <button onClick={() => increaseQuantity(selectedIndex)}>+</button>
          </div>

          <p className="popup-product-price">
            {(selectedProduct.price * selectedProduct.qty).toLocaleString()}원
          </p>
        </div>
        <div className="popup-buttons">
          <button onClick={cancelPopup} className="popup-button-white">
            취소
          </button>
          <button onClick={confirmPopup} className="popup-button-red">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
