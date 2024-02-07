import '../assets/css/style.css';
import React from 'react';

function UserMessage(props) {
    const handleClick = () => {
        props.onClick(props.text);
    };

    return (
        <article className='userMessage' onClick={handleClick}>
            <div className='leftMid'>
                <i className={props.icon}></i>
            </div>
            <div className='rightMid'>
                <h3>{props.text}</h3>
            </div>
        </article>
    );
}

export default UserMessage;