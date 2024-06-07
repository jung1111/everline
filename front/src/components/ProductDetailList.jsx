import React from "react";

const ProductDetailList = ({ scrollToSection1, scrollToSection2, scrollToSection3 }) => {
    return (
      <div className="productDetatil-sub">
        <ul className="productDetatil-content">
          <li onClick={scrollToSection1}>
            상품상세정보
          </li>
          <li onClick={scrollToSection2}>
            안내사항
          </li>
          <li onClick={scrollToSection3}>
            1:1문의
          </li>
        </ul>
      </div>
    );
  };
  
  export default ProductDetailList;