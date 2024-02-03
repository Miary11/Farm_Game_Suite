import '../assets/css/style.css';
import React from 'react';

function Card(props) {
    return (
        <div className='card'>
            <img src={props.pic} alt={props.desc}/>
        </div> 
    );
}

export default Card;