import React, { useEffect, useState } from 'react';
import "../css/board.css";
import { Link } from 'react-router-dom';


export default function MainNotice({notice_title1, notice_title2}){
		const [noticeData, setNoticeData] = useState([]);

		useEffect(()=>{
			fetch('data/notice.json')
			.then(res => res.json())
			.then(result => setNoticeData(result))
			.catch(error => console.log(error))
		},[])

		return (
			<div className='MainNotice'>
				<h1 className='MainNotice-title'>{notice_title1}
					<span className='MainNotice-title-red'>{notice_title2}</span>
					<Link to={`/notice`}>
						<span className='moreBtn'>버튼</span>
					</Link>
				</h1>
				<ul className='MainNotice-list'>
					{
						noticeData.slice(0, 3).map((item, index) => (
                <li key={index}>
                    <div className='MainNotice-link'>
                        <Link to={`/${notice_title2}/${item.id}`}>{item.title}</Link>
                        <span>{item.date}</span>
                    </div>
                    <i className='MainNotice-icon' />
                </li>
           	 ))
					}
				</ul>
			</div>
	);
}
