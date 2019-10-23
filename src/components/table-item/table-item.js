import React from 'react';
import noteContent from "../note-content";
import './table-item.css'

const tableItem = (element, ind, onDeleteItem, onChangeImportant, onChangeDone) => {
    return(
        <span className={"d-flex"}>
            {noteContent(element)}
            <button onClick={() => onDeleteItem(ind)}
                    className={"btn btn-outline-info"}
            >
                Delete
            </button>
            <button onClick={() => onChangeImportant(ind)}
                    className={"btn btn-outline-warning"}
            >
                Important
            </button>
            <button onClick={() => onChangeDone(ind)}
                    className={"btn btn-outline-danger"}
            >
                Done
            </button>
        </span>
    )
};

export default tableItem;