import React from "react";
import "../css/footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="content">				
        <div className="footer-contents">          
          <div className="footer-logo">로고</div>
					<div className="footer-business">
						<ul className="footer-link">
							<li><a href="https://www.everlineshop.com/service/company.php">회사소개</a></li>
							<li><a href="">이용약관</a></li>
							<li>
								<a href="">개인정보처리방침</a>								
							</li>
							<li><a href="">이용안내</a></li>
							<li><a href="">광고/제휴문의</a></li>
							<li><a href="">이메일 무단수집거부</a></li>
						</ul>
						<ul className="footer-list">
							<li>
								<span className="title">주식회사 에버라인</span>
							</li>
							<li>대표이사 : 박정희</li>
							<li className="bor">주소 : 서울특별시 강서구 개화동로17길 9-15</li>
							<li>사업자등록번호 : 641-86-01177 [사업자번호조회]</li>
							<li>통신판매업 신고번호 : 2018-서울강서-1084</li>
							<li className="bor">개인정보보호책임자 : 박정희</li>
							<li>대표번호 : 02-2661-0996</li>
							<li>팩스번호 : 02-2661-0998</li>
							<li className="bor">메일 : everlineshop@naver.com</li>
							<li className="bor">물류센터 : 경기도 김포시 고촌읍 태리 123-5, 인천광역시 계양구 선주지동
									114-8 A, B
							</li>
						</ul>
					</div>  
          <div className="footer-info">
            <strong>02-2661-0996</strong>
            <p className="centerhours">                  
              월요일~금요일 AM 10:00 ~ PM 12:00 PM 1:00 ~ PM 05:00 (토/일/공휴일 휴무)
						</p> 
        		<p>국민은행 : 642201-04-105595</p>
            <p>예금주 : 주식회사 에버라인</p>
          </div>
     
        </div>
        <div className="footer-itemBox">
          <span className="copyright">
						COPYRIGHT ⓒ<span className="bold">WWW.EVERLINESHOP.COM</span>ALL RIGHTS RESERVED.            
          </span>
					<div class="footer-itemBox-certMark">
						<a className="footer-itemBox-left" href="https://hanteochart.com/family/search" target="_blank"></a>
						<a className="footer-itemBox-right" href="https://circlechart.kr" target="_blank"></a>
					</div>
        </div>
      </div>
    </div>
  );
}