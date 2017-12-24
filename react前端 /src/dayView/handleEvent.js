import React, { Component } from 'react';
import { Button, Modal, FormGroup, Form, Col, FormControl} from 'react-bootstrap'


export default class HandleEvent extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            begin: {
                year: this.props.year,
                month: this.props.month + 1,
                day: this.props.day,
                hours: this.props.beginHours,

            },
            end: {
                year: this.props.year,
                month: this.props.month + 1,
                day: this.props.day,
                hours: this.props.endHours,

            },
            startHours: this.props.beginHours,
            endHours: this.props.endHours,
            event: this.props.defaultEvent===null ? "":this.props.defaultEvent,
            show: true
        }
    }
    handleSave=() => {
        const body = {
            event: this.state.event,
            begin: this.state.begin,
            end: this.state.end
        }
        // 根据是否有id 判断是添加 还是编辑
        this.props.id === null ? this.props.handleAddEvent(body):this.props.handleEditEvent(body);
    }
    // 接受输入框的内容,避免直接dom操作
    onInputChange=(ev) => {
        this.setState({
            event: ev.target.value
        })
    }
    
    // 开始时间变化
    startHoursChange=(ev) => {
        this.setState({
            begin: {
                ...this.state.begin,
                hours: Number(ev.target.value)
            },
            startHours: ev.target.value
        })
    }
    // 结束时间变化
    endHoursChange=(ev) => {
        this.setState({
            end: {
                ...this.state.begin,
                hours: Number(ev.target.value)
            },
            endHours: ev.target.value
        })
    }


    render=() => {
        let hoursOptions = [];
        // 显示删除按钮
        let showDelete;

        for (var i = 0; i < 24; i++) {
            hoursOptions[i] = (<option value={i} key={i}>{i}:00</option>)
        }
        if (this.props.id != null) {
            showDelete = (<Button onClick={this.props.handleDelete} key={0}>删除</Button>)
        }
        return (
            <Modal show={this.props.show} onHide={this.props.hideModal} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg"></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalUserName" key="添加">
                            <Col sm={12}>
                                <FormControl type="text" placeholder="添加代办事件" onChange={this.onInputChange} value={ this.state.event} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsSelect" key="时间">
                            <Col sm={5} key="开始">
                                  <FormControl componentClass="select" placeholder="select" onChange={this.startHoursChange} value={ this.state.startHours}> 
                                    
                                    {hoursOptions}
                                  </FormControl>
                            </Col>
                            <Col sm={2}><p>-------</p></Col>
                            <Col sm={5} key="结束">
                                <FormControl componentClass="select" placeholder="select" onChange={this.endHoursChange} value={this.state.endHours}>

                                {hoursOptions}
                                </FormControl>
                            </Col>
                        </FormGroup>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    {showDelete}
                    <Button onClick={this.handleSave} key={1}>保存</Button>
                    <Button onClick={this.props.hideModal} key={2}>取消</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
