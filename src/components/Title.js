import '../assets/css/style.css';
import React from 'react';

function Title(props) {
    return (
        <div className='Titre'>
            <h1>{props.titre}</h1>
            <p>{props.description}</p>
        </div>
    );
}

export default Title;