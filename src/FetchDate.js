import React, {useState} from 'react';
import {Component} from 'react';

class FetchDate extends Component {
    state = {
        month: "",
        day: "",
        year: "",
    }
  
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitDate = e => {
        e.preventDefault();
    }

    render(){
        return (
            <div>
                <form>
                    <input 
                        type = "number"
                        placeholder = "MM"
                        value = {this.state.month}
                        onChange = {this.changeHandler}
                    />
                    <input 
                        type = "number"
                        placeholder = "DD"
                        value = {this.state.month}
                        onChange = {this.changeHandler}
                    />
                    <input 
                        type = "number"
                        placeholder = "YYYY"
                        value = {this.state.month}
                        onChange = {this.changeHandler}
                    />
                </form>
            </div>
        )
    }
}

export default FetchDate;