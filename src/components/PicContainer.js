import '../assets/css/style.css';
import React from 'react';

function PicContainer(props) {
    return (
        <div className='picContainer'>
            <img src = {props.image} alt={props.description}/>
        </div> 
    );
}

export default PicContainer;