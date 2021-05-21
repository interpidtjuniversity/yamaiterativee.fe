import react from "react";
import {Box, Button, Card, Form, Input, Select} from "@alifd/next";
import * as React from "react";


import User from "../data/user";

import '../static/css/home/Servers.css';
import '../static/css/home/WorkBench.css';
import axios from "axios";
import qs from "qs";

class TriggerDevPipelineForm extends react.Component {

    state = {
        allServers: [],
    }

    constructor(props) {
        debugger
        super(props);
        this.env = this.props.env
        this.iterationId = this.props.iterationId
        this.iterBranch=this.props.iterBranch
        this.iterState = this.props.iterState
        this.appOwner=this.props.appOwner
        this.appName=this.props.appName

        this.GetUserAppServerAPI = "/api/v1/home/server/user/"+User.userName+"/all"
        this.TiggerPipelineAPI = "/api/v1/home/iterations/tigerpipeline/3"
    }

    componentDidMount() {
    }

    queryServers = () => {
        const _this = this
        let data = {
            appOwner: _this.appOwner,
            appName: _this.appName,
        }
        debugger
        axios.post(_this.GetUserAppServerAPI, qs.stringify(data))
            .then(function (response){
                _this.setState({
                    allServers: response.data
                })
            })
            .catch(function (error){})
    }

    queryUser = () => {
        if (this.state.allUsers.length === 0) {
            const _this = this
            axios.get(_this.GetUserAppServerAPI).then(function (allUsers) {
                _this.setState({
                    allUsers: allUsers.data
                })
            }).catch(function (error){})
        }
    }

    onSubmit = (value) => {
        console.log(value)
        value.actorName = User.userName
        const _this = this
        axios.post(_this.TiggerPipelineAPI, qs.stringify(value)).then(function (response) {
            _this.props.formCloseCallBack()
        })
            .catch(function (exception) {})
    };


    render() {
        return (
            <Card.Content>
                <Form className="HierarchicalForm">
                    <Form.Item label="应用拥有者" required requiredMessage="请输入应用owner">
                        <Input name="appOwner" defaultValue={this.appOwner} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="应用名称" required requiredMessage="请输入应用名称">
                        <Input name="appName" defaultValue={this.appName} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="迭代Id" required requiredMessage="请输入迭代Id">
                        <Input name="iterId" placeholder="请输入迭代Id" defaultValue={this.iterationId} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="部署分支" required requiredMessage="请输入部署分支">
                        <Input name="branchName" placeholder="请输入目标分支" defaultValue={this.iterBranch} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="环境" required requiredMessage="请输入部署环境">
                        <Input name="env" placeholder="请输入部署环境" defaultValue={this.env} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="服务器" required requiredMessage="请选择服务器">
                        <Select
                            maxTagCount={2}
                            maxTagPlaceholder={(values: []) => `+${values.length - 2}`}
                            name="serverName"
                            placeholder="请选择服务器"
                            onClick={this.queryServers}
                        >
                            {
                                this.state.allServers.map((branch, index) => {
                                    return <Select.Option value={branch} key={index}>{branch}</Select.Option>
                                })
                            }
                        </Select>
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

export default TriggerDevPipelineForm