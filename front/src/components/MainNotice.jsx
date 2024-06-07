import React, { useEffect, useState } from 'react';
import "../css/board.css";
import { Link } from 'react-router-dom';


export default function MainNotice(){
		const [noticeData, setNoticeData] = useState([]);

		useEffect(()=>{
			fetch('data/event.json')
			.then(res => res.json())
			.then(result => setNoticeData(result))
			.catch(error => console.log(error))
		},[])

		const randomData = () =>{
			const random = [];
			const jsonData = [...noticeData];

			for(let i = 0; i < 3; i++ ){
				const randeomIndex = Math.floor(Math.random * jsonData.length);
				const randeomData = jsonData.splice(randeomIndex,1)[0];
				random.push(randeomData)
				// setNoticeData(random)

			}

			return randomData
		}


		return (
		<>
			<h1 className='MainNotice-title'>NEWS & <span className='MainNotice-title-red'>NOTICE</span><span className='moreBtn'>버튼</span></h1>
			<ul className='MainNotice-list'>
			{
				noticeData.map((item)=>(
					<li>
					<div className='MainNotice-link'>						
						<Link to={'/'}>{item.title}</Link>
						<span>{item.date}</span>
					</div>				
					<i className='MainNotice-icon'/>
				</li>

				))
			}
			</ul>
		</>
	);
}