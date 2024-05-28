import React from 'react';
import { Link } from 'react-router-dom';


export default function SubTitle(){

		return (
		<div className='sub-title'>
				<h1>CUSTOMER</h1>
				<ul className='sub-title-tab'>
					<li>
						<Link to="/notice">공지사항</Link>
					</li>
					<li>
						<Link to="/inquiry">1:1문의</Link>
					</li>
					<li>
						<Link to="/faq">FAQ</Link>
					</li>
				</ul>

		</div>
	);
}