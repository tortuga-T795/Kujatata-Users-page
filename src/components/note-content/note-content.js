import React from 'react';
import './note-content.css';

const noteContent = ({add, complete, text, important, done} ) => {
    const style = (important ? 'important' : '') + (done ? ' done' : '');
    return(
        <span>
            <h5  className={style}>{add}</h5>
            <h5 className={style}>{complete}</h5>
            <h4 className={style}>{text}</h4>
        </span>
    );
};

export default noteContent;