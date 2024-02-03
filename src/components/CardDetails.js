import '../assets/css/style.css';
import React from 'react';

function CardDetails(props) {
    return (
        <div className='card2'>
            <div className='CardTop'>
                <img src={props.pic} alt={props.description}/>
            </div>
            <div className='CardBottom'>
                <p className='First'>{props.text1}</p>
                <p>{props.text2}</p>
            </div>
        </div> 
    );
}

export default CardDetails;