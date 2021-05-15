import react from "react";
import {Box, Button, Card, Form, Input, ResponsiveGrid, Select, Table, Tab} from "@alifd/next";


import User from "../data/user";

import '../static/css/home/Servers.css';
import '../static/css/home/WorkBench.css';
import axios from "axios";
import qs from "qs";
import * as React from "react";

function randomString(length) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
        result += str[Math.floor(Math.random() * str.length)];
    return result;
}

class NewJointDebuggingForm extends react.Component {

    state = {
        jointDebuggingServers: [],

        updateJointDebuggingServers: {
            "asdasdas":[
                {"rdm":"cb9d6986b4","appOwner":"interpidtjuniversity","appName":"miniselfop","appServer":"0edef0abb19f11eb9274_interpidtjuniversity.miniselfop.dev","appServerOwner":"interpidtjuniversity","appServerState":3},
                {"rdm":"cb9d83e3b4","appOwner":"interpidtjuniversity","appName":"miniselfop","appServer":"24391683b27111eba6c5_interpidtjuniversity.miniselfop.dev","appServerOwner":"interpidtjuniversity","appServerState":2}
                ],  
            "fwfefwef":[
                {"rdm":"cb9d6986b4","appOwner":"interpidtjuniversity","appName":"miniselfop","appServer":"0edef0abb19f11eb9274_interpidtjuniversity.miniselfop.dev","appServerOwner":"interpidtjuniversity","appServerState":3},
                {"rdm":"cb9d83e3b4","appOwner":"interpidtjuniversity","appName":"miniselfop","appServer":"24391683b27111eba6c5_interpidtjuniversity.miniselfop.dev","appServerOwner":"interpidtjuniversity","appServerState":2}
            ]
        }
    }

    constructor(props) {
        super(props);
        this.CreateServerGroupAPI = "/api/v1/home/server/debugroup/make"
        this.tabs = [
            {tab:"更新联调环境", key:"update", type:"update"},
            {tab:"新建联调环境", key:"new", type:"new"},
        ]
    }

    componentDidMount() {

    }

    addAppOwner = (value, index, record) => {
        return <AppOwnerSelector rdm={record.rdm} callBack={this.appOwnerChange}/>
    }
    addAppName = (value, index, record) => {
        return <AppNameSelector rdm={record.rdm} callBack={this.appNameChange} appOwnerQueryHook={this.appOwnerQueryHook}/>
    }
    addAppServer = (value, index, record) => {
        return <AppServerSelector rdm={record.rdm} callBack={this.appServerChange} appOwnerQueryHook={this.appOwnerQueryHook} appNameQueryHook={this.appNameQueryHook}/>
    }

    appOwnerQueryHook = (rdm) => {
        for (let i=0; i<this.state.jointDebuggingServers.length; i++) {
            if (this.state.jointDebuggingServers[i].rdm === rdm) {
                return this.state.jointDebuggingServers[i].appOwner
            }
        }
    }

    appNameQueryHook = (rdm) => {
        for (let i=0; i<this.state.jointDebuggingServers.length; i++) {
            if (this.state.jointDebuggingServers[i].rdm === rdm) {
                return this.state.jointDebuggingServers[i].appName
            }
        }
    }

    addRecord = () => {
        let current = this.state.jointDebuggingServers
        current.push({rdm: randomString(10), appOwner: "", appName: "", appServer: ""})
        this.setState({
            jointDebuggingServers: current
        })
    }

    appOwnerChange = (rdm, owner) => {
        let current = this.state.jointDebuggingServers
        for (let i=0; i < current.length; i++) {
            if (current[i].rdm === rdm) {
                current[i].appOwner = owner
                break
            }
        }
        this.setState({
            jointDebuggingServers: current
        })
    }

    appNameChange = (rdm, name) => {
        let current = this.state.jointDebuggingServers
        for (let i=0; i < current.length; i++) {
            if (current[i].rdm === rdm) {
                current[i].appName = name
                break
            }
        }
        this.setState({
            jointDebuggingServers: current
        })
    }

