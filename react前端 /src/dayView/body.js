import React, { Component } from 'react';
import HandleEvent from './handleEvent.js';
import { host } from '../common/config.js';
import { Table } from 'react-bootstrap';
import { getUrl, getOptions } from '../common/eventsModel.js';
export default class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            events: []
        }
    // 处理点击上一页事件
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
    // 修改事件
    handleEditEvent=(body) => {
        const url = host + "/api/events/" + this.state.id;
        const options = {
            method: 'PUT',
            credentials: 'include', //设置验证,允许跨域请求带cookie
            body: JSON.stringify(body)
            }
        fetch(url,options)
        .then((response) => {
            if (response.status !== 204) {
                alert("网络错误! ");
            }
        })
        .then(() => this.hideModal())
    }
    // 添加事件
    handleAddEvent=(body) => {
        const url = host + "/api/events";
        const options = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body)
        };
        fetch(url, options)
            .then((response) => {
                if (response.status !== 201) {
                    alert("网络错误! ")
                }
            })
            .then(() => this.hideModal())

    }
    // 删除事件
    handleDelete=() => {
        const url = host + "/api/events/" + this.state.id;
        const options = {
            method: 'DELETE',
            credentials: 'include'
        };
        fetch(url, options)
            .then((response) => {
                if (response.status !== 204) {
                    alert("网络错误! ")
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
    // 点击 日期 添加事件
    selectedHours=(beginHours) => {
        // 直接根据state的day更新组件的话 ,会造成延迟更新,
        this.setState({
            id: null,
            defaultEvent: null,
            beginHours: beginHours,
            endHours: beginHours + 1,
            show: true
        });
    }
    selectedEvent=(id, event, beginHours, endHours) => {
        this.setState({
            id: id,
            defaultEvent: event,
            beginHours: beginHours,
            endHours: endHours,
            show: true
        });
    }
    // 控制 模态框的显示与隐藏
    hideModal=() => {
        this.setState({
            show: false
        })
    }
    render() {
        let tableDate = [];
        let events = this.state.events;
        if (events !== null) {
            for (let i = 0; i < 24; i++) {
                for (let j = 0; j < events.length; j++) {
                    // 规定一个时间点只能干一件事,
                    if (events[j].begin.hours <= i && events[j].end.hours > i) {
                        tableDate[i] = (
                            <tr style={{height: "40px"}} key={i}>
                                <td style={{width: "60px"}} key={1}>{i} 点</td>
                                <td onClick={this.selectedEvent.bind(this, events[j].id, events[j].event, events[j].begin.hours, events[j].end.hours)}
                                value={i} key={events[j].id}>{events[j].event}
                                </td>
                            </tr>);
                        break;

                    } else {
                        tableDate[i] = (
                            <tr style={{height: "40px"}} key={i}>
                                <td style={{width: "60px"}} key={1}>{i} 点</td>
                                <td onClick={this.selectedHours.bind(this, i)} value={i} key={2}></td>
                            </tr>);
                    }

                }
            }
        } else {
            for (let i = 0; i < 24; i++) {
                tableDate[i] = (
                    <tr style={{height: "40px"}} key={i}>
                        <td style={{width: "60px"}} key={1}>{i} 点</td>
                        <td onClick={this.selectedHours.bind(this, i)} value={i} key={2}></td>
                    </tr>);
            }
        }
        const data=(
                <div style={{padding: "10px"}}>
                    <Table striped bordered condensed hover >
                        <thead>
                            <tr>
                                <th colSpan="2" style={{height: "80px",verticalAlign: "middle",fontSize: "20px"}}>{this.props.month + 1}月{this.props.day}日</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableDate}
                        </tbody>
                    </Table>
                </div>);
        // 避免了 同时渲染,子组件获取不到及时更新的state值
        if (this.state.show) {
            return (
                <div>
                    {data}
                    <HandleEvent {...this.state} {...this.props}
                        hideModal={this.hideModal}
                        handleAddEvent={this.handleAddEvent}
                        handleDelete={this.handleDelete}
                        handleEditEvent={this.handleEditEvent}
                    /> 
                </div>
            );
        } else {
            return (<div>{data}</div>);
        }
    }
}

