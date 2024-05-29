import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import LocationNotice from '../components/LocationNotice';
import SubTitleNotice from '../components/SubTitleNotice';
import axios from 'axios';

export default function Inquiry(){
	const [inqList, setInqList] = useState([]); 

	useEffect(()=>{
		const url = 'http://127.0.0.1:8000/inquiry/list'
		axios({
			method: 'get',
			url: url
		})
		.then(result => setInqList(result.data))
		.catch(error => console.log(error))
	},[])

	// console.log('inqList',inqList);

		return (
		<div className='content'>
			<LocationNotice />
			<SubTitleNotice />
			<div className='count'>
				<span className="count-no">
					<span className='count-no-icon'><FontAwesomeIcon icon={faList} /></span>
					<span className='count-no-text'><span className='count-no-red'>{inqList.length}</span> 개의 게시물</span>
				</span>
			</div>
			<table className='notice-table'>
				<thead>
					<tr>
						<th>번호</th>
						<th>제목</th>
						<th>작성자</th>
						<th>날짜</th>
					</tr>
				</thead>
				<tbody>
					{
							inqList.map((item)=>(
								<tr>
										<td>{item.rno}</td>
										<td><Link to={`/inquiry/${item.bid}/${item.rno}`}>{item.btitle}</Link></td>
										<td>{item.bhits}</td>
										<td>{item.bdate}</td>
								</tr>
							))
						}
								
				</tbody>
			</table>	
			<Link to='/inquiry/write'>
				<button type='button' style={{marginTop:"20px"}}>글쓰기</button>
			</Link>
		</div>
	);
}