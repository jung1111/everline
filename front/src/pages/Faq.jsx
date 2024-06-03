import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';

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
					<span className='count-no-text'><span className='count-no-red'>{/*noticeList.length*/}</span> 개의 게시물</span>
				</span>
			</div>
				<table className='Board-table faq'>
					<tbody>
						<tr>
							<td>16</td>
							<td>주문결제입금</td>
							<td>주소지를 잘못 입력했나요?</td>
							<span>플러스 아이콘</span>
						</tr>
						<tr>
							<td>17</td>
							<td>주문결제입금</td>
							<td>주소지를 잘못 입력했나요?</td>
							<span>플러스 아이콘</span>
						</tr>
						<tr>
							<td>18</td>
							<td>주문결제입금</td>
							<td>주소지를 잘못 입력했나요?</td>
							<span>플러스 아이콘</span>
						</tr>
					</tbody>
				</table>
		</div>
	);
}