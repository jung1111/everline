import React from 'react';
import "../css/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export default function MainNotice(){
		return (
		<>
			<h1 className='MainNotice-title'>NEWS & <span className='MainNotice-title-red'>NOTICE</span><span className='moreBtn'>버튼</span></h1>
			<ul className='MainNotice-list'>
				<li>
					
					<h3>타이틀</h3>
					<span>날짜</span>
					<FontAwesomeIcon icon={faChevronRight} />
				</li>
			</ul>
		</>
	);
}