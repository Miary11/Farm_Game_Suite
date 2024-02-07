import '../assets/css/style.css';
import React from 'react';

function LeftSide(props) {
    return (
        <section className='left'>
            <header className='leftTop'>
                <h1><i className={props.icon}></i>{props.text}</h1>
            </header>
            {props.children}
        </section>
    );
}

export default LeftSide;