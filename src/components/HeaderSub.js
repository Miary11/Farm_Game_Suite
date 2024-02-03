import '../assets/css/style.css';
import React from 'react';

function HeaderSub(props) {
    return (
        <header>
            <div className='LeftTop'>
              <img src = {props.logo} alt = {props.description}/>
            </div>
        </header> 
    );
}

export default HeaderSub;