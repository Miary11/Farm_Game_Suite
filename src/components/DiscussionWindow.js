import '../assets/css/style.css';
import React from 'react';

function DiscussionWindow(props) {
    return (
        <div className='discu'>
            <h1>{props.titre}</h1>
            <p className='desc3'>Ici vous pouvez intéragir, échanger et négocier avec les autres utilisateurs.<br/>Vos discussions sont visibles ci-dessous.</p>
            <main className='window'>
                {props.children}
            </main>
        </div>
    );
}

export default DiscussionWindow;