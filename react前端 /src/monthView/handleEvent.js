import React, { Component } from 'react';
import OneMonth from '../common/oneMonth.js';
import { Button, Modal, FormGroup, Form, Col, FormControl, DropdownButton } from 'react-bootstrap'

// 事件处理
export default class HandleEvent extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            begin: this.props.begin,
            end: this.props.end,
            event: this.props.event
        }
    }
    // 开始日期
    beginDay=(beginJson) => {
        this.setState({
            begin: beginJson
        })

    }
    // 结束日期
    endDay=(endJson) => {
        this.setState({
            end: endJson
        })
    }
    // 输入框输入变化.避免直接refs取值,减少dom操作
    onInputChange=(ev) => {
        this.setState({
            event: ev.target.value
        })
    }
    // 处理保存按钮 Click后的操作
    handleSave=() => {
        const body = {
            event: this.state.event,
            begin: this.state.begin,
            end: this.state.end
        }
        // 根据是否有id 判断是添加 还是编辑
        this.props.id === null ? this.props.handleAddEvent(body):this.props.handleEditEvent(body);       
    }

    render=() => {
        const beginDay = this.state.begin["year"] + "年" + this.state.begin["month"] + "月" + this.state.begin["day"] + "日";
        const endDay = this.state.end["year"] + "年" + this.state.end["month"] + "月" + this.state.end["day"] + "日";
        // 是否显示删除按钮
        let showDelete;
        if (this.props.id != null) {
            showDelete = (<Button onClick={this.props.handleDeleteEvent} key={0}>删除</Button>)
        }
        return (
            <Modal show={this.props.show} onHide={this.props.hideModal} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg"></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalUserName">
                            <Col sm={12}>
                                <FormControl type="text" placeholder="添加代办事件" onChange={this.onInputChange} value={ this.state.event} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword">
                            <Col sm={6} key={0}>
                                <DropdownButton title={beginDay} id="begin">
                                    <OneMonth {...this.props} selectDay={this.beginDay}/>                               
                                </DropdownButton>
                            </Col>
                            <Col sm={6} key={1}>
                            
                                <DropdownButton title={endDay} id="end">
                                    <OneMonth {...this.props} selectDay={this.endDay}/>                               
                                </DropdownButton>
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