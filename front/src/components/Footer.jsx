import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="content-area">
        <div className="footer-contents">
          <div className="footer-list">
            <ul>
              <li>회사소개</li>
              <li>이용약관</li>
              <li>
                <strong>개인정보처리방침</strong>
              </li>
              <li>이용안내</li>
              <li>광고/제휴문의</li>
              <li>이메일 무단수집거부</li>
            </ul>
          </div>
          <div className="footer-logo">{/*<img src="/" alt="로고">*/}</div>
          <div className="footer-info">
            <strong>02-2661-0996</strong>
            <p>
              <span>
                <span className="centerhours">
                  월요일~금요일 AM 10:00 ~ PM 12:00 PM 1:00 ~ PM 05:00
                  (토/일/공휴일 휴무)
                </span>
              </span>
              <span>
                <span>국민은행 : 642201-04-105595</span>{" "}
                <span>예금주 : 주식회사 에버라인</span>
              </span>
            </p>
          </div>
          <div className="footer-business">
            <span></span>
            <ul>
              <li>
                <span className="cm-exbold">주식회사 에버라인</span>
              </li>
              <li>
                <strong>대표이사</strong>
                <span>박정희</span>
              </li>
              <li>
                <strong>주소</strong>
                <span>서울특별시 강서구 개화동로17길 9-15 </span>
              </li>
              <li>
                <strong>사업자등록번호</strong>
                <span>641-86-01177 [사업자번호조회]</span>
              </li>
              <li>
                <strong>통신판매업 신고번호</strong>
                <span>2018-서울강서-1084</span>
              </li>
              <li>
                <strong>개인정보보호책임자</strong>
                <span>박정희</span>
              </li>
              <li>
                <strong>대표번호</strong>
                <span>02-2661-0996</span>
              </li>
              <li>
                <strong>팩스번호</strong>
                <span>02-2661-0998</span>
              </li>
              <li>
                <strong>메일</strong>
                <span>everlineshop@naver.com</span>
              </li>
              <li>
                <strong>물류센터</strong>
                <span>
                  경기도 김포시 고촌읍 태리 123-5, 인천광역시 계양구 선주지동
                  114-8 A, B
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-itemBox">
          <p className="copyright">
            <strong>
              <span>COPYRIGHT ⓒ</span>{" "}
              <span>
                <mark>WWW.EVERLINESHOP.COM</mark>
              </span>{" "}
              <span>ALL RIGHTS RESERVED.</span>
            </strong>{" "}
            <span>HOSTING BY 엔에이치엔고도(주)</span>
          </p>
        </div>
      </div>
    </div>
  );
}