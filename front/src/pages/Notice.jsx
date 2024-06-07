import "../css/board.css";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import Table from '../components/Table';
import axios from 'axios';
import MainNotice from "../components/MainNotice";


export default function Notice(){
		const [noticeList, setNoticeList] = useState([]); 

		useEffect(()=>{
			fetch('data/event.json')
				.then(res => res.json())
				.then(result => setNoticeList(result))
				.catch(error => console.log(error))
		},[])

		return (
		<div className='content'>
			<Location depth1="CUSTOMER" depth2="공지사항"/>
			<SubTitle title="CUSTOMER"/>
			<ul className='sub-menu'>
				<SubMenu menu="공지사항" src="/notice"/>
				<SubMenu menu="1:1문의" src="/inquiry"/>
				<SubMenu menu="FAQ"  src="/faq"/>
			</ul>
			<div className='count'>
				<span className="count-no">
					<span className='count-no-icon'><FontAwesomeIcon icon={faList} /></span>
					<span className='count-no-text'><span className='count-no-red'>{noticeList.length}</span> 개의 게시물</span>
				</span>
			</div>
			<Table name="notice" noticeList={noticeList} />			
		</div>
	);
}