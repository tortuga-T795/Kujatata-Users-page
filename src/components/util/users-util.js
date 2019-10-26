import React from "react";
import './util.css'
import { dateFormatGeneration } from "./time-util";

export const editUsers = (users, selected, id, propName) => {
    const newUsers = [...users];
    newUsers[selected].notes[id][propName] = !newUsers[selected].notes[id][propName];
    return newUsers;
};

export const replaceUser = (users, onChangeUser) => {
    const list = users.map((el, ind) => {
        return <option value={ind} key={ind}>{el.name}</option>
    });
    return (
        <select className="form-control" onChange={(event)=>onChangeUser(event)}>
            {list}
        </select>
    )
};

export const createNode = (text, complete, id) => {
    return {
        id: id,
        text: text,
        important: false,
        done: false,
        add: dateFormatGeneration(),
        complete:  complete
    }
};

export const addNote = (users, selected, text, complete) => {
    const editedUsers = [...users];
    const newNote = createNode(text, complete, editedUsers[selected].wasNotes);
    if(editedUsers[selected].notes === undefined)
        editedUsers[selected].notes = [];
    editedUsers[selected].notes = [...users[selected].notes, newNote];
    editedUsers[selected].wasNotes++;
    return editedUsers;
};

export const deleteUser = (users, selected) => {
    return [...users.slice(0, selected), ...users.slice(selected + 1)]
};

export const deleteNote = (users, selected, id) => {
    const editedUsers = [...users];
    editedUsers[selected].notes = [...users[selected].notes.slice(0, id), ...users[selected].notes.slice(id + 1)];
    return editedUsers;
};