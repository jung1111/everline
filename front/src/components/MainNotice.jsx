import React, { useEffect, useState } from 'react';
import "../css/board.css";
import { Link } from 'react-router-dom';


export default function MainNotice({notice_title1, notice_title2}){
		const [noticeData, setNoticeData] = useState([]);

		useEffect(()=>{
			fetch('data/event.json')
			.then(res => res.json())
			.then(result => setNoticeData(result))
			.catch(error => console.log(error))
		},[])

		// const randomData = () =>{
		// 	const random = [];
		// 	const jsonData = [...noticeData];

		// 	for(let i = 0; i < 3; i++ ){
		// 		const randeomIndex = Math.floor(Math.random * jsonData.length);
		// 		const data = jsonData.splice(randeomIndex,1)[0];
		// 		random.push(data)
		// 		setNoticeData(random)
		// 	}
		// 	return random
		// }

		// console.log('dd->',noticeData);

		return (
			<div className='MainNotice'>
				<h1 className='MainNotice-title'>{notice_title1} <span className='MainNotice-title-red'>{notice_title2}</span><span className='moreBtn'>버튼</span></h1>
				<ul className='MainNotice-list'>
					{
						noticeData.map((item, index) =>(
							<li key={index}>
							<div className='MainNotice-link'>						
								<Link to={`/notice`}>{item.title}</Link>
								<span>{item.date}</span>
							</div>				
							<i className='MainNotice-icon'/>
						</li>
						))
					}
				</ul>
			</div>
	);
}