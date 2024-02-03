import '../assets/css/style.css';
import React from 'react';
import ProfilMenu from './ProfilMenu';

function HeaderProfil(props) {
    return (
        <header className='header2'>
            <div className='LeftTop'>
              <a href={props.link}><img src = {props.logo} alt = {props.description}/></a>
            </div>
            <div className='RightTop'>
                <ProfilMenu icon = {props.icon} pseudo = {props.pseudo} lien1 = {props.lien1} text1 = {props.text1} lien2 = {props.lien2} fonction = {props.fonction} text2 = {props.text2}/>
            </div>
        </header> 
    );
}

export default HeaderProfil;