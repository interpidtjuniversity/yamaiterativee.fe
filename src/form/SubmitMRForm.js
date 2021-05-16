import react from "react";
import {Box, Button, Card, Dialog, Form, Input, ResponsiveGrid, Select, Table} from "@alifd/next";
import * as React from "react";


import User from "../data/user";

import '../static/css/home/Servers.css';
import '../static/css/home/WorkBench.css';
import axios from "axios";
import qs from "qs";

class SubmitMRForm extends react.Component {

    state = {
        allBranches: [],
        allUsers: [],
    }

    constructor(props) {
        super(props);
        this.env = this.props.env
        this.iterationId = this.props.iterationId
        this.iterBranch=this.props.iterBranch
        this.iterState = this.props.iterState
        this.appOwner=this.props.appOwner
        this.appName=this.props.appName
        this.GetAppAllWhiteBranchesAPI = "/api/v1/home/application/branches/all/white"
        this.GetIterationAllUsersAPI = "/api/v1/home/iterations/"+this.iterationId+"/users"
        this.CreateMergeRequestAPI = "/api/v1/home/iterations/createmr/1"

        if (this.env === "dev" || this.env === "itg") {
            this.envMRTargetBranch = this.iterBranch
        } else {
            this.envMRTargetBranch = "master"
        }
    }

    componentDidMount() {
        if (this.env === "dev" || this.env === "itg") {
            this.setState({
                envMRTargetBranch: this.iterBranch
            })
        }

    }

    queryBranches = () => {
        const _this = this
        let data = {
            appOwner: _this.appOwner,
            appName: _this.appName,
        }
        axios.post(_this.GetAppAllWhiteBranchesAPI, qs.stringify(data))
            .then(function (response){
                _this.setState({
                    allBranches: response.data
                })
            })
            .catch(function (error){})
    }

    queryUser = () => {
        if (this.state.allUsers.length === 0) {
            const _this = this
            axios.get(_this.GetIterationAllUsersAPI).then(function (allUsers) {
                _this.setState({
                    allUsers: allUsers.data
                })
            }).catch(function (error){})
        }
    }

    onSubmit = (value) => {
        console.log(value)
        value.env = this.env
        value.mrCodeReviews = JSON.stringify(value.mrCodeReviews)
        value.actorName = User.userName
        const _this = this
        axios.post(_this.CreateMergeRequestAPI, qs.stringify(value)).then(function (response) {
            _this.props.formCloseCallBack()
        })
            .catch(function (exception) {})
    };


    render() {
        return (
            <Card.Content>
                <Form className="HierarchicalForm">
                    <Form.Item label="应用拥有着" required requiredMessage="请输入应用owner">
                        <Input name="appOwner" defaultValue={this.appOwner} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="应用名称" required requiredMessage="请输入应用名称">
                        <Input name="appName" defaultValue={this.appName} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="迭代Id" required requiredMessage="请输入迭代Id">
                        <Input name="iterId" placeholder="请输入迭代Id" defaultValue={this.props.iterationId} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="目标分支" required requiredMessage="请输入目标分支">
                        <Input name="iterTargetBranch" placeholder="请输入目标分支" defaultValue={this.envMRTargetBranch} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="开发分支" required requiredMessage="请选择开发分支">
                        <Select
                            maxTagCount={2}
                            maxTagPlaceholder={(values: []) => `+${values.length - 2}`}
                            name="iterDevelopBranch"
                            placeholder="请选择开发分支"
                            onClick={this.queryBranches}
                        >
                            {
                                this.state.allBranches.map((branch, index) => {
                                    return <Select.Option value={branch} key={index}>{branch}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="评审人员" required requiredMessage="请选择评审人员">
                        <Select
                            maxTagCount={2}
                            maxTagPlaceholder={(values: []) => `+${values.length - 2}`}
                            name="mrCodeReviews"
                            mode="multiple"
                            placeholder="请选择评审人员"
                            onClick={this.queryUser}

                        >
                            {
                                this.state.allUsers.map((user, index) => {
                                    return <Select.Option value={user} key={index}>{user}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="描述" required requiredMessage="请输入MR描述">
                        <Input.TextArea name="mrInfo" placeholder="请输入MR描述" rows={10}/>
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

export default SubmitMRForm