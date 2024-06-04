import React, { useState } from 'react';
import "../css/board.css";



export default function FaqToggle({no, cartegory, title, icon}){
		// const [isClick, setIsClick] = useState(false);

		return (
		<>
			<tr>
				<td>{no}</td>
				<td>{cartegory}</td>
				<td>{title}</td>
				<td>{icon}</td>
			</tr>
		</>
	);
}