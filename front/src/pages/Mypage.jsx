import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SubTitle from "../components/SubTitle.jsx";
import "../css/mypage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getUser, removeUser } from "../util/localStorage.js";
import OrderTable from "../components/order/OrderTable.jsx";

export default function Mypage({
  selectProducts,
  totalDeliveryCharge,
  totalPrice,
}) {
  const navigate = useNavigate();
  const userId = getUser().userId;

  const handleLogout = () => {
    removeUser();
    navigate("/");
  };

  return (
    <div className="content">
      <SubTitle title="마이페이지" />
      <div className="mypage-content">
        <div className="mypage-header">
          <div className="mypage-header-item">
            <p style={{ fontWeight: "bold" }}>1,000원</p>
            <p>총적립금</p>
          </div>
          <div className="mypage-header-item">
            <p style={{ fontWeight: "bold" }}>0개</p>
            <p>쿠폰</p>
          </div>
          <div className="mypage-header-item">
            <p style={{ fontWeight: "bold" }}>0원(0회)</p>
            <p>총주문</p>
          </div>
        </div>
        <div className="mypage-order-status">
          <h3>나의 주문처리 현황 (최근 3개월 기준)</h3>
          <hr />
          <div className="order-status-items">
            <div className="order-status-item">
              <p>입금전</p>
              <p>0</p>
            </div>
            <div className="order-status-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div className="order-status-item">
              <p>배송준비중</p>
              <p>0</p>
            </div>
            <div className="order-status-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div className="order-status-item">
              <p>배송중</p>
              <p>0</p>
            </div>
            <div className="order-status-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div className="order-status-item">
              <p>배송완료</p>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="mypage-order-status2">
          <div className="order-status-item2">
            <p>취소</p>
            <p>0</p>
          </div>
          <div className="order-status-item2">
            <p>교환</p>
            <p>0</p>
          </div>
          <div className="order-status-item2">
            <p>반품</p>
            <p>0</p>
          </div>
        </div>
        <div className="order-check">
          <h3>주문내역조회</h3>
          {selectProducts && selectProducts.length === 0 && (
            <p>주문내역이 없습니다</p>
          )}
          {selectProducts && selectProducts.length > 0 && (
            <div className="mypage-info">
              <div className="mypage-info-section">
                <h3>나의 쇼핑 정보</h3>
                <ul>
                  <li>나의 장바구니</li>
                  <li>
                    <OrderTable
                      selectProducts={selectProducts}
                      totalDeliveryCharge={totalDeliveryCharge}
                      totalPrice={totalPrice}
                    />
                  </li>
                </ul>
              </div>

              <div className="mypage-info-section">
                <h3>나의 정보</h3>
                <ul>
                  <Link to={`/mypage/modify/${userId}`}>
                    <li>회원 정보 수정</li>
                  </Link>
                  <Link to="/member/FindAccountPs">
                    <li>비밀번호 변경</li>
                  </Link>
                  <li className="mypage-loout" onClick={handleLogout}>
                    로그아웃
                  </li>
                </ul>
              </div>
              <div className="mypage-info-section">
                <h3>고객센터</h3>
                <ul>
                  <Link to="/inquiry">
                    <li>1:1 문의</li>
                  </Link>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
