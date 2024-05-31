import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import Table from '../components/Table';

export default function WinnerNoticeList(){
		const [noticeList, setNoticeList] = useState([]); 
		useEffect(()=>{
			fetch('data/event.json')
				.then(res => res.json())
				.then(result => setNoticeList(result))
				.catch(error => console.log(error))
		},[])

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
					<span className='count-no-text'><span className='count-no-red'>{noticeList.length}</span> 개의 게시물</span>
				</span>
			</div>
			<Table noticeList={noticeList} />
		</div>
	);
}
