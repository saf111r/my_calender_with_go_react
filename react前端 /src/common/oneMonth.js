import React, { Component } from 'react';
import MonthData from './monthData.js';
import { Table } from 'react-bootstrap';
import './oneMonth.css';
/*
根据传入的年月,获得一个月的视图
并渲染出一个月的视图
*/
export default class OneMonth extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            year: this.props.year,
            month: this.props.month + 1,
            day: this.props.day
        }
    }
    // 上一页
    handleLeftClick=() => {
        let newYear = this.state.year;
        let newMonth = this.state.month;
        newMonth--;
        if (newMonth < 1) {
            newYear--;
            newMonth = 12;
        }
        this.setState({
            year: newYear,
            month: newMonth
        })

    }
    // 处理点击下一页 事件
    handleRightClick=() => {
        let newYear = this.state.year;
        let newMonth = this.state.month;
        newMonth++;
        if (newMonth > 12) {
            newYear++;
            newMonth = 1;
        }
        this.setState({
            year: newYear,
            month: newMonth
        })

    }
    // 点击 选择日期
    selectDay=(selectDay) => {
        this.setState({
            day: selectDay
        });

        this.props.selectDay(this.state)
    }

    render=() => {
        // 得到填充数据和 真实的一个月的天数 数据
        const monthObject = new MonthData(this.props.year, this.props.month);
        const fillDatas = monthObject.getFillDatas();
        const fullMonthDatas = monthObject.getFullMonthDatas();
        // 获取当前日期
        const tody = new Date();
        const currentYear = tody.getFullYear();
        const currentMonth = tody.getMonth();
        // 数组的map方法,映射成新的数组,item为原数组的每个元素
        // 在这里返回li用于占位,表示1号前的所有数据为空
        let node1 = fillDatas.map((item,index) => {

            return (<td key={index+"fill"}></td>);
        });

        // node2为一个月的所有天数(带格式的)
        let node2 = fullMonthDatas.map((item) => {
            // 如果为当前日期，就加背景色以区别
            if ((this.props.year === currentYear) && (this.props.month === currentMonth) && (this.state.day === item.solar)) {
                return (
                    <td key={item.solar}><a href="javascript:void(0);" style={{backgroundColor: "#2CA7F8",color: "#fff"}}>{item.solar}<br />{item.lunar}</a></td>
                );
            } else {
                return (
                    <td key={item.solar}><a href="javascript:void(0);" onClick={this.selectDay.bind(this, item.solar)}>{item.solar}<br />{item.lunar}</a></td>
                );
            }

        });

        // 得到总的数据
        let toalNode = node1.concat(node2);
        let oneWeekNode = [];
        let temp = [],j = 0, k = 0;
        // 给数据分组,一组为一周
        for (let i = 0; i < toalNode.length; i++) {
            temp[j++] = toalNode[i];
            if ((i + 1) % 7 === 0 || (i === toalNode.length - 1)) {
                oneWeekNode[k] = (<tr key={i}>{temp}</tr>);
                temp = [];
                j = 0;
                k++;
            }

        }
        return (
            <div style={{height: "390px"}}>
                <Table bsClass="oneMonthView">
                    <thead >
                        <tr key={0}>
                            <td colSpan="7" style={{fontSize: "18px"}}>{this.props.month + 1}月</td>
                        </tr>
                        <tr key={1}>
                            <td key={0}>日</td>
                            <td key={1}>一</td>
                            <td key={2}>二</td>
                            <td key={3}>三</td>
                            <td key={4}>四</td>
                            <td key={5}>五</td>
                            <td key={6}>六</td>
                        </tr>
                    </thead>
                    <tbody>
                        {oneWeekNode}       
                    </tbody>
                </Table>
            </div>
        );
    }
}
