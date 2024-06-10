import React, {useState, useEffect} from 'react';
import "../css/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import SubMenu from '../components/SubMenu';
import ToggleFaq from '../components/ToggleFaq';

export default function Faq(){
		const [faqData, setFaqData] = useState([]);

		useEffect(()=>{
			fetch('data/faq.json')
			.then(res => res.json())
			.then(result => setFaqData(result))
			.catch(error => console.log(error))
		},[])

		console.log('faq->', faqData);

		const tableWidth ={
			width10 : {width: '10%'},
			width20 : {width: '20%'},
		  width60 : {width: '60%'}
		}

		return (
		<div className='content'>
			<Location depth1="CUSTOMER" depth2="FAQ"/>
			<SubTitle title="CUSTOMER"/>
			<ul className='sub-menu'>
				<SubMenu menu="공지사항" src="/notice"/>
				<SubMenu menu="1:1문의" src="/inquiry"/>
				<SubMenu menu="FAQ"  src="/faq"/>
			</ul>
			<div className='count'>
				<span className="count-no">
					<span className='count-no-icon'><FontAwesomeIcon icon={faList} /></span>
					<span className='count-no-text'><span className='count-no-red'>{faqData.length}</span> 개의 게시물</span>
				</span>
			</div>

				<table className='Board-table faq'>
					<colgroup>
						<col style={tableWidth.width10} />
						<col style={tableWidth.width20} />
						<col style={tableWidth.width60} />
						<col style={tableWidth.width10} />
					</colgroup>
					<tbody>
						<ToggleFaq faqData={faqData}/>			
					</tbody>
				</table>
		</div>
	);
}