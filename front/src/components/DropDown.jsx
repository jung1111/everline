import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";

export default function DropDown() {


  return (
    <div 
      className="headset" 
    >
      <FontAwesomeIcon icon={faHeadset} className="headseticon" size="2x"/>
    
        <nav className='headset-menu'>
          <Link className="link" to="/notice"><span>공지사항</span></Link>
          <Link className="link" to="/inquiry"><span>1:1문의</span></Link>
          <Link className="link" to="/faq"><span>FQA</span></Link>
        </nav>
      
    </div>
  );
};


