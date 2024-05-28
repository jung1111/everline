import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Filter from './Filter';


export default function ListAll({eventList, handleChange, selectList}){

		return (
		<div className='count'>
				<span className="count-no">
					<span className='count-no-icon'><FontAwesomeIcon icon={faList} /></span>
					<span className='count-no-text'><span className='count-no-red'>{eventList.length}</span> 개의 상품</span>
				</span>
				<Filter eventList={eventList} handleChange={handleChange} selectList={selectList}/>
		</div>
	);
}