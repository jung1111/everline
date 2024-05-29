import React, { useState } from 'react';
import LocationNotice from '../components/LocationNotice';
import SubTitleNotice from '../components/SubTitleNotice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NoticeWrite(){
		const navigate = useNavigate();

		const [boardFormData, setBoardFormData] = useState({
			btitle: '', bcontent:''
		});

		const handleChange = (e) => {
			const {name, value} = e.target;
			setBoardFormData({...boardFormData,[name]:value});
		}
		console.log(boardFormData);

		//등록완료
		const handleWriteSubmit = () =>{
			const url = 'http://127.0.0.1:8000/inquiry/write'
			axios({
				method: 'post',
				url: url,
				data: boardFormData
			})
			.then((res)=>{
				if(res.data.cnt === 1){
					 navigate('/inquiry')
					// alert('등록완료!')
				}
			})
			.catch(error => console.log(error));
		}  
		

		//다시쓰기
		const handleWriteReset = () => {
			setBoardFormData({btitle: '', bcontent:''})
		}

		//리스트로 이동
		const handleNavigate = () => {
			navigate('/inquiry')
		}

		return (
		<div className='content'>
				<LocationNotice />
				<SubTitleNotice />
				<table className='notice-table'>
						<tbody>		
							<tr>					
								<th scope='row'>제목</th>
								<td>
									<input type='text' name='btitle' value={boardFormData.btitle}  onChange={handleChange}/>
								</td>
							</tr>	
							<tr>
								<th scope='row'>내용</th>
								<td>
									<textarea name='bcontent' value={boardFormData.bcontent} onChange={handleChange}/>
								</td>
							</tr>	
						</tbody>
				</table>
				<div style={{textAlign:'center'}}>
					<button type='button' onClick={handleWriteSubmit}>등록완료</button>
					<button type='button' onClick={handleWriteReset}>다시쓰기</button>
					<button type='button' onClick={handleNavigate}>리스트</button>
				</div>
				
		</div>
	);
}