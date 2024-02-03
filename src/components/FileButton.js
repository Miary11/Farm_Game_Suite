import '../assets/css/style.css';
import React from 'react';

function FileButton(props) {
    return (
        <div className='fileButton'>
            <label className='customButton'>+</label>
            <input type='file' name={props.nom}/>
        </div>
    );
}

export default FileButton;