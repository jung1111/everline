import React, { useEffect, useState } from "react";
import axios from "axios";
import CartTable from "../components/cart/CartTable.jsx";
import CartControl from "../components/cart/CartControl.jsx";
import SubTitle from "../components/SubTitle.jsx";
import "../css/cart.css";

export default function CartPage({ decrementCartCount, userId }) {
  const [cartItems, setCartItems] = useState([]);
  const url = "http://192.168.50.76:8000/carts";
  useEffect(() => {
    axios({ method: "post", url: url, data: { userId: userId } })
      .then((result) => {
        setCartItems(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  return (
    <div className="content">
      <SubTitle title="장바구니" />
      {cartItems.length === 0 ? (
        <h3 className="empty-cart-message">장바구니가 비었습니다.</h3>
      ) : (
        <div className="cart-table">
          <CartTable cartItems={cartItems} setCartItems={setCartItems} />
          <CartControl
            cartItems={cartItems}
            setCartItems={setCartItems}
            decrementCartCount={decrementCartCount}
            userId={userId}
          />
        </div>
      )}
    </div>
  );
}
