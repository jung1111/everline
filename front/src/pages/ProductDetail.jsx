import "../css/product.css";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Location from "../components/Location";
import axios from "axios";
import ProductDetailInfo from "../components/ProductDetailInfo.jsx";
import ProductDetailNotice from "../components/ProductDetailNotice.jsx";
import ProductDetailCustomer from "../components/ProductDetailCustomer.jsx";
import ProductDetailList from "../components/ProductDetailList.jsx";
import ScrollUp from "../components/ScrollUp.jsx";
import ReservationIcon from "../components/ReservationIcon.jsx";
import SnsShare from "../components/SnsShare.jsx";
import { getReservationPeriod } from "../components/dateCalc.jsx";

export default function ProductDetail({ addCartCount, userId }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  console.log("ssssss1", userId);
  useEffect(() => {
    axios
      .get(`http://192.168.50.76:8000/product/${id}`)
      .then((res) => {
        console.log("확인", res.data);
        setProduct(res.data);
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
  /* 섹션별이동 함수 */
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (sectionRef) => {
    // 섹션으로 스크롤 이동
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 상품 장바구니 추가 함수
  const addCartItem = async (id) => {
    const url = `http://192.168.50.76:8000/carts/add`;
    try {
      const result = await axios.post(url, { pid: id, userId: userId });
      if (result.data.cnt === 1) {
        addCartCount(result.data.cnt);
        alert("장바구니에 추가 됐습니다.");
        navigate("/carts");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SelectOrder = () => {
    const selectedItems = [
      {
        id: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
        image: product.image,
      },
    ];
    navigate("/order", { state: { selectedItems } });
  };

  console.log("12341234", product);

  // 예약 판매 기간 계산
  const reservationInfo = getReservationPeriod(product.period);
  return (
    <div className="content">
      <SnsShare />
      <Location depth1="PRODUCT" depth2="DETAIL" />
      <div className="ProductDetail-sub">
        <img
          className="ProductDetail-img"
          src={`http://192.168.50.76:8000/${product.image}`}
          alt=""
        />
      </div>
      <div className="ProductDetail">
        {reservationInfo && (
          <ReservationIcon
            date={reservationInfo.period}
            remainingPercentage={reservationInfo.remainingPercentage}
          />
        )}
        <div className="ProductDetail-infobox">
          <h4>{product.title}</h4>
          <h6>발매일: {product.period}</h6>
          <h5>{product.price?.toLocaleString()}원</h5>
        </div>
        <div>
          <div className="ProductDetail-info" onClick={Click}>
            <span>상품금액</span>
            <span>
              {moreview ? (
                <div className="toggle_btn1"></div>
              ) : (
                <div className="toggle_btn2"></div>
              )}
            </span>
          </div>
          {moreview && (
            <div>
              <div className="span-list">
                <span>판매가</span>
                <span>
                  <strong>{product.price.toLocaleString()}</strong>원
                </span>
              </div>
              <div className="span-list">
                <span>구매제한</span>
                <span>옵션당 최소수량 1개</span>
              </div>
              <div className="span-list">
                <span>구매혜택</span>
                <span>
                  마일리지{" "}
                  <strong>
                    {(
                      Math.round((product.price * 0.01) / 10) * 10
                    ).toLocaleString()}
                  </strong>
                  원
                </span>
              </div>
              <div className="span-list">
                <span>배송비</span>
                <span>
                  <strong>
                    {(product.price < 70000 ? 3500 : 0).toLocaleString()}
                  </strong>
                  원
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="line"></div>
        <div>
          <div className="ProductDetail-info" onClick={Click1}>
            <span>상품정보</span>
            <span>
              {moreview1 ? (
                <div className="toggle_btn1"></div>
              ) : (
                <div className="toggle_btn2"></div>
              )}
            </span>
          </div>
          {moreview1 && (
            <div>
              <div className="span-list">
                <span>상품코드</span>
                <span>
                  <strong>1234565</strong>
                </span>
              </div>
              <div className="span-list">
                <span>브랜드</span>
                <span>
                  <strong>브랜드</strong>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="line"></div>
        <div className="ProductDetail-info">
          <div className="totalprice-box">
            <span>총 합계금액</span>
            <span>{product.price?.toLocaleString()}원</span>
          </div>
        </div>
        <div className="line"></div>
        <div className="product-btn-box">
          <Link to="/">
            <button className="product-btn1" type="button">
              찜리스트
            </button>
          </Link>

          <button
            className="product-btn2"
            type="button"
            onClick={() => addCartItem(product.id)}
          >
            장바구니
          </button>

          <button className="product-btn3" type="button" onClick={SelectOrder}>
            바로구매
          </button>
        </div>
      </div>

      <div className="ProductDetail-page">
        <div ref={section1Ref}>
          <ProductDetailList
            scrollToSection1={() => scrollToSection(section1Ref)}
            scrollToSection2={() => scrollToSection(section2Ref)}
            scrollToSection3={() => scrollToSection(section3Ref)}
          />
          <div className="productDetatil-info-box">
            <ProductDetailInfo />
            <img
              className="productDetatil-info-img"
              src={`http://192.168.50.76:8000/${product.detailimage}`}
              alt=""
            />
          </div>
        </div>
        <div ref={section2Ref}>
          <ProductDetailList
            scrollToSection1={() => scrollToSection(section1Ref)}
            scrollToSection2={() => scrollToSection(section2Ref)}
            scrollToSection3={() => scrollToSection(section3Ref)}
          />
          <div className="productDetatil-notice-box">
            <ProductDetailNotice />
          </div>
        </div>
        <div ref={section3Ref}>
          <ProductDetailList
            scrollToSection1={() => scrollToSection(section1Ref)}
            scrollToSection2={() => scrollToSection(section2Ref)}
            scrollToSection3={() => scrollToSection(section3Ref)}
          />
          <div className="productDetatil-customer-box">
            <ProductDetailCustomer />
          </div>
        </div>
      </div>
      <ScrollUp />
    </div>
  );
}
