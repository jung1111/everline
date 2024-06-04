import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// paging navigation
import Pagination from 'rc-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-pagination/assets/index.css';


export default function Table({noticeList, name}){

	
		return (
		<div className='Board'>
			<table className='Board-table'>
				<thead>
					<tr>
						<th>번호</th>
						<th>제목</th>
						<th>작성자</th>
						<th>날짜</th>
					</tr>
				</thead>
				<tbody>
					{
						noticeList.map((item)=> (
						<tr key={item.id}>
							<td className="Board-list-no">{item.no}</td>
							<td className="Board-list-subject">							
								<Link to={`/${name}/${item.id}`}>
									<span>{item.title}</span>
									<img src={item.srcImg} alt={item.altImg} />
									<img src={item.srcNew} alt={item.altNew} />
								</Link>
							</td>
							<td className="Board-list-name">{item.author}</td>
							<td className="Board-list-date">{item.date}</td>					
						</tr>

						))
					}						
				</tbody>
			</table>			
			
		</div>
	);
}