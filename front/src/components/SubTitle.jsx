import React from 'react';
import { Link } from 'react-router-dom';


export default function SubTitle(){
		//클릭이벤트 - on일때 color:red로 변경하기 

		return (
		<div className='sub-title'>
				<h1>EVENT</h1>
				<ul className='sub-title-tab'>
					<li>
						<Link to="/eventlist">이벤트 목록</Link>
					</li>
					<li>
						<Link to="/winner">당첨자 발표</Link>
					</li>
				</ul>

		</div>
	);
}