import React, { Component } from 'react';
import './body.css';
import { host } from '../common/config.js'
import MonthData from '../common/monthData.js';
import { getUrl, getOptions } from '../common/eventsModel.js';
import HandleEvent from './handleEvent.js';
export default class Body extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            events: [],
            id: null,
            show: false
        }
    }
    // 执行查询操作, 避免在每次ComponentdidUpdate后setState导出无限循环刷新,所以要做必要判断
    update=() => {
        const url = getUrl({...this.props});
        const options = getOptions();
        // fetch异步操作获取服务器数据
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                const defaultEvents = this.state.events;
                const getEvents = json.all;
                if (getEvents === null && defaultEvents === null) {

                } else if (getEvents === null || defaultEvents === null) {
                    this.setState({
                        events: json['all']
                    })
                } else if (getEvents.length !== defaultEvents.length) {
                    this.setState({
                        events: json['all']
                    })
                } else {
                    for (let i = 0; i < this.state.events.length; i++) {
                        if (getEvents[i].event !== defaultEvents[i].event) {
                            this.setState({
                                events: json['all']
                            })
                            break;
                        }
                    }
                }

            })
    }

    // 执行编辑操作
    handleEditEvent=(body) => {
        const url = host + "/api/events/" + this.state.id;
        const options = {method: 'PUT',credentials: 'include',body: JSON.stringify(body)}
        fetch(url, options)
        .then((response) => {
            if (response.status !== 204) {
                alert("网络错误");
            }
        })
        .then(() => this.hideModal())
    }
    // 执行添加操作
    handleAddEvent=(body) => {
        const url = host + "/api/events";
        const options = {method: 'POST',credentials: 'include',body: JSON.stringify(body)}
        fetch(url,options)
        .then((response) => {
            if (response.status !== 201) {
                alert("网络错误");
            }
        })
        .then(() => this.hideModal())
    }
    // 执行删除操作
    handleDeleteEvent=() => {
        const url = host + "/api/events/" + this.state.id;
        const options = {method: 'DELETE',credentials: 'include'}
        fetch(url,options)
        .then((response) => {
            if (response.status !== 204) {
                alert("网络错误");
            }
        })
        .then(() => this.hideModal())
    }
    // 组件挂载后执行一次查询操作
    componentDidMount() {
        this.update()
    }
    // 组件每次更新 就执行一次查询操作
    componentDidUpdate() {
        this.update()
    }
    // 点击日期,将该日期传递给子组件
    selectDay=(defaultDay) => {
        // 直接根据state的day更新组件的话 ,会造成延迟更新,
        this.setState({
            begin: {
                year: this.props.year,
                month: this.props.month + 1,
                day: defaultDay
            },
            end: {
                year: this.props.year,
                month: this.props.month + 1,
                day: defaultDay
            },
            id: null,
            event: [],
            day: defaultDay,
            show: true
        });
    }

    // 点击已有事件的 处理,注意要处理js冒泡问题,只让顶层响应onClick事件
    selectEvent=(id, begin, end, event, ev) => {
        let e = ev || window.event;
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //兼容IE
        }
        this.setState({
            id: id,
            event: event,
            begin: begin,
            end: end,
            show: true
        });
    }
    hideModal=() => {
        this.setState({
            show: false
        })
    }
    formatDate=(fillDatas, fullMonthDatas, allEvents) => {
        // fillDatas 为空,表示用于占位
        const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        const current = new Date();
        // 获取当前日期,以便高亮显示
        const currentYear = current.getFullYear();
        const currentMonth = current.getMonth();
        const currentDay = current.getDate();
        // 合并两个数组 返回新的数组
        let allNode = fillDatas.concat(fullMonthDatas);

        for (let i = 0; i < allNode.length; i++) {
            let solar = allNode[i].solar;
            let lunar = allNode[i].lunar;
            let dayEvents = [];
            // 判断当前节点是否有event,并添加event的点击事件
            if (allEvents !== null) {
                for (let j = 0; j < allEvents.length; j++) {
                    if (solar >= allEvents[j].begin.day && solar <= allEvents[j].end.day) {
                        dayEvents.push(<p className="events_day" onClick={this.selectEvent.bind(this, allEvents[j].id, allEvents[j].begin, allEvents[j].end, allEvents[j].event)} key={allEvents[j].id}>{allEvents[j].begin.hours}:00--{allEvents[j].event}</p>)
                    }
                }
            }

            if (currentYear === this.props.year && currentMonth === this.props.month && currentDay === solar) {
                allNode[i] = i < 7 ? (<div className="current_day" onClick={this.selectDay.bind(this, solar)} key={i}><p>{week[i]}</p>{solar}{lunar}{dayEvents}</div>) :
                    (<div className="current_day" onClick={this.selectDay.bind(this, solar)} key={i}>{solar}({lunar}){dayEvents}</div>);
            } else {
                allNode[i] = i < 7 ? (<div className="day" onClick={this.selectDay.bind(this, solar)} key={i}><p>{week[i]}</p>{solar}{lunar}{dayEvents}</div>) :
                    (<div className="day" onClick={this.selectDay.bind(this, solar)} key={i}>{solar}({lunar}){dayEvents}</div>);
            }

        }
        // 将这个月的数据按星期分组 每组7个(一行),方便输出显示
        let result = [],temp = [],k = 0;
        for (let i = 0; i < allNode.length; i++) {
            if (i % 7 === 0) {
                temp = [];
                for (let j = 0; j < 7; j++) {
                    if (allNode[i + j] === undefined) {
                        continue;
                    } else {
                        temp[j] = allNode[i + j];
                    }
                }
                result[k] = temp;
                k++;
            }
        }
        // 生成最后带格式的数据,
        const allDays = [];
        for (let i = 0; i < 7; i++) {
            allDays[i] = (<div key={i}>{result[i]}</div>);
        }
        return allDays
    }

    render=() => {
        const monthObject = new MonthData(this.props.year, this.props.month);
        const fillDatas = monthObject.getFillDatas();
        const fullMonthDatas = monthObject.getFullMonthDatas();
        const allEvents = this.state.events;
        const allDays = this.formatDate(fillDatas, fullMonthDatas, allEvents);
        if (this.state.show) {
            return (
                <div>
                    <div style={{padding: "5px"}}>                                      
                        {allDays}
                    </div>
                    <HandleEvent {...this.state} {...this.props}
                        hideModal={this.hideModal}
                        handleAddEvent={this.handleAddEvent}
                        handleEditEvent={this.handleEditEvent}
                        handleDeleteEvent={this.handleDeleteEvent}/>            
                
                </div>
            )
        } else {
            return (
                <div style={{padding: "5px"}}>                                      
                    {allDays}
                </div>
            )
        }
    }
}