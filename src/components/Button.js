import '../assets/css/style.css';
import React from 'react';

function Button(props) {
    return (
        <a href = {props.link} onClick={props.fonction}>
            <button>{props.text}</button>
        </a>
    );
}

export default Button;