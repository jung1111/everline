import React, { useEffect, useState } from 'react';
import "../css/board.css";
import { Link, useParams } from 'react-router-dom';
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import BoardButton from '../components/BoardButton';
import axios from 'axios';

export default function EventListDetail(){
	const [eventDetail, setEventDetail] = useState([]);
	const {id} = useParams();

	useEffect(()=> {
		axios.get('http://localhost:3000/data/event.json')
		.then((res)=>{
			setEventDetail(res.data)
			const jsonData = res.data.find((res) => res.id === id);
			setEventDetail(jsonData);
		})

		.catch(erorr => console.log(erorr))
	},[id])

	 console.log('data', eventDetail);

		return (
		<div className='content'>
				<Location depth1="EVENT" depth2="이벤트목록"/>
			<SubTitle title="EVENT"/>
			<ul className='sub-menu'>
				<SubMenu menu="이벤트목록" src="/eventlist"/>
				<SubMenu menu="당첨자발표" src="/winner"/>
			</ul>
			<div className='Board-detail'>	
				<h1 className="Board-detail-title">{eventDetail.title}</h1>
				<ul className='Board-detail-view'>
					<li>
						<span className='Board-detail-date'>{eventDetail.date}</span>
					</li>
				</ul>
				<div className='Board-detail-cont'>
						<img src={eventDetail.img} alt={eventDetail.title} />
				</div>
				<Link to="/eventlist">
					<div className='BoardButton'>
						<BoardButton button="목록"/>
					</div>
				</Link>
			</div> 			
		</div>
	);
}