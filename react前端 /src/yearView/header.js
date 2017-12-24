import React, { Component } from 'react';
import getNewDate from '../common/getNewDate.js';
import { Grid, Row, Col, Image, DropdownButton, MenuItem, Button, ButtonGroup } from 'react-bootstrap';
import log from '../img/log.png';

// 顶部样式
const top_style = {
    height: "58px",
    background: "#fff",
    padding: "3px",
    borderBottom: "solid 1px #000",

};
// 顶部每个小块的样式
const item_style = {
    paddingTop: "10px"
};
// 相当于导航条,为了实现组件的单一功能原则,所以每种视图的导航条单独设置,
export default class Header extends Component {
    // 处理顶部上一页下一页的点击事件,用了ES6的扩展运算符...,babel编译
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
        this.props.handleYearChange(newDate);

    }
    render() {
        const showYear = this.props.year + "年";
        return (
            <div style={top_style}>
            <Grid fluid={true}>
                <Row  >
                    <Col xsHidden sm={2} md={2} lg={2} style={item_style}><Image src={log} responsive={true} rounded key={0}></Image></Col>
                    <Col xs={9}  sm={7} md={7} lg={7} style={item_style} key={1}>
                        <ButtonGroup>
                            <Button onClick={this.handleClick.bind(this, "left")}>上一页</Button>
                            <Button onClick={this.handleClick.bind(this, "tody")}>今天</Button>
                            <Button onClick={this.handleClick.bind(this, "right")}>下一页</Button>
                            <Button>{showYear}</Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={2} md={2} lg={2} style={item_style} key={2}>
                        <DropdownButton title="视图选择" id="changeView" >                           
                            <MenuItem eventkey="2" onClick={this.props.handleViewChange.bind(this, "yearView")} key={1}>年</MenuItem>
                            <MenuItem eventkey="3" onClick={this.props.handleViewChange.bind(this, "monthView")} key={2}>月</MenuItem>
                            <MenuItem eventkey="4" onClick={this.props.handleViewChange.bind(this, "dayView")} key={3}>日</MenuItem> 
                        </DropdownButton>                        
                    </Col>
                </Row>
            </Grid>
        </div>
        );
    }
}


