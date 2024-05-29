import React, { useEffect } from 'react';


export default function Filter({handleChange, selectList}){
	
		
		return (
		<div>
				<select className='filter' onChange={handleChange}>
					{
						selectList.map((item)=>(
							<option value={item.value} >{item.title}</option>
						))
					}
				</select>
		</div>
	);
}
