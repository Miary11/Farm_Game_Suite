import '../assets/css/style.css';
import React from 'react';

function RightSide(props) {
    return (
        <section className='right'>
            <header className='rightTop'>
                <div className="leftMid">
					<i className={props.icon}></i>
				</div>
				<div className="rightMid">
					<h3>{props.text}</h3>
				</div>
            </header>
            {props.children}
        </section>
    );
}

export default RightSide;