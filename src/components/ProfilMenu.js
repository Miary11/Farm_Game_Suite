import '../assets/css/style.css';
import Button from './Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilMenu(props) {
    const navigate = useNavigate();

    const handleDeconnexion = () => {
        props.lien2();

        navigate(props.link);
    };

    return (
        <section className='profilMenu'>
            <article>
                <div className='navLeft'>
                    <i className={props.icon}></i>
                </div>
                <div className='navRight'>
                    <p>{props.pseudo}</p>
                </div>
            </article>
            <nav>
                <p className='firstNav'><Button link = {props.lien1} text = {props.text1}/></p>
                <p><Button link = {props.lien2} text = {props.text2} fonction = {handleDeconnexion}/></p>
            </nav>
        </section>
    );
}

export default ProfilMenu;