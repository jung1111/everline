import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import axios from 'axios';


export default function InquiryDetail(){
		const {bid , rno} = useParams();
		const [board, setBoard] = useState({});

		useEffect(()=>{
			const url = `http://127.0.0.1:8000/inquiry/${bid}`;
			axios({
				method: 'get',
				url: url
			})
			.then(result => setBoard(result.data))
			.catch(error => console.log(error));
		},[bid])

		console.log('board->>>',board);

		const navigate = useNavigate();

		//수정하기, 삭제하기 버튼 누르면 해당페이지로 이동
		const handleNavigate = (type) => {
			(type === 'list') ? navigate(`/inquiry`) : navigate(`/inquiry/${type}/${board.bid}/${rno}`);
		}

		// console.log('board->>>',board);
		return (
		<div className='content'>
			<Location depth1="CUSTOMER" depth2="1:1문의"/>
			<SubTitle title="CUSTOMER"/>
			<ul className='sub-menu'>
				<SubMenu menu="공지사항" src="/notice"/>
				<SubMenu menu="1:1문의" src="/inquiry"/>
				<SubMenu menu="FAQ"  src="/faq"/>
			</ul>
				<h1>상세정보</h1>
         <table border="1">
            <tr>
                <th>번호</th>
                <td>{rno}</td>
                <th>조회수</th>
                <td>{board.bhits}</td>
                <th>등록일자</th>
                <td>{board.bdate}</td>
            </tr>
            <tr>
                <th>제목</th>
                <td colSpan={5}>{board.btitle}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td colSpan={5}>{board.bcontent}</td>
            </tr>
            <tr>
               
                <td colSpan={6}>
                   <button type='button' onClick={()=>handleNavigate('update')}>수정하기</button>
                   <button type='button' onClick={()=>handleNavigate('delete')}>삭제하기</button>
                   <button type='button' onClick={()=>handleNavigate('list')}>리스트</button>
                </td>
            </tr>
        </table>
		</div>
	);
}