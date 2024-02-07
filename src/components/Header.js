import '../assets/css/style.css';
import React from 'react';
import Button from './Button';

function Header(props) {
    return (
        <header className='header3'>
            <div className='LeftTop'>
              <a href={props.link}><img src = {props.logo} alt = {props.description}/></a>
            </div>
            <div className='RightTop'>
                <Button link = {props.lien} text = {props.text2}/>
            </div>
        </header> 
    );
}

export default Header;