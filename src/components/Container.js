import '../assets/css/style.css';
import React from 'react';

function Container(props) {
    return (
        <div className='formContainer' id={props.id}>
            {props.children}
        </div> 
    );
}

export default Container;