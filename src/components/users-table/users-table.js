import React from 'react';
import tableItem from '../table-item';
import './users-table.css'
import tableItemPanel from "../table-items-panel";

const usersTable = (user, onDeleteItem, onChangeImportant, onChangeDone) => {
    if (user === undefined || user.notes === undefined)
        return tableItemPanel();
    const items = user.notes.map((note, ind) => {
        return(
            <li key={note.id}>
                {tableItem(note, ind, onDeleteItem, onChangeImportant, onChangeDone)}
            </li>
        );
    });
    return (
        <span>
            {tableItemPanel()}
            <ul>
                {items}
            </ul>
        </span>
    );
};

export default usersTable;