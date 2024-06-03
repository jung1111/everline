import React from "react";
import CartTable from "./CartTable";
import CartControl from "./CartControl";
import Location from "../../components/Location.jsx";
import SubTitle from "../../components/SubTitle.jsx";
import "../../css/cart.css";

export default function CartPage({
  cartItems,
  setCartItems,
  setCartCount,
  cartCount,
}) {
  return (
    <div className="content">
      <SubTitle title="장바구니" />
      {cartItems.length === 0 ? (
        <h1 className="empty-cart-message">장바구니가 비었습니다.</h1>
      ) : (
        <div className="cart-table">
          <CartTable
            cartItems={cartItems}
            setCartItems={setCartItems}
            setCartCount={setCartCount}
            cartCount={cartCount}
          />
          <CartControl cartItems={cartItems} setCartItems={setCartItems} />
        </div>
      )}
    </div>
  );
}
