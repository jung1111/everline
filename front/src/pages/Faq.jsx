import React from 'react';
import "../css/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import ToggleFaq from '../components/ToggleFaq';

export default function Faq(){
		const faqData = [
			{
				"no": "1",
				"cartegory": "주문/결제/입금",
				"title": "주소지(혹은 연락처)를 잘못 기재 하였습니다.",
				"cont": `배송 전(입금확인(상품준비)) 상태라면 1:1문의를 통해 주소지(혹은 연락처)를 변경 하실 수 있습니다.
									주문번호와 변경 하실 주소지(혹은 연락처)를 꼭 기재하여 문의 주시기 바랍니다.`
			},
			{
				"no": "2",
				"cartegory": "주문/결제/입금",
				"title": "주문했을 때 배송 문자(SMS)가 오나요? ",
				"cont": `everlineshop 에서는 문자(SMS) 알림 서비스로 주문완료부터 출고까지 안내해 드리고 있습니다.
									또한 모든 주문 내역 및 발송은 e-mail로 안내하여 드리고 있사오니 이용에 참고하시기 바랍니다.​`
			},
			{
				"no": "3",
				"cartegory": "주문/결제/입금", 
				"title": "상품의 옵션 혹은 수량을 변경 하고 싶습니다.",
				"cont": `이미 주문 접수가 되어진 내용이나,입금이 된 주문은 수량 및 옵션 변경이 불가능 합니다.
									1) 입금전 상태MY PAGE에서 주문 하신 주문번호를 클릭 하면 고객님께서 직접 취소 하실 수 있습니다.
									취소 후 다시 주문 접수를 하여 주시기 바랍니다.
									2) 배송준비중 상태변경이 불가능 합니다.주문 취소를 해야 하므로,
									고객센터 1:1 문의 혹은 전화 상담을 이용해 주시기 바랍니다. ※ 상품을 추가로 구매하고자 하는 경우,
									기존 주문에는 추가가 불가하오니기존 주문 취소 후 재주문 또는 다른 주문으로 추가 상품을 구매해 주시기 바랍니다.`
			},
			{
				"no": "4",
				"cartegory": "배송",
				"title": "예약상품이 포함될 경우 배송은 각기 진행되는 것인가요?",
				"cont": `주문 내역 중 예약상품이 포함 되어 있을 경우, 제일 늦게 출시가 되는 예약 상품 발송일 에 구매 하신 제품이 모두 같이 배송이 됩니다.
								묶음배송건은 한꺼번에 배송이 진행되니 꼭 유의하여 주문하시기 바랍니다.`
			},
			{
				"no": "5",
				"cartegory": "주문/결제/입금",
				"title": "입금후 주문 취소할 경우 환불은 어떻게 진행 되나요?",
				"cont": `주문취소 및 환불은 반드시 고객센터를 통해서 이루어져야 합니다.
				환불 받으실 계좌번호, 은행명, 예금주를 1:1 문의 게시판으로 남겨 주시면 환불 처리 진행을 도와 드립니다.											
				환불은 접수일에 따라 최대 10일 정도 소요 될 수 있습니다.											
				자세한 내용은 환불요청시 안내 드립니다.`
			},
			{
				"no": "6",
				"cartegory": "취소/교환/환불/반품",
				"title": "배송 전 취소를 하고 싶습니다.",
				"cont": `배송전의 취소는 고객님께서 직접 하실 수 없습니다.
				이 부분은 고객센터 1:1 문의 혹은 전화 상담을 이용해 주시기 바랍니다.				
				배송은 오후 12시에 마감되므로 12시 이후 주문건은 상황에 따라서 배송 전 취소가 불가능 할 수 있습니다. 											
				단, 예약상품의 경우 배송전이더라도 예약판매 마감후 주문취소는 불가 합니다.`
			},
			{
				"no": "7",
				"cartegory": "회원",
				"title": "교환, 반품 및 재배송에 대한 문의",
				"cont": `교환 및 반품은 고객센터로 문의주시면 내용 확인 후 안내해드립니다.
				1:1문의게시판 또는 070-4190-4189으로 문의주시면 확인해 드리겠습니다.  				
				상품 누락의 경우 everlineshop@naver.com 으로 고객님의 성함/주문번호/누락(또는 교환)된 상품(멤버) 사진 				
				혹은 영상과 함께 보내주시면 확인 후에 재배송 도와드리도록 하겠습니다.  			
				문의 없이 상품 먼저 보내시면 확인이 어려우니 반드시 문의 후 발송 부탁드립니다.`
			},
			{
				"no": "8",
				"cartegory": "취소/교환/환불/반품",
				"title": "반품 주소지 문의",
				"cont": `반품 주소지 : 경기도 김포시 고촌읍 태리123-5 (02-2661-0996)`
			},
		];
		const tableWidth ={
			width10 : {width: '10%'},
			width20 : {width: '20%'},
		  width60 : {width: '60%'}
		}

		return (
		<div className='content'>
			<Location depth1="CUSTOMER" depth2="FAQ"/>
			<SubTitle title="CUSTOMER"/>
			<ul className='sub-menu'>
				<SubMenu menu="공지사항" src="/notice"/>
				<SubMenu menu="1:1문의" src="/inquiry"/>
				<SubMenu menu="FAQ"  src="/faq"/>
			</ul>
			<div className='count'>
				<span className="count-no">
					<span className='count-no-icon'><FontAwesomeIcon icon={faList} /></span>
					<span className='count-no-text'><span className='count-no-red'>{faqData.length}</span> 개의 게시물</span>
				</span>
			</div>

				<table className='Board-table faq'>
					<colgroup>
						<col style={tableWidth.width10} />
						<col style={tableWidth.width20} />
						<col style={tableWidth.width60} />
						<col style={tableWidth.width10} />
					</colgroup>
					<tbody>
						<ToggleFaq faqData={faqData}/>			
					</tbody>
				</table>
		</div>
	);
}