import react from "react";
import {Box, Button, Card, Form, Input, ResponsiveGrid, Select, Table, Tab, Message} from "@alifd/next";


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

        updateJointDebuggingServers: [],

        debuggingGroup: "",
    }

    constructor(props) {
        super(props);
        this.CreateServerGroupAPI = "/api/v1/home/server/debugroup/make"
        this.UpdateServerGroupAPI = "/api/v1/home/server/debugroup/update"
        this.QueryServerGroupAPI = "/api/v1/home/server/debugroup/"+this.props.iterationId
        this.tabs = [
            {tab:"更新联调环境", key:"update", type:"update"},
            {tab:"新建联调环境", key:"new", type:"new"},
        ]
    }

    componentDidMount() {
        const _this = this
        axios.get(_this.QueryServerGroupAPI)
            .then(function (response) {
                _this.groupData = new Map(Object.entries(response.data))
                _this.groupData.forEach(function (value, key, map){
                    _this.setState({updateJointDebuggingServers: value, debuggingGroup: key})
                })
            }).catch(function (error){})
    }

    addAppOwner = (value, index, record) => {
        return <AppOwnerSelector rdm={record.rdm} appOwner={record.appOwner} callBack={this.appOwnerChange}/>
    }
    addAppName = (value, index, record) => {
        return <AppNameSelector rdm={record.rdm} appName={record.appName} callBack={this.appNameChange} appOwnerQueryHook={this.appOwnerQueryHook}/>
    }
    addAppServer = (value, index, record) => {
        return <AppServerSelector rdm={record.rdm} appServer={record.appServer} callBack={this.appServerChange} appOwnerQueryHook={this.appOwnerQueryHook} appNameQueryHook={this.appNameQueryHook} appServerQueryHook={this.appServerQueryHook}/>
    }

    updateAppOwner = (value, index, record) => {
        return <AppOwnerSelector rdm={record.rdm} appOwner={record.appOwner} callBack={this.appOwnerChangeForUpdate}/>
    }
    updateAppName = (value, index, record) => {
        return <AppNameSelector rdm={record.rdm} appName={record.appName} callBack={this.appNameChangeForUpdate} appOwnerQueryHook={this.appOwnerQueryHookForUpdate}/>
    }
    updateAppServer = (value, index, record) => {
        return <AppServerSelector rdm={record.rdm} appServer={record.appServer} callBack={this.appServerChangeForUpdate} appOwnerQueryHook={this.appOwnerQueryHookForUpdate} appNameQueryHook={this.appNameQueryHookForUpdate} appServerQueryHook={this.appServerQueryHookForUpdate}/>
    }

    appOwnerQueryHook = (rdm) => {
        for (let i=0; i<this.state.jointDebuggingServers.length; i++) {
            if (this.state.jointDebuggingServers[i].rdm === rdm) {
                return this.state.jointDebuggingServers[i].appOwner
            }
        }
        return ""
    }
    appOwnerQueryHookForUpdate = (rdm) => {
        for (let i=0; i<this.state.updateJointDebuggingServers.length; i++) {
            if (this.state.updateJointDebuggingServers[i].rdm === rdm) {
                return this.state.updateJointDebuggingServers[i].appOwner
            }
        }
        return ""
    }

    appNameQueryHook = (rdm) => {
        for (let i=0; i<this.state.jointDebuggingServers.length; i++) {
            if (this.state.jointDebuggingServers[i].rdm === rdm) {
                return this.state.jointDebuggingServers[i].appName
            }
        }
        return ""
    }

    appNameQueryHookForUpdate = (rdm) => {
        for (let i=0; i<this.state.updateJointDebuggingServers.length; i++) {
            if (this.state.updateJointDebuggingServers[i].rdm === rdm) {
                return this.state.updateJointDebuggingServers[i].appName
            }
        }
        return ""
    }

    appServerQueryHook = (serverName) => {
        for (let i=0; i<this.state.jointDebuggingServers.length; i++) {
            if (this.state.jointDebuggingServers[i].appServer === serverName) {
                return true
            }
        }
        return false
    }

    appServerQueryHookForUpdate = (serverName) => {
        for (let i=0; i<this.state.updateJointDebuggingServers.length; i++) {
            if (this.state.updateJointDebuggingServers[i].appServer === serverName) {
                return true
            }
        }
        return false
    }

    addRecord = (type) => {
        if (type === "new") {
            let current = this.state.jointDebuggingServers
            current.push({rdm: randomString(10), appOwner: "", appName: "", appServer: ""})
            this.setState({
                jointDebuggingServers: current
            })

        } else if (type === "update") {
            let current = this.state.updateJointDebuggingServers
            current.push({rdm: randomString(10), appOwner: "", appName: "", appServer: ""})
            this.setState({
                updateJointDebuggingServers: current
            })

        }
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

    appOwnerChangeForUpdate = (rdm, owner) => {
        let current = this.state.updateJointDebuggingServers
        for (let i=0; i < current.length; i++) {
            if (current[i].rdm === rdm) {
                current[i].appOwner = owner
                break
            }
        }
        this.setState({
            updateJointDebuggingServers: current
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

    appNameChangeForUpdate = (rdm, name) => {
        let current = this.state.updateJointDebuggingServers
        for (let i=0; i < current.length; i++) {
            if (current[i].rdm === rdm) {
                current[i].appName = name
                break
            }
        }
        this.setState({
            updateJointDebuggingServers: current
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

    appServerChangeForUpdate = (rdm, server) => {
        let current = this.state.updateJointDebuggingServers
        for (let i=0; i < current.length; i++) {
            if (current[i].rdm === rdm) {
                current[i].appServer = server
                break
            }
        }
        this.setState({
            updateJointDebuggingServers: current
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

    onUpdate = (value) => {
        value.groupServer = JSON.stringify(this.state.updateJointDebuggingServers)
        const _this = this
        axios.post(this.UpdateServerGroupAPI, qs.stringify(value)).then(function (response) {
            _this.props.formCloseCallBack()
        })
            .catch(function (exception) {})
    }

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
                                item.type==="new" && this.state.updateJointDebuggingServers.length === 0 && (
                                    <Form className="HierarchicalForm" style={{width:"90%"}}>
                                        <Form.Item label="迭代Id" required requiredMessage="请输入迭代Id">
                                            <Input name="iterId" placeholder="请输入迭代Id" defaultValue={this.props.iterationId} disabled={this.props.autoFill}/>
                                        </Form.Item>
                                        <Form.Item label="绑定分组" required requiredMessage="请选择服务器">
                                            <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock" style={{width:"100%"}}>
                                                <Box direction="row">
                                                    <Button onClick={this.addRecord.bind(this, "new")} type="primary" style={{width:"40%"}}>
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
                                item.type==="update"&& this.state.updateJointDebuggingServers.length !== 0 && (
                                    <Form className="HierarchicalForm" style={{width:"90%"}}>
                                        <Form.Item label="迭代Id" required requiredMessage="请输入迭代Id">
                                            <Input name="iterId" placeholder="请输入迭代Id" defaultValue={this.props.iterationId} disabled={this.props.autoFill}/>
                                        </Form.Item>
                                        <Form.Item label="联调分组" required requiredMessage="请输入联调分组">
                                            <Input name="debuggingGroup" placeholder="请输入联调分组" defaultValue={this.state.debuggingGroup} disabled={this.props.autoFill}/>
                                        </Form.Item>
                                        <Form.Item label="迭代分组">
                                            <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock" style={{width:"100%"}}>
                                                <Box direction="row">
                                                    <Button onClick={this.addRecord.bind(this, "update")} type="primary" style={{width:"40%"}}>
                                                        新增
                                                    </Button>
                                                </Box>
                                                <Table dataSource={this.state.updateJointDebuggingServers} fixedHeader={true} maxBodyHeight={300}>
                                                    <Table.Column
                                                        title="应用所有者"
                                                        cell={this.updateAppOwner}
                                                        dataIndex="appOwner"
                                                    />
                                                    <Table.Column
                                                        title="应用名称"
                                                        cell={this.updateAppName}
                                                        dataIndex="appName"
                                                    />
                                                    <Table.Column
                                                        title="应用服务器"
                                                        cell={this.updateAppServer}
                                                        dataIndex="appServer"
                                                    />
                                                </Table>
                                            </ResponsiveGrid>
                                        </Form.Item>
                                        <Form.Item>
                                            <Box direction="row" spacing={8}>
                                                <Form.Submit
                                                    validate
                                                    onClick={(value, errors) => (errors ? null : this.onUpdate(value))}
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
        this.appOwner = this.props.appOwner
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

    clear = (actionType) => {
        this.props.callBack(this.props.rdm, "")
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
                    defaultValue={this.appOwner}
                    hasClear={true}
                    onSearchClear={this.clear}
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
        this.appName = this.props.appName
    }

    setApp = (value) => {
        this.props.callBack(this.props.rdm, value)
    }

    clear = (actionType) => {
        this.props.callBack(this.props.rdm, "")
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
                    defaultValue={this.appName}
                    hasClear={true}
                    onSearchClear={this.clear}
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
        this.appServer = this.props.appServer
    }

    queryAppServers = () => {
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

    setServer = (value, actionType, item) => {
        debugger
        if (value === undefined || value === "") {
            this.props.callBack(this.props.rdm, value)
            return;
        }
        let has = this.props.appServerQueryHook(value)
        if (has === true){
            Message.error("This server has already added");
            this.props.callBack(this.props.rdm, "")
            this.selectRef.handleChange("", 'clear')
            return;
        }
        this.props.callBack(this.props.rdm, value)
    }

    serverSelectRef = (ref) => {
        if (!ref) return;
        this.selectRef = ref.getInstance()
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
                    defaultValue={this.appServer}
                    ref={this.serverSelectRef}
                    hasClear={true}
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