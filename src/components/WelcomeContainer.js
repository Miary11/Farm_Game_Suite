import '../assets/css/style.css';
import React from 'react';

function WelcomeContainer(props) {
    return (
        <div className='welcomeContainer'>
            <h1>{props.text}</h1>
            {props.children}
        </div> 
    );
}

export default WelcomeContainer;