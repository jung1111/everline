import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons"; 
import { faCalendar } from "@fortawesome/free-regular-svg-icons"; 
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import axios from 'axios';

export default function WinnerNoticeDetail(){
		const [winnerList, setWinnerList] = useState([]);
		const {id} = useParams();

		useEffect(()=> {
			axios.get('http://localhost:3000/data/event.json')
				.then((res)=> {
					setWinnerList(res.data);
					const result = res.data.find((res)=> res.id === id);
					setWinnerList(result);
				})
				.catch(error => console.log(error));
		},[id])

		console.log(winnerList);


		return (
		<div className='content'>
			<Location />
			<SubTitle />
			<div className='notice-detail'>
				<h1 className="notice-detail-title">{winnerList.title}</h1>
				<ul className='notice-detail-view'>
					<li>
						<span className='notice-detail-icon'><FontAwesomeIcon icon={faUser} /></span>
						<strong className='notice-detail-author'>{winnerList.author}</strong>
					</li>
					<li>
						<span className='notice-detail-icon'><FontAwesomeIcon icon={faCalendar} /></span>
						<span className='notice-detail-date'>{winnerList.date}</span>
					</li>
				</ul>
				<div className='notice-detail-cont'>
						<p>1111111111<br/>


ARTMS - 정규1집 [Dall] 1:1 영상통화 팬사인회 이벤트 당첨자 명단을 발표하오니, 첨부된 명단과 아래 주의사항을 확인하신 후 참여해주시기 바랍니다. <br/>

 

* 당첨자 분들께 주문 시 입력하신 이메일로 이벤트 관련 안내가 발송될 예정입니다. 안내사항을 꼭 확인하시고 즉시 회신해주시기 바랍니다.<br/>

* 당첨자 안내 공지와 메일을 확인하지 않음으로 발생하는 불이익은 책임지지 않습니다.<br/>

* 이벤트 관련 개별 안내의 경우 NOTICE 게시판의 당첨자 발표 이후 메일 발송까지 수일 소요될 수 있는 점 양해부탁드립니다.<br/>
						</p>
				</div>
				<Link to="/winner">
					<button type='button'>목록</button>
				</Link>
			</div> 			
		</div>
	);
}