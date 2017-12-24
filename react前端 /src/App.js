import React, { Component } from 'react';
import YearView from './yearView/yearView.js';
import MonthView from './monthView/monthView.js';
import DayView from './dayView/dayView.js';
//渲染页面上面导航部分和下面主体部分
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // yearView(年) ,monthView(月),dayView(日), scheduleView(日程表),默认为年视图
            viewType: "yearView"
        };
    }
    handleViewChange=(viewType) => {
        this.setState({
            viewType: viewType
        });
    }
    render() {
        switch (this.state.viewType) {
        case "yearView":
            return (<YearView {...this.props} handleViewChange={this.handleViewChange} key="yearView"/> );

        case "monthView":
            return (<MonthView {...this.props} handleViewChange={this.handleViewChange} key="monthView"/>);

        case "dayView":
            return (<DayView {...this.props} handleViewChange={this.handleViewChange} key="dayView"/>);

        default:
            return ("404 not found!");
        }
    }
}
