import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import axios from 'axios';

export default function InquiryUpdate(){
		const navigate = useNavigate();
		const {bid, rno} = useParams();

		const [boardFormData ,setBoardFormData] = useState({});

		//게시글 상세정보 가져오기
		useEffect(()=>{
			const url = `http://127.0.0.1:8000/inquiry/${bid}`;
			axios({
				method: 'get',
				url: url
			})
			.then(result => setBoardFormData(result.data))
			.catch(error => console.log(error));
		},[bid])

		const handleChange = (e) => {
				const {name, value} = e.target;
				setBoardFormData({...boardFormData, [name]:value});
		}

		console.log('boardFormData->>', boardFormData);


		//수정완료
		const handleUpdateSubmit = () =>{       
			const url = "http://127.0.0.1:8000/inquiry/update";
			axios({
					method:'post',
					url:url,
					data:boardFormData  //bid가 반드시 포함되어야함
			})
			.then(result => { //repository에서 값이 result로 넘어옴
				if(result.data.cnt === 1) {
					navigate('/inquiry');
				}
			})
			.catch(error => console.log(error));
	}    
	
		//다시쓰기
		const handleUpdateReset = () => {
			setBoardFormData({ btitle:'', bcontent:''})
		}

		//페이지 이동
		const handleNavigate = (type) => {
			(type === "list")? navigate('/inquiry') : navigate(`/inquiry/${bid}/${rno}`)
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
				<div className='Board'>
					<table className='Board-table'>
							<tr>
									<th>제목</th>
									<td>
											<input type='text' name='btitle' value={boardFormData.btitle} onChange={handleChange}/>
									</td>
							</tr> 
							<tr>
									<th>내용</th>
									<td>
											<textarea name='bcontent' value={boardFormData.bcontent}  onChange={handleChange}/>
									</td>
							</tr>		         
					</table>
					<div className='BoardButton'>
						<button type='button' onClick={handleUpdateSubmit}>수정완료</button>{/* 호출만 함 */}
						<button type='button' onClick={handleUpdateReset}>다시쓰기</button>
						<button type='button' onClick={()=>handleNavigate('pre')}>이전페이지</button>{/*파라미터로 값을 넘길때  */}
						<button type='button' onClick={()=>handleNavigate('list')}>리스트</button>
					</div>
				</div>
		</div>
	);
}