import React from "react";
import CartTable from "./CartTable";
import CartControl from "./CartControl";

export default function CartPage({
  cartItems,
  setCartItems,
  setCartCount,
  cartCount,
}) {
  return (
    <div className="container">
      <div className="content">
        <div className="content_breadcrumb"></div>
        <div className="content_area">
          <div className="content_title">
            <h1>장바구니</h1>
          </div>
          {cartItems.length === 0 ? (
            <div>
              {" "}
              <h1 style={{ textAlign: "center", padding: "200px" }}>
                장바구니가 비었습니다.
              </h1>
            </div>
          ) : (
            <>
              <CartTable
                cartItems={cartItems}
                setCartItems={setCartItems}
                setCartCount={setCartCount}
                cartCount={cartCount}
              />
              <CartControl cartItems={cartItems} setCartItems={setCartItems} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
