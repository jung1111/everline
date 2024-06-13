import React, { useEffect, useState } from 'react';
import "../css/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import ListAll from '../components/ListAll';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function EventList(){
		const selectList = [
			{"value": "popularity", "title": "이름순"},
			{"value": "highpricestitle","title" : "높은가격순"},
			{"value": "lospricestitle", "title" : "낮은가격순"}
			];
		const [eventList, setEventList] = useState([]);//데이터

		useEffect(() => {
			axios
				.get('data/event.json')
				.then(res => setEventList(res.data))
				.catch(error => console.log(error))
		}, [])


		//리스트 2개씩 출력
		const rows = [];
		for(let i = 0; i < eventList.length; i += 2) {
			rows.push(eventList.slice(i,i+2))
		}
		
		// 필터
		// const handleChange = (e) => {
		// 	let clickList = e.target.value;
		// 	let sortEvent = [...eventList];

		// 	if(clickList === selectList[0].value){
		// 		sortEvent.sort((a, b)=> a.title.localeCompare(b.title));  
		// 	}else if(clickList === selectList[1].value){
		// 		sortEvent.sort((a, b)=> b.price - a.price);
		// 	}
		// 	else if(clickList === selectList[2].value){
		// 		sortEvent.sort((a, b)=> a.price - b.price);
		// 	}
		// 	setEventList(sortEvent)
		// }

		return (
		<div className='content'>
			<Location depth1="EVENT" depth2="이벤트목록"/>
			<SubTitle title="EVENT"/>
			<ul className='sub-menu'>
				<SubMenu menu="이벤트목록" src="/eventlist"/>
				<SubMenu menu="당첨자발표" src="/winner"/>
			</ul>
			<div className='count'>
				<span className="count-no">
					<span className='count-no-icon'><FontAwesomeIcon icon={faList} /></span>
					<span className='count-no-text'><span className='count-no-red'>{eventList.length}</span> 개의 상품</span>
				</span>				
			</div>
			{/* <ListAll eventList={eventList} selectList={selectList} handleChange={handleChange} />  */}

			{
				rows.map((row, index)=>(
					<ul className='EventList' key={index}>
					{
						row.map((list)=>(
							<li>
								<Link to={`/eventdetail/${list.id}`} className='EventList-img'>
									<img src={list.titImg} />
								</Link>
								<h2 className='EventList-title'>{list.title}</h2>
								{/* <p>{list.price}</p> */}
							</li>
						))
					}					
			</ul>
				))
			}
			
		</div>
	);
}

