import React, { useState, useEffect } from 'react';
import "../css/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import Table from '../components/Table';
import axios from 'axios';


export default function WinnerNoticeList(){
	const [noticeList, setNoticeList] = useState([]); //json데이터
	const [listPage, setListPage] = useState([]); // 목록에 보여줄 게시글
	const [currentPage, setCurrentPage] = useState(1); //현재페이지
	const pageSize = 8; // 페이지당 게시글 갯수

	const totalCount = noticeList.length;

	const handleChange = (currentPage) => {
			setCurrentPage(currentPage);
	};

	useEffect(() => {
			axios.get('http://localhost:3000/data/winner.json')
					.then(result => {
							setNoticeList([...result.data]);
					})
					.catch(error => console.log(error));
	}, []);

	useEffect(() => {
			const startIndex = (currentPage - 1) * pageSize;
			const endIndex = currentPage * pageSize;
			setListPage(noticeList.slice(startIndex, endIndex));
	}, [noticeList, currentPage]);



		return (
		<div className='content'>
			<Location depth1="EVENT" depth2="당첨자발표"/>
			<SubTitle title="EVENT"/>
			<ul className='sub-menu'>
				<SubMenu menu="이벤트목록" src="/eventlist"/>
				<SubMenu menu="당첨자발표" src="/winner"/>
			</ul>
			<div className='count'>
				<span className="count-no">
					<span className='count-no-icon'><FontAwesomeIcon icon={faList} /></span>
					<span className='count-no-text'><span className='count-no-red'>{totalCount}</span> 개의 게시물</span>
				</span>
			</div>
			<Table name="winner" currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} handleChange={handleChange} listPage={listPage} />
		</div>
	);
}
