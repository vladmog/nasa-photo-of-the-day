import React from 'react';
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
        let padMonth = this.state.month.padStart(2, '0')
        let padDay = this.state.day.padStart(2, '0')
        let padYear = this.state.year.padStart(4, '0')

        this.props.setFetchDate(
            {month: padMonth, 
            day: padDay, 
            year: padYear,
            dateGiven: true})
    }

    render(){
        return (
            <div>
                <form onSubmit = {this.submitDate}>
                    <input 
                        type = "number"
                        name = "month"
                        placeholder = "MM"
                        value = {this.state.month}
                        onChange = {this.changeHandler}
                    />
                    <input 
                        type = "number"
                        name = "day"
                        placeholder = "DD"
                        value = {this.state.day}
                        onChange = {this.changeHandler}
                    />
                    <input 
                        type = "number"
                        name = "year"
                        placeholder = "YYYY"
                        value = {this.state.year}
                        onChange = {this.changeHandler}
                    />
                    <button onClick = {this.submitDate}>SUBMIT</button>
                </form>
            </div>
        )
    }
}

export default FetchDate;