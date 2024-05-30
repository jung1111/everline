import React from 'react';
import { Link } from 'react-router-dom';


export default function SubTitle({title}){
		//클릭이벤트 - on일때 color:red로 변경하기 

		return (
		<div className='sub-title'>
				<h2>{title}</h2>
		</div>
	);
}