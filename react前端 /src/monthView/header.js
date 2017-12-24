import React, { Component } from 'react';
import getNewDate from '../common/getNewDate.js';
import { Grid, Row, Col, Image, DropdownButton, MenuItem, Button, ButtonGroup } from 'react-bootstrap';
import log from '../img/log.png';

const top_style = {
    height: "58px",
    background: "#fff",
    padding: "3px",
    borderBottom: "solid 1px #000",

};
const item_style = {
    paddingTop: "10px"
};
export default class Header extends Component {
    handleClick=(type) => {
        let click = new getNewDate({...this.props});
        let newDate;
        switch (type) {
        case "left":
            newDate = click.handleLeftClick();
            break;
        case "right":
            newDate = click.handleRightClick();
            break;
        case "tody":
            newDate = click.handleTodyClick();
            break;
        default:

        }
        this.props.handleMonthChange(newDate);
    }
    render() {
        const showYear = this.props.year + "年" + (this.props.month + 1) + "月";

        return (
            <div style={top_style}>
                <Grid fluid={true}>
                    <Row >
                        <Col xsHidden sm={2} md={2} lg={2} style={item_style}><Image src={log} responsive={true} rounded></Image></Col>
                        <Col xs={9}  sm={7} md={7} lg={7} style={item_style}>
                            <ButtonGroup>
                                <Button onClick={this.handleClick.bind(this, "left")}>上一页</Button>
                                <Button onClick={this.handleClick.bind(this, "tody")}>今天</Button>
                                <Button onClick={this.handleClick.bind(this, "right")}>下一页</Button>
                                <Button>{showYear}</Button>
                            </ButtonGroup>
                        </Col>
                        <Col xs={2} md={2} lg={2} style={item_style}>
                            <DropdownButton title="视图选择" id="changeView">                           
                                <MenuItem eventkey="2" onClick={this.props.handleViewChange.bind(this, "yearView")}>年</MenuItem>
                                <MenuItem eventkey="3" onClick={this.props.handleViewChange.bind(this, "monthView")}>月</MenuItem>
                                <MenuItem eventkey="4" onClick={this.props.handleViewChange.bind(this, "dayView")}>日</MenuItem>                       
                            </DropdownButton>                        
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


