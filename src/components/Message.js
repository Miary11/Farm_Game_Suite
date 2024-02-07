import '../assets/css/style.css';
import React from 'react';

function Message(props) {
    return (
        <div className={props.classe}>
            <p className='message-text'>{props.text}</p>
            <span className='message-time'>{props.text2}</span>
        </div>
    );
}

export default Message;