import '../css/product.css'
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Location from '../components/Location';
import axios from "axios";

export default function ProductDetail({ addCartCount}) {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/product.json")
      .then((res) => {
        setProduct(res.data);
        const foundProduct = res.data.find((item) => item.id === id);
        setProduct(foundProduct);
      })
      .catch((error) => console.log(error));
  }, [id]);

  /* 상품금액 토글 */
  const [moreview, setMoreview] = useState(false);
  const Click = () => {
    setMoreview(!moreview);
  };
  /* 상품정보 토글 */
  const [moreview1, setMoreview1] = useState(false);
  const Click1 = () => {
    setMoreview1(!moreview1);
  };

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (sectionRef) => {
    // 섹션으로 스크롤 이동
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  const addCartItem = (id) => {
    const selectedProduct = {
      id: id,
      image: product.image,
      name: product.title,
      price: product.price,
      qty: 1,
      checked: true,
    };
    addCartCount(selectedProduct);
  };
  return (
    <div className="content">
      <Location depth1="PRODUCT" depth2="DTAIL"/>
      <div className='ProductDetail-sub'>
        <img className="ProductDetail-img" src={product.image} alt="" />
      </div>
        <div className="ProductDetail">
              <div className="ProductDetail-infobox">
                <h2>{product.title}</h2>
                <h3>{product.price}</h3>
              </div>
              <div>
                <div className="ProductDetail-info" onClick={Click}>
                  <span>상품금액</span>
                  <span>{moreview ? (<div className="toggle_btn1"></div>) : (<div className="toggle_btn2"></div>)}</span>
                </div>
                {moreview && (
                    <div>
                        <div className='span-list'>
                          <span>판매가</span>
                          <span><strong>{product.price}</strong>원</span>
                        </div>
                        <div className='span-list'>
                          <span>구매제한</span>
                          <span>옵션당 최소수량 1개</span>
                        </div>
                        <div className='span-list'>
                          <span>구매혜택</span>
                          <span>마일리지 <strong>{(product.price)*0.05}</strong>원 적립</span>
                        </div>
                        <div className='span-list'>
                          <span>배송비</span>
                          <span><strong>{product.price}</strong>원</span>
                        </div>
                    </div>
                )}
              </div>
              <div className="line"></div>
              <div>
                <div className="ProductDetail-info" onClick={Click1}>
                  <span>상품정보</span>
                  <span>{moreview1 ? (<div className="toggle_btn1"></div>) : (<div className="toggle_btn2"></div>)}</span>
                </div>
                {moreview1 && (
                    <div>
                        <div className='span-list'>
                          <span>상품코드</span>
                          <span><strong>1234565</strong></span>
                        </div>
                        <div className='span-list'>
                          <span>브랜드</span>
                          <span><strong>브랜드</strong></span>
                        </div>
                    </div>
                )}
              </div>
              <div className="line"></div>
                <div className="ProductDetail-info">
                  <div className='totalprice-box'>
                    <span>총 합계금액</span>
                    <span>{product.price}</span>
                  </div>
                </div>
              <div className="line"></div>
              <div className="product_btn_box">
                <Link to="/">
                  <button className="product_btn1" type="button">찜리스트</button>
                </Link>
                <Link to="/">
                  <button className="product_btn2" type="button" onClick={() => addCartItem(product.id)}>장바구니</button>
                </Link>
                <Link to="/">
                  <button className="product_btn3" type="button">바로구매</button>
                </Link>
              </div>
        </div>








      
      <div className="ProductDetail-page">
            <div className="productDetatil_sub">
              <ul className="productDetatil_content">
                <li
                  className="productDetatil_info"
                  onClick={() => scrollToSection(section1Ref)}
                  ref={section1Ref}
                >
                  상품상세정보
                </li>
                <li
                  className="productDetatil_notice"
                  onClick={() => scrollToSection(section2Ref)}
                >
                  안내사항
                </li>
                <li
                  className="productDetatil_customer"
                  onClick={() => scrollToSection(section3Ref)}
                >
                  1:1문의
                </li>
              </ul>
            </div>
            <div className="productDetatil_info_box">
              <div>
                상품상세정보
              </div>
              <img
                className="productDetatil_info_img"
                src={product.detailimage}
                alt=""
              />
            </div>
            <div className="productDetatil_notice_box" ref={section2Ref}>
              <div>
                안내사항
              </div>
            </div>
            <div className="productDetatil_customer_box" ref={section3Ref}>
              <div>
                1:1문의
              </div>
              <button type="button">1:1문의 남기기</button>
            </div>
      </div>
    </div>
  );
}
