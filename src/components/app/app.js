import React, { Component } from 'react';
import usersTable from '../users-table';
import AddPanel from '../add-panel';
import './app.css';
import { connect } from 'react-redux';
import { replaceUser, addNote, editUsers, deleteNote, deleteUser } from "../util/users-util";
import { search, filter } from "../util/filter-util";
import base from '../config';

class App extends Component {

    onAddUser = (event) => {
        event.preventDefault();
        if(this.name.value.split('').some(el => el !== ' ') && this.name.value.length < 12) {
            this.props.addUser(this.name.value);
            this.name.value = ''
        }
    };

    onChangeUser = (event) => {
        this.note.value = '';
        this.props.changeUser(event.target.value);
    };

    onDeleteUser = () => {
        this.note.value = '';
        this.props.deleteUser()
    };

    onAddNote = (text, complete) => {
        if(this.props.users[this.props.selectedUser] === undefined)
            return;
        this.props.addNote(text, complete);
    };

    onChangeImportant = (id) => this.props.changeImportant(id);

    onChangeDone = (id) => this.props.changeDone(id);

    onDeleteNote = (id) => {this.props.deleteNote(id)};

    onSearchNotes = ()  =>  this.props.searchNotes(this.note.value);

    onFilterNotes = (filter) => this.props.filterNotes(filter);

    componentDidMount() {
        base.fetch('page', {
        }).then(data => {
            this.props.fillData(data);
        })
    }

    componentDidUpdate() {
        const data = {
            users: this.props.users,
            selectedUser: this.props.selectedUser,
            maxID: this.props.maxID,
        };
        base.remove('page');
        base.post('page', {data});
    }

    render() {
        const newUser = filter(search(this.props.users[this.props.selectedUser], this.props.string), this.props.filter);
        return(
            <div>
                <h1>User Notes</h1>
                <div className="d-flex type-s">
                    <form onSubmit={this.onAddUser} className="d-flex type-s">
                        {replaceUser(this.props.users, this.onChangeUser)}
                        <input className='form-control' type={'text'} ref={input => this.name = input} placeholder={"Add user"}/>
                        <button className={"btn btn-outline-success"}>Add user</button>
                    </form>
                    <div className="type-s">
                        <button onClick={this.onDeleteUser} className={"btn btn-outline-danger button"}>Delete user</button>
                    </div>
                </div>
                <div className="d-flex type-s">
                    <input className='form-control' type={'text'} ref={input => this.note = input} placeholder={"Find note"}/>
                    <button onClick={this.onSearchNotes} className={"btn btn-outline-primary"}>Find Note</button>
                    <button onClick={()=>this.onFilterNotes('all')} className={"btn btn-outline-primary"}>All notes</button>
                    <button onClick={()=>this.onFilterNotes('important')} className={"btn btn-outline-primary"}>Important</button>
                    <button onClick={()=>this.onFilterNotes('done')} className={"btn btn-outline-primary"}>All completed</button>
                    <button onClick={()=>this.onFilterNotes('active')} className={"btn btn-outline-primary"}>All active</button>
                </div>
                {usersTable(newUser,
                    this.onDeleteNote,
                    this.onChangeImportant,
                    this.onChangeDone
                )}
                <AddPanel onAddNote={this.onAddNote}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        users: state.usersChanger.users,
        selectedUser: state.usersChanger.selectedUser,
        maxID: state.usersChanger.maxID,
        string: state.notesFilter.string,
        filter: state.notesFilter.filter
    }),
    dispatch => ({
        addUser(name) {
            const value = {
                id: this.maxID,
                wasNotes: 0,
                name,
                notes: []
            };
            dispatch({type: 'ADD-USER', value});
        },
        changeUser(id) {
            dispatch({type: 'SEARCH-NOTES', value: ''});
            dispatch({type: 'FILTER-NOTES', value: 'all'});
            dispatch({type: 'CHANGE-USER', value: id});
        },
        changeImportant(id) {
            dispatch({type: 'CHANGE-USERS', value: editUsers(this.users, this.selectedUser, id, 'important')})
        },
        changeDone(id) {
            dispatch({type: 'CHANGE-USERS', value: editUsers(this.users, this.selectedUser, id, 'done')})
        },
        addNote(text, complete) {
            dispatch({type: 'CHANGE-USERS', value: addNote(this.users, this.selectedUser, text, complete)})
        },
        deleteUser() {
            dispatch({type: 'SEARCH-NOTES', value: ''});
            dispatch({type: 'FILTER-NOTES', value: 'all'});
            dispatch({type: 'DELETE-USER', value: deleteUser(this.users, this.selectedUser)})
        },
        deleteNote(id) {
            dispatch({type: 'CHANGE-USERS', value: deleteNote(this.users, this.selectedUser, id)})
        },
        searchNotes(string) {
            dispatch({type: 'SEARCH-NOTES', value: string})
        },
        filterNotes(filter) {
            dispatch({type: 'FILTER-NOTES', value: filter})
        },
        fillData(data) {
            dispatch({type: 'FILL-DATA', value: data})
        }
    })
)(App);