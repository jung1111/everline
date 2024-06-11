import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/board.css";
//paging navigation
import Pagination from 'rc-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-pagination/assets/index.css';
import Search from './Search';

export default function Table({noticeList, name, currentPage, totalCount, pageSize, handleChange, listPage }) {
	// const [userInput, setUserInput] = useState(''); // input 입력 데이터
	// const listData = [...noticeList]; // 기존 전체 데이터

	// const handleChange = (e) => {
	// 	let inputValue = e.target.value.toLowerCase();
	// 	setUserInput(inputValue);

	// 	// console.log('searchData->', searchData);
	// }

	// //필터로 데이터와 입력값이 같은지 확인하기
	// const searchFilter = listData.filter((item)=> item.title.toLowerCase().includes(userInput.toLowerCase()))



	// const handleSearch = () => {


	// }


	// const navigate = useNavigate();
	// const handleKeypress = (e) => {
	// 	if(e.key === "Enter"){
	// 		let inputValue = e.target.value.toLowerCase();
	// 		navigate(`q=${inputValue}`);
	// 	}

	// }



	const tableWidth = {
			width10: { width: '10%' },
			width20: { width: '20%' },
			width60: { width: '60%' }
	};

	return (
			<div className='Board'>
					<table className='Board-table'>
							<colgroup>
									<col style={tableWidth.width10} />
									<col style={tableWidth.width60} />
									<col style={tableWidth.width10} />
									<col style={tableWidth.width20} />
							</colgroup>
							<thead>
									<tr>
											<th>번호</th>
											<th>제목</th>
											<th>작성자</th>
											<th>날짜</th>
									</tr>
							</thead>
							<tbody>
									{listPage.map((item, index) => (
											<tr key={index}>
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
									))}
							</tbody>
					</table>
					<Pagination className='d-flex justify-content-center'
						current={currentPage} total={totalCount} pageSize={pageSize} onChange={handleChange}
							prevPageText={"<"} nextPageText={">"} />
					<Search />
			</div>
	);
}