import React, { useState } from 'react';
import "../css/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";


export default function FaqToggle({faqData}){
	const [isToggle, setIsToggle] = useState({});


  const handleToggle = id => {
    setIsToggle(toggle => ({
      ...toggle,
      [id]: !toggle[id]
    }));
  };
   		
		return (
		<>
			{faqData.map((obj, index) => (
				<>
        <tr key={index}>
          {obj ? (
						<>
							<td>{obj.no}</td>
							<td>{obj.cartegory}</td>
            	<td className='title' onClick={() => handleToggle(obj.no)}>{obj.title}</td>
							<td><FontAwesomeIcon className='icon' icon={isToggle[obj.no] ? faMinus : faPlus}  /></td>  																												
						</>
          ) : null}              
        </tr>
				<tr>
				{isToggle[obj.no] ?
					<td className='content' colSpan={4}>
						<div className="line-break" >
							{obj.cont.split('\n').map((line, i) => (
								<p key={i}>{line}</p>
							))}
          	</div>     			
					</td> : null}
				</tr>
				</>
      ))}
		</>
	);
}

