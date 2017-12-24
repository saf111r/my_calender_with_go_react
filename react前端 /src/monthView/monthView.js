import React, { Component } from 'react';
import Header from './header.js';
import Body from './body.js';
import { Grid} from 'react-bootstrap';
export default class MonthView extends Component {
    constructor(...props) {
        super(...props);
        const newDate = new Date();
        this.state = {
            year: newDate.getFullYear(),
            month: newDate.getMonth(),
            day: newDate.getDate(),
            isUpdateEvent: false,
            viewType: "monthView"
        };
    }
    // 月份变化
    handleMonthChange=({year, month}) => {
        this.setState({
            year: year,
            month: month,
            isUpdatedEvent: false
        })
    }
    render() {
        return (
            <div>                
                <Grid fluid={true}>
                    <Header {...this.state} handleMonthChange={this.handleMonthChange} handleViewChange={this.props.handleViewChange}/>
                    <Body {...this.state}/>
                </Grid>
            </div>
        )
    }
}