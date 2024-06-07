import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dropdown from "./DropDown";
export default function Header({cartCount}) {

  return (
    <div className="header-outer">
      <Link to="/"><h1></h1></Link>
      <div className="header-menu">
        <nav className="header-menu-main">
					<Link className="link" to="/product">PRODUCT</Link>
					<Link className="link" to="/eventlist">EVENT</Link>
        </nav>
				<nav className='header-menu-sub'>
          <Link className="link" to="/member" ><FontAwesomeIcon icon={faUser} className="usericon" size="2x"/></Link>
          <Link className="link" to="/carts"><FontAwesomeIcon icon={faBagShopping} className="carticon" size="2x"/><span className='cartcnt'>{cartCount}</span></Link>
            {/* <Link className="link" to="/customerService"><FontAwesomeIcon icon={faHeadset} /></Link> */}
          <Dropdown  />
				</nav>
      </div>
    </div>
  );
}
