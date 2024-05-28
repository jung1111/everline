import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Header({ cartCount }) {
  return (
    <div className="header-outer">
      <h1>
        <Link to="/">EVERLINE</Link>
      </h1>
      <div className="header-right">
        <nav className="header_nav">
          <Link className="link" to="/product">
            PRODUCT
          </Link>
          <Link className="link" to="/eventlist">
            EVENT
          </Link>
        </nav>
        <nav>
          <Link className="link" to="/notice">
            공지사항
          </Link>
          <Link className="link" to="/inquiry">
            1:1문의
          </Link>
          <Link className="link" to="/faq">
            FQA
          </Link>
          <Link className="link" to="/member">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link className="link" to="/carts">
            <FontAwesomeIcon icon={faBagShopping} />
            <span>{cartCount}</span>
          </Link>
          {/* <Link className="link" to="/customerService">
            <FontAwesomeIcon icon={faHeadset} />
          </Link> */}
        </nav>
      </div>
    </div>
  );
}
