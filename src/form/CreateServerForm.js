import react from "react";
import {Box, Button, Card, Form, Input, Select} from "@alifd/next";
import * as React from "react";


import User from "../data/user";

import '../static/css/home/Servers.css';
import '../static/css/home/WorkBench.css';
import axios from "axios";
import qs from "qs";

class CreateServerForm extends react.Component {

    state={
        authType: 1,
    }

    constructor(props) {
        super(props);
        debugger
        this.serverType = [{id:0,title:"开发环境"}, {id:1,title:"测试环境"}, {id:2,title:"稳定环境"}]
        this.NewServerAPI = "/api/v1/home/server/newserver/new"
        const _this = this
        this.onSubmit = (value) => {
            value.env = "env"
            axios.post(this.NewServerAPI, qs.stringify(value)).then(function (response) {
                _this.props.formCloseCallBack()
            }).catch(function (exception) {})
        };
        this.onCancel = () => {
            this.props.formCloseCallBack()
        };
    }

    componentDidMount() {
        this.development = this.props.iterState < 2;
    }


    render() {
        return (
            <Card.Content>
                <Form className="HierarchicalForm">
                    <Form.Item label="应用所属人" required requiredMessage="请输入应用名称">
                        <Input name="appOwner" placeholder="请输入应用名称" defaultValue={this.props.appOwner} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="应用名称" required requiredMessage="请输入应用名称">
                        <Input name="appName" placeholder="请输入应用名称" defaultValue={this.props.appName} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="迭代Id" required requiredMessage="请输入迭代Id">
                        <Input name="iterId" placeholder="请输入迭代Id" defaultValue={this.props.iterationId} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="迭代标识" required requiredMessage="请输入迭代标识">
                        <Input name="iterTitle" placeholder="请输入迭代标识" defaultValue={this.props.iterTitle} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="服务器所属环境" required requiredMessage="请选择服务器所属环境">
                        <Select name="serverType" placeholder="请选择服务器所属环境">
                            {
                                this.props.iterState < 2 && (this.serverType.slice(0, this.props.iterState+2).map((item,index) => {
                                    return <Select.Option value={item.id} key={index}>{item.title}</Select.Option>
                                }))
                            }
                            {
                                this.props.iterState >= 2 && (this.serverType.map((item, index) => {
                                    return <Select.Option value={item.id} key={index}>{item.title}</Select.Option>
                                }))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="服务器镜像" required requiredMessage="请输入服务器镜像">
                        <Input name="appType" placeholder="请输入服务器镜像" defaultValue={this.props.serverImage} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="申请人" required requiredMessage="请输入申请人">
                        <Input name="owner" placeholder="请输入申请人" defaultValue={User.userName} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="申请原因" required requiredMessage="请输入申请原因">
                        <Input.TextArea name="description" placeholder="请输入申请原因" rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Box direction="row" spacing={8}>
                            <Form.Submit
                                validate
                                onClick={(value, errors) => (errors ? null : this.onSubmit(value))}
                                className="Button"
                                type="primary"
                            >
                                提交
                            </Form.Submit>
                            <Button className="Button" onClick={this.onCancel}>
                                退回
                            </Button>
                        </Box>
                    </Form.Item>
                </Form>
            </Card.Content>
        )
    }
}

export default CreateServerForm