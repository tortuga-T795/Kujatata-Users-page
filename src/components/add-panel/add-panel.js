import React, { Component } from "react";
import './add-panel.css';
import { toDateFormat } from '../util/time-util'

class AddPanel extends Component {

    state = {
        text: "",
        time: "",
        date: ""
    };

    onTimeChange = (event) => {
        this.setState({
            time: event.target.value
        })
    };

    onDateChange = (event) => {
        this.setState({
            date: event.target.value
        })
    };

    onTextChange = (event) => {
        this.setState({
            text: event.target.value
        })
    };

    addForm = (complete)  => {
        if(this.state.text.split('').some(el => el !== ' ') && this.state.text.length < 19) {
            this.props.onAddNote(this.state.text, complete);
            this.setState({
                text: "",
                time: "",
                date: ""
            })
        }
    };

    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.time === ''&&this.state.date === '') {
            const complete = "no complete date";
            this.addForm(complete)
        } else if(this.state.time !== ''&&this.state.date !== '') {
            const complete = toDateFormat(this.state.date) + ' ' + this.state.time;
            this.addForm(complete)
        }
    };

    render() {
        return(
            <form className="d-flex pudding"
                  onSubmit={this.onSubmit}
            >
                <input type={'date'}
                       onChange={this.onDateChange}
                       value={this.state.date}
                       className='form-control'
                />
                <input type={'time'}
                       onChange={this.onTimeChange}
                       value={this.state.time}
                       className='form-control'
                />
                <input type={'text'}
                       placeholder={'note'}
                       onChange={this.onTextChange}
                       value={this.state.text}
                       className='form-control'
                />
                <button className={"btn btn-outline-success"}>
                    Add note
                </button>
            </form>
        )
    };
}

export default AddPanel;