import React, { useEffect, useState } from 'react';
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import ListAll from '../components/ListAll';
import axios from 'axios';


export default function EventList(){
		const selectList = [
			{"value": "popularity", "title": "이름순"},
			{"value": "highpricestitle","title" : "높은가격순"},
			{"value": "lospricestitle", "title" : "낮은가격순"}
			];
		const [eventList, setEventList] = useState([]);//데이터

		useEffect(() => {
			axios
				.get('/data/product.json')
				.then(res => setEventList(res.data))
				.catch(error => console.log(error))
		}, [])


		//리스트 2개씩 출력
		const rows = [];
		for(let i = 0; i < eventList.length; i += 2) {
			rows.push(eventList.slice(i,i+2))
		}
		
		// 필터
		const handleChange = (e) => {
			let clickList = e.target.value;
			let event = [...eventList];

			if(clickList === selectList[0].value){
				let popularity = event;
				//popularity.sort((a, b) => b.title.localeCompare(a.title));  이건 내림차순
				popularity.sort((a, b)=> a.title.toUpperCase() < b.title.toUpperCase()?-1:1);  
				setEventList(popularity);
				console.log('필터링테스트', popularity);
			}else if(clickList === selectList[1].value){
				let highpricestitle = event;
				highpricestitle.sort((a, b)=> b.price - a.price);
				setEventList(highpricestitle);
			}
			else if(clickList === selectList[2].value){
				let lospricestitle = event;
				lospricestitle.sort((a, b)=> a.price - b.price);
				setEventList(lospricestitle);
			}
		}

		return (
		<div className='content'>
			<Location depth1="EVENT" depth2="이벤트목록"/>
			<SubTitle title="EVENT"/>
			<ul className='sub-menu'>
				<SubMenu menu="이벤트목록" src="/eventlist"/>
				<SubMenu menu="당첨자발표" src="/winner"/>
			</ul>
			<ListAll eventList={eventList} handleChange={handleChange} selectList={selectList} />

			{/* 목록 컴포넌트 넣을예정 */}
			{
				rows.map((row, index)=>(
					<ul className='EventList' key={index}>
					{
						row.map((list)=>(
							<li>
								<div className='EventList-img'>
									<img src={list.image} />
								</div>
								<h2 className='EventList-title'>{list.title}</h2>
								<p>{list.price}</p>
							</li>
						))
					}					
			</ul>
				))
			}
			
		</div>
	);
}

