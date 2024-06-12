import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "../css/memberheader.css";
import { getUser, removeUser } from "../util/localStorage.js";

export default function Header({ cartCount }) {
  const [moreview, setMoreview] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const userInfo = getUser();
  const handleLogout = () => {
    removeUser();
    navigate("/");
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className="header-outer">
      <div className="header-menu">
        <Link to="/">
          <h1></h1>
        </Link>
        <div className="header-menu-main">
          <Link className="link" to="/product">
            <span>PRODUCT</span>
          </Link>
          <Link className="link" to="/eventlist">
            <span>EVENT</span>
          </Link>
        </div>
        {userInfo ? (
          <>
            <div className="header-menu-sub">
              <span className="user-menu-wrapper" onClick={toggleUserMenu}>
                <FontAwesomeIcon icon={faUser} className="usericon" size="2x" />
                {userMenuOpen && (
                  <div className="user-menu">
                    <Link className="link" to="/mypage">
                      <p>마이페이지&nbsp;&nbsp;‣</p>
                    </Link>
                    <p className="user-menu-p" onClick={handleLogout}>
                      로그아웃&nbsp;&nbsp;‣
                    </p>
                  </div>
                )}
              </span>
              <Link className="link" to="/carts">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="carticon"
                  size="2x"
                />
                {cartCount}
              </Link>
              {/* <Link className="link" to="/customerService"><FontAwesomeIcon icon={faHeadset} /></Link> */}
              <span
                onClick={() => {
                  setMoreview(!moreview);
                }}
              >
                {moreview ? (
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="headseticon"
                    size="2x"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="headseticon"
                    size="2x"
                  />
                )}
                {moreview && (
                  <div className="headset-menu">
                    <Link className="link" to="/notice">
                      <p>공지사항 &nbsp;&nbsp;‣</p>
                    </Link>
                    <Link className="link" to="/inquiry">
                      <p>1:1문의 &nbsp;&nbsp;‣</p>
                    </Link>
                    <Link className="link" to="/faq">
                      <p>FQA &nbsp;&nbsp;‣</p>
                    </Link>
                  </div>
                )}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="header-menu-sub">
              <Link to="/member">
                <FontAwesomeIcon icon={faUser} className="usericon" size="2x" />
              </Link>
              <Link className="link" to="/carts">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="carticon"
                  size="2x"
                />
                {cartCount}
              </Link>
              {/* <Link className="link" to="/customerService"><FontAwesomeIcon icon={faHeadset} /></Link> */}
              <span
                onClick={() => {
                  setMoreview(!moreview);
                }}
              >
                {moreview ? (
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="headseticon"
                    size="2x"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="headseticon"
                    size="2x"
                  />
                )}
                {moreview && (
                  <div className="headset-menu">
                    <Link className="link" to="/notice">
                      <p>공지사항 &nbsp;&nbsp;‣</p>
                    </Link>
                    <Link className="link" to="/inquiry">
                      <p>1:1문의 &nbsp;&nbsp;‣</p>
                    </Link>
                    <Link className="link" to="/faq">
                      <p>FQA &nbsp;&nbsp;‣</p>
                    </Link>
                  </div>
                )}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
