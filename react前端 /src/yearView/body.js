import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import OneMonth from '../common/oneMonth.js';
export default class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: "yearView"
        };
    }
    // 空函数,用于填充
    selectDay=() => {

    }
    render() {
        const months = [];
        // 先生成12个月的数据
        for (let i = 0; i < 12; i++) {
            months[i] = (
                <Col xs={12} sm={6} md={6} lg={3} key={i}>
                    <OneMonth year={this.props.year} month={i} day={this.props.day} selectDay={this.selectDay}/>
                </Col>);
        }
        return (
            <Grid fluid={true}>
                {months}
            </Grid>

        );
    }

}