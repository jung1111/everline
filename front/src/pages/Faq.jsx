import React from 'react';
import "../css/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import FaqToggle from '../components/FaqToggle';

export default function Faq(){
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
					<span className='count-no-text'><span className='count-no-red'>2</span> 개의 게시물</span>
				</span>
			</div>

			
				<table className='Board-table faq'>
					<tbody>
						<FaqToggle no={1} cartegory={"주문결제입금"} title={'주소지를 잘못 입력했나요?'} icon={"아이콘"} />
						<FaqToggle no={2} cartegory={"주문결제입금"} title={'상품등록 하고싶어요'} icon={"아이콘"} />					
					</tbody>
				</table>
		</div>
	);
}