import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Location(){
		return (
		<div className='location'>
				<ul className='location-link'>
					<li>
						<Link to="/" className='location-link-home'><FontAwesomeIcon icon={faHouse} /></Link>	
						<span className='location-link-arrow'><FontAwesomeIcon icon={faChevronRight} /></span>
					</li>
					<li>
						<span className='location-link-text'>CUSTOMER</span>
						<span className='location-link-arrow'><FontAwesomeIcon icon={faChevronRight} /></span>
					</li>
					<li>
						<span className='location-link-text'>공지사항</span>
						</li>
				</ul>
		</div>
	);
}