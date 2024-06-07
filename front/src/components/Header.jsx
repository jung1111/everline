import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Header({cartCount}) {
  const [moreview, setMoreview] = useState(false);

  return (
    <div className="header-outer">
      <div className="header-menu"><Link to="/"><h1></h1></Link>

        <div className="header-menu-main">
					<Link className="link" to="/product"><span>PRODUCT</span></Link>
					<Link className="link" to="/eventlist"><span>EVENT</span></Link>
        </div>

				<div className='header-menu-sub'>
          <Link className="link" to="/member" ><FontAwesomeIcon icon={faUser} className="usericon" size="2x"/></Link>
          <Link className="link" to="/carts"><FontAwesomeIcon icon={faBagShopping} className="carticon" size="2x"/>{cartCount}</Link>
            {/* <Link className="link" to="/customerService"><FontAwesomeIcon icon={faHeadset} /></Link> */}
          <span onClick={() => {setMoreview(!moreview)}}>
            {moreview ? <FontAwesomeIcon icon={faHeadset} className='headseticon' size="2x"/> : <FontAwesomeIcon icon={faHeadset} className='headseticon' size="2x"/>}
              {moreview && (
          <div className='headset-menu'>
            <Link className="link" to="/notice"><p>공지사항 &nbsp;&nbsp;‣</p></Link>
            <Link className="link" to="/inquiry"><p>1:1문의 &nbsp;&nbsp;‣</p></Link>
            <Link className="link" to="/faq"><p>FQA &nbsp;&nbsp;‣</p></Link>
          </div>
            )}
            </span>
				</div>
        </div>
      </div>
  );
}