    appServerChange = (rdm, server) => {
        let current = this.state.jointDebuggingServers
        for (let i=0; i < current.length; i++) {
            if (current[i].rdm === rdm) {
                current[i].appServer = server
                break
            }
        }
        this.setState({
            jointDebuggingServers: current
        })
    }

    onSubmit = (value) => {
        value.groupServer = JSON.stringify(this.state.jointDebuggingServers)
        const _this = this
        axios.post(this.CreateServerGroupAPI, qs.stringify(value)).then(function (response) {
            _this.props.formCloseCallBack()
        })
            .catch(function (exception) {})
    };

    onCancel = () => {
        this.props.formCloseCallBack()
    };


    render() {
        return (
            <Card.Content>
                <Tab size="small" shape="capsule">
                    {this.tabs.map(item => (
                        <Tab.Item key={item.key} title={item.tab}>
                            {
                                item.type==="new" && (
                                    <Form className="HierarchicalForm" style={{width:"90%"}}>
                                        <Form.Item label="迭代Id" required requiredMessage="请输入迭代Id">
                                            <Input name="iterId" placeholder="请输入迭代Id" defaultValue={this.props.iterationId} disabled={this.props.autoFill}/>
                                        </Form.Item>
                                        <Form.Item label="绑定分组" required requiredMessage="请选择服务器">
                                            <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock" style={{width:"100%"}}>
                                                <Box direction="row">
                                                    <Button onClick={this.addRecord.bind(this)} type="primary" style={{width:"40%"}}>
                                                        新增
                                                    </Button>
                                                </Box>
                                                <Table dataSource={this.state.jointDebuggingServers} fixedHeader={true} maxBodyHeight={300}>
                                                    <Table.Column
                                                        title="应用所有者"
                                                        cell={this.addAppOwner}
                                                        dataIndex="appOwner"
                                                    />
                                                    <Table.Column
                                                        title="应用名称"
                                                        cell={this.addAppName}
                                                        dataIndex="appName"
                                                    />
                                                    <Table.Column
                                                        title="应用服务器"
                                                        cell={this.addAppServer}
                                                        dataIndex="appServer"
                                                    />
                                                </Table>
                                            </ResponsiveGrid>
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
                                )
                            }
                            {
                                item.type==="update" && (
                                    <Form className="HierarchicalForm" style={{width:"90%"}}>
                                        <Form.Item label="迭代Id" required requiredMessage="请输入迭代Id">
                                            <Input name="iterId" placeholder="请输入迭代Id" defaultValue={this.props.iterationId} disabled={this.props.autoFill}/>
                                        </Form.Item>
                                        <Form.Item label="迭代分组">
                                            <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock" style={{width:"100%"}}>
                                                <Box direction="row">
                                                    <Button onClick={this.addRecord.bind(this)} type="primary" style={{width:"40%"}}>
                                                        新增
                                                    </Button>
                                                </Box>
                                                <Table dataSource={this.state.jointDebuggingServers} fixedHeader={true} maxBodyHeight={300}>
                                                    <Table.Column
                                                        title="应用所有者"
                                                        cell={this.addAppOwner}
                                                        dataIndex="appOwner"
                                                    />
                                                    <Table.Column
                                                        title="应用名称"
                                                        cell={this.addAppName}
                                                        dataIndex="appName"
                                                    />
                                                    <Table.Column
                                                        title="应用服务器"
                                                        cell={this.addAppServer}
                                                        dataIndex="appServer"
                                                    />
                                                </Table>
                                            </ResponsiveGrid>
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
                                )
                            }
                        </Tab.Item>
                    ))}
                </Tab>
            </Card.Content>
        )
    }
}


class AppOwnerSelector extends react.Component {

    state = {
        allOwners: []
    }

    constructor(props) {
        super(props);
        this.GetAllAppOwnerAPI = "/api/v1/home/application/newapplication/allusers"
    }

    queryAllOwner = () => {
        if (this.state.allOwners.length === 0) {
            const _this = this
            axios.get(_this.GetAllAppOwnerAPI).then(function (allOwners) {
                _this.setState({
                    allOwners: allOwners.data
                })
            }).catch(function (error){})
        }
    }

    setOwner = (value) => {
        this.props.callBack(this.props.rdm, value)
    }

    render() {
        return (
            <div>
                <Select
                    id="basic-demo"
                    aria-label="name is"
                    style={{ marginRight: 8, width:200 }}
                    onFocus={this.queryAllOwner}
                    onChange={this.setOwner}
                >
                    {
                        this.state.allOwners.map((owner, index) => {
                            return <Select.Option value={owner} key={index}>{owner}</Select.Option>
                        })
                    }
                </Select>
            </div>
        );
    }
}

class AppNameSelector extends react.Component {

    state={
        ownerApps: [],
        lastOwner: "",
    }

    constructor(props) {
        super(props);
        this.GetAllOwnerAppAPI = "/api/v1/home/workbench/newiteration/ownerrepos/"
        this.ownerMap = new Map([])
    }

    setApp = (value) => {
        this.props.callBack(this.props.rdm, value)
    }

    queryOwnerAppName = () => {
        const _this = this
        let currentOwner = _this.props.appOwnerQueryHook(_this.props.rdm)
        if (currentOwner === "") {
            return
        }
        if (_this.ownerMap.has(currentOwner) === false) {
            axios.get(_this.GetAllOwnerAppAPI + currentOwner).then(function (ownerApps) {
                if (ownerApps.data !== []) {
                    _this.ownerMap.set(currentOwner, ownerApps.data)
                    _this.setState({
                        ownerApps: ownerApps.data,
                    })
                } else {
                    _this.ownerMap.set(currentOwner, [])
                }
            }).catch(function (error) {
            })
        } else {
            _this.setState({
                ownerApps: _this.ownerMap.get(currentOwner)
            })
        }
    }


    render() {
        return (
            <div>
                <Select
                    id="basic-demo"
                    aria-label="name is"
                    style={{ marginRight: 8, width:200 }}
                    onFocus={this.queryOwnerAppName}
                    onChange={this.setApp}
                >
                    {
                        this.state.ownerApps.map((name, index) => {
                            return <Select.Option value={name} key={index}>{name}</Select.Option>
                        })
                    }
                </Select>
            </div>
        );
    }
}

class AppServerSelector extends react.Component {

    state={
        appServers: []
    }

    constructor(props) {
        super(props);
        this.GetAllAppDevServer = "/api/v1/home/server/"
        this.serverMap = new Map([])
    }

    queryAppServers = () => {
        debugger
        let appOwner = this.props.appOwnerQueryHook(this.props.rdm)
        let appName = this.props.appNameQueryHook(this.props.rdm)
        let key = appOwner+appName
        const _this = this

        if (_this.serverMap.has(key) === false) {
            axios.get(_this.GetAllAppDevServer + appOwner + "/" + appName)
                .then(function (servers) {
                    _this.serverMap.set(key, servers.data)
                    _this.setState({
                        appServers: servers.data
                    })
                }).catch(function (error) {
            })
        } else {
            _this.setState({
                appServers: _this.serverMap.get(key)
            })
        }

    }

    setServer = (value) => {
        this.props.callBack(this.props.rdm, value)
    }

    render() {
        return (
            <div>
                <Select
                    id="basic-demo"
                    aria-label="name is"
                    style={{ marginRight: 8, width:275 }}
                    onFocus={this.queryAppServers}
                    onChange={this.setServer}
                >
                    {
                        this.state.appServers.map((name, index) => {
                            return <Select.Option value={name} key={index}>{name}</Select.Option>
                        })
                    }
                </Select>
            </div>
        );
    }
}
export default NewJointDebuggingForm