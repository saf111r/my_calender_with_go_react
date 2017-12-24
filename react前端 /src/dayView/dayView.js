import React, { Component } from 'react';
import Header from './header.js';
import Body from './body.js';
import { Grid} from 'react-bootstrap';
export default class DayView extends Component {
    constructor(...props) {
        super(...props);
        const newDate = new Date();
        this.state = {
            year: newDate.getFullYear(),
            month: newDate.getMonth(),
            day: newDate.getDate(),
            viewType: "dayView"
        };
    }
    handleDayChange=({year, month, day}) => {
        this.setState({
            year: year,
            month: month,
            day: day
        })
    }
    render() {

        return (
            <div>                
                <Grid fluid={true}>
                    <Header {...this.state} handleDayChange={this.handleDayChange} handleViewChange={this.props.handleViewChange}/>
                    <Body {...this.state}/>
                </Grid>
            </div>
        )
    }
}

