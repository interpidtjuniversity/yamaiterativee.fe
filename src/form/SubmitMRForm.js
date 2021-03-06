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
                    <Form.Item label="???????????????" required requiredMessage="???????????????owner">
                        <Input name="appOwner" defaultValue={this.appOwner} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="????????????" required requiredMessage="?????????????????????">
                        <Input name="appName" defaultValue={this.appName} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="??????Id" required requiredMessage="???????????????Id">
                        <Input name="iterId" placeholder="???????????????Id" defaultValue={this.props.iterationId} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="????????????" required requiredMessage="?????????????????????">
                        <Input name="iterTargetBranch" placeholder="?????????????????????" defaultValue={this.envMRTargetBranch} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="????????????" required requiredMessage="?????????????????????">
                        <Select
                            maxTagCount={2}
                            maxTagPlaceholder={(values: []) => `+${values.length - 2}`}
                            name="iterDevelopBranch"
                            placeholder="?????????????????????"
                            onClick={this.queryBranches}
                        >
                            {
                                this.state.allBranches.map((branch, index) => {
                                    return <Select.Option value={branch} key={index}>{branch}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="????????????" required requiredMessage="?????????????????????">
                        <Select
                            maxTagCount={2}
                            maxTagPlaceholder={(values: []) => `+${values.length - 2}`}
                            name="mrCodeReviews"
                            mode="multiple"
                            placeholder="?????????????????????"
                            onClick={this.queryUser}

                        >
                            {
                                this.state.allUsers.map((user, index) => {
                                    return <Select.Option value={user} key={index}>{user}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="??????" required requiredMessage="?????????MR??????">
                        <Input.TextArea name="mrInfo" placeholder="?????????MR??????" rows={10}/>
                    </Form.Item>
                    <Form.Item>
                        <Box direction="row" spacing={8}>
                            <Form.Submit
                                validate
                                onClick={(value, errors) => (errors ? null : this.onSubmit(value))}
                                className="Button"
                                type="primary"
                            >
                                ??????
                            </Form.Submit>
                            <Button className="Button" onClick={this.onCancel}>
                                ??????
                            </Button>
                        </Box>
                    </Form.Item>
                </Form>
            </Card.Content>
        )
    }
}

export default SubmitMRForm