import "../css/board.css";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import Table from '../components/Table';
import axios from 'axios';

//paging navigation
import Pagination from 'rc-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-pagination/assets/index.css';


export default function Notice(){
	const [noticeList, setNoticeList] = useState([]); 

	// paging
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [pageSize, setPageSize] = useState(8);

		useEffect(()=>{
			//startIndex, endIndex
			let startIndex = 0;
			let endIndex = 0;

			startIndex = (currentPage -1) * pageSize + 1;
			endIndex = currentPage * pageSize;
			
			axios.get('http://localhost:3000/data/notice.json')
			.then(result => {
				setNoticeList(result.data.slice(startIndex, endIndex))
				setTotalCount(result.data.length)
			})
			.catch(error => console.log(error))
		},[currentPage])


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
					<span className='count-no-text'><span className='count-no-red'>{totalCount}</span> 개의 게시물</span>
				</span>
			</div>
			<Table name="notice" noticeList={noticeList} />	
			<Pagination className='d-flex justify-content-center' style={{marginTop:'15px'}} 
									current={currentPage} total={totalCount} pageSize={pageSize} onChange={(page)=>setCurrentPage(page)}/>		

		</div>
	);
}