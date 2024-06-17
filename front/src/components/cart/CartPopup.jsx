import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CartPopup = ({ selectedProduct, cancelPopup, confirmPopup }) => {
  const { cid, image, title, price, qty } = selectedProduct;
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    setQuantity(qty);
  }, [qty]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  const handleConfirm = () => {
    confirmPopup(cid, quantity);
  };

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
              src={`http://localhost:8000/${image}`}
              alt={title}
              className="popup-product-image"
            />
            <p className="popup-product-description">{title}</p>
          </div>
          <div className="quantity-selector">
            <button onClick={handleDecrease}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              className="quantity-input"
            />
            <button onClick={handleIncrease}>+</button>
          </div>

          <p className="popup-product-price">
            {(price * quantity).toLocaleString()}원
          </p>
        </div>
        <div className="popup-buttons">
          <button onClick={cancelPopup} className="popup-button-white">
            취소
          </button>
          <button onClick={handleConfirm} className="popup-button-red">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
