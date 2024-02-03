import '../assets/css/style.css';
import React from 'react';

function SideCardContainer(props) {
    return (
        <div className='caroussel' id='c2'>
            {props.children}
        </div> 
    );
}

export default SideCardContainer;