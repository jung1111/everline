import React from 'react';
import "../css/board.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import BoardButton from '../components/BoardButton';
import axios from 'axios';

//paging navigation
import Pagination from 'rc-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-pagination/assets/index.css';


export default function Inquiry(){
	const [inqList, setInqList] = useState([]); 
	const navigate = useNavigate();
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
		
		const url = 'http://127.0.0.1:8000/inquiry/list'
		axios({
			method: 'post',
			url: url,
			data: {'startIndex': startIndex,'endIndex': endIndex}
		})
		.then(result => {
			setInqList(result.data)
			setTotalCount(result.data[0].total)
		})
		.catch(error => console.log(error))
	},[currentPage])

	console.log('totalCount',totalCount);
	
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
					<span className='count-no-text'><span className='count-no-red'>{totalCount}</span> 개의 게시물</span>
				</span>
			</div>
			<div className='Board'>
				<table className='Board-table'>
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
												<Link>
													<span onClick={() => handleUpdateHits(item.bid, item.rno)}>{item.btitle}</span>		
												</Link>															
											</td>
											<td>{item.bhits}</td>
											<td>{item.bdate}</td>
									</tr>
								))
							}
									
					</tbody>
				</table>
				<Pagination className='d-flex justify-content-center' style={{marginTop:'15px'}} 
									current={currentPage} total={totalCount} pageSize={pageSize} onChange={(page)=>setCurrentPage(page)}/>		
			</div>	
			<Link to='/inquiry/write'>
				<div className='BoardButton'>
					<BoardButton button="글쓰기"/>
				</div>
			</Link>
				
		</div>
	);
}