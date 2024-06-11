import React from 'react';
import { useSearchParams } from "react-router-dom";



export default function Search(){


		return (
		<div className='search'>
			<input type='text' placeholder='검색어를 입력해주세요'  />
			<button type='button' className='search-btn'>검색</button>
		</div>
	);
}