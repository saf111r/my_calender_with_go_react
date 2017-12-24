import React, { Component } from 'react';
import Header from './header.js';
import Body from './body.js';
import { Grid} from 'react-bootstrap';

// 年视图,用来渲染年视图
export default class YearView extends Component {
    constructor(...props) {
        super(...props);
        const newDate = new Date();
        // getFullYear为Date内置对象的函数,用于返回对象中的年
        // getMonth返回月份(0 ~ 11)
        // 从 Date 对象返回一个月中的某一天 (1 ~ 31)。
        // 月份递减,注意 因为Date对象处理的数据返回的大部分都是以0开始,所以,
        // 为了方便处理,只在显示层作数据的+1操作,
        this.state = {
            year: newDate.getFullYear(),
            month: newDate.getMonth(),
            day: newDate.getDate(),
            // currentYear:newDate.getFullYear(),
            // currentMonth:newDate.getMonth(),
            // currentDay:newDate.getDate(),
            //  视图的类型 ,常量的处理,js没有枚举类型
            // yearView(年) ,monthView(月),dayView(日), scheduleView(日程表),默认为年视图
            viewType: "yearView"
        };
    }
    // 处理年份的改变,还应该增加 年限的判断,默认年限为1900到2100年,因为阴历数据只有200年的
    handleYearChange=({year}) => {
        this.setState({
            year: year
        })
    }
    render() {
        return (
            <div>                
                <Grid fluid={true}>
                    <Header {...this.state} handleYearChange={this.handleYearChange} handleViewChange={this.props.handleViewChange} key="header"/>
                    <Body {...this.state} key="body"/>
                </Grid>
            </div>
        )
    }
}