import React from "react";

const ProductDetailList = ({ scrollToSection1, scrollToSection2, scrollToSection3 }) => {
    return (
      <div className="productDetatil_sub">
        <ul className="productDetatil_content">
          <li className="productDetatil_info" onClick={scrollToSection1}>
            상품상세정보
          </li>
          <li className="productDetatil_notice" onClick={scrollToSection2}>
            안내사항
          </li>
          <li className="productDetatil_customer" onClick={scrollToSection3}>
            1:1문의
          </li>
        </ul>
      </div>
    );
  };
  
  export default ProductDetailList;