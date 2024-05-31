import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import axios from 'axios';

//paging navigation
import Pagination from 'rc-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-pagination/assets/index.css';


export default function Inquiry(){
	const [inqList, setInqList] = useState([]); 
	const navigate = useNavigate();

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
	
	// 조회수 업데이트 > 게시글 상세보기
	const handleUpdateHits = (bid, rno) => {
		// alert('bid->>>'+ bid);
		try {
			//1. 조회수 업데이트
			const url = 'http://localhost:8000/inquiry/updateHits';
			axios({
				method: 'post',
				url: url,
				data:{ "bid" : bid}
			})
			.then(result => {
				//2. 조회수 업데이트 성공시 상세보기로 이동
				if(result.data.cnt === 1 ) navigate(`/inquiry/${bid}/${rno}`);
			})
			.catch(error => console.log(error));
		} catch (error) {
			console.log(error)
		}
	}



		return (
		<div className='content'>
			<Location depth1="CUSTOMER" depth2="1:1문의"/>
			<SubTitle title="CUSTOMER"/>
			<ul className='sub-menu'>
				<SubMenu menu="공지사항" src="/notice"/>
				<SubMenu menu="1:1문의" src="/inquiry"/>
				<SubMenu menu="FAQ"  src="/faq"/>
			</ul>
			<div className='count'>
				<span className="count-no">
					<span className='count-no-icon'><FontAwesomeIcon icon={faList} /></span>
					<span className='count-no-text'><span className='count-no-red'>{inqList.length}</span> 개의 게시물</span>
				</span>
			</div>
			<table className='Notice-table'>
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
										<td>
												<span onClick={() => handleUpdateHits(item.bid, item.rno)}>{item.btitle}</span>																
										</td>
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