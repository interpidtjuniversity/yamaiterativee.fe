import react from 'react'
import {Pagination, Box, Card, Button, Drawer, Menu, Dialog, Select, Form, ResponsiveGrid} from '@alifd/next';
import * as React from "react";
import ReactDOM from "react-dom"

import '../../static/css/home/WorkBench.css';
import '../../static/css/home/Servers.css';

import RunningBackGround from '../../static/img/home/servers/running.svg'
import ApplyingBackGround from '../../static/img/home/servers/applying.svg'
import DeployingBackGround from '../../static/img/home/servers/deploying.svg'
import IdleBackGround from '../../static/img/home/servers/idle.svg'
import StoppedBackGround from '../../static/img/home/servers/stopped.svg'
import CreateServerForm from "../../form/CreateServerForm";

import APIFetcher from "../../axios/task/APIFetcher";
import TaskExecutor from "../../axios/task/TaskExecutor";
import axios from "axios";
import qs from "qs";
import User from "../../data/user";

const {SubMenu, Item, Divider} = Menu

class Servers extends react.Component{
    state = {
        createFormVisible: false,
        userServers: [],
        deployDialogVisible: false,
        restartDialogVisible: false,
        cleanDialogVisible: false,

        currentServerName: "",
        currentServerDeployBranch: "",
        currentServerIP: "",
        currentServerEnv: "",
        currentServerIterId: "",
        currentServerAllBranches: []
    }
    constructor(props) {
        super(props);
        this.GetUserAllServerAPI = "/api/v1/home/server/user/"+User.userName+"/all"
        this.GetAppAllBranchesAPI = "/api/v1/home/application/branches/all"
        this.DeployAPI = "/api/v1/home/server/newdeploy/new"

        this.openCreateServerFButton = ()=> {
            this.setState({
                createFormVisible: true
            })
        }
        this.closeCreateServerFButton = (reason, e) => {
            this.setState({
                createFormVisible: false
            })
        }
        this.formItemLayout = {
            labelCol: {
                fixedSpan: 8
            },
            wrapperCol: {
                span: 14
            }
        };
    }


    nextServerPage = (value) => {
        let data = this.state.userServers.slice(6*(value-1), 6*value)

        for(let i=0; i < 6; i++) {
            let parentId = "Servers-server-" + i;
            let parent = document.getElementById(parentId);
            ReactDOM.unmountComponentAtNode(parent)
            if (i < data.length) {
                let server = <Server
                    applicationOwner={data[i].appOwner}
                    applicationName={data[i].appName}
                    branchName={data[i].deployBranch}
                    applyTime={data[i].applyTime}
                    ip={data[i].ip}
                    env={data[i].env}
                    owner={data[i].owner}
                    status={data[i].state}
                    index={data[i].index}
                    serverName={data[i].name}
                    iterId={data[i].iterId}
                    currentServerCallBack={this.setCurrentServerData}
                />
                ReactDOM.render(server, parent);
            }
        }
    }

    onDialogClose = (type, action) => {
        if (type === "deploy") {
            this.setState({
                deployDialogVisible: false
            })
            if (action === "ok") {
                let data = {
                    serverName: this.state.currentServerName,
                    appOwner: this.state.currentServerAppOwner,
                    appName : this.state.currentServerAppName,
                    deployBranch: this.state.currentServerDeployBranch,
                    serverIP: this.state.currentServerIP,
                    serverEnv: this.state.currentServerEnv,
                    iterId: this.state.currentServerIterId,
                }
                const _this = this
                axios.post(_this.DeployAPI ,qs.stringify(data))
                    .then(function (response){

                    })
                    .catch(function (error){})
            }
        }
    }

    queryBranches = () => {
        const _this = this
        let data = {
            appOwner: _this.state.currentServerAppOwner,
            appName: _this.state.currentServerAppName,
        }
        axios.post(_this.GetAppAllBranchesAPI, qs.stringify(data))
            .then(function (response){
                debugger
                _this.setState({
                    currentServerAllBranches: response.data
                })
            })
            .catch(function (error){})
    }

    setBranch = (value, actionType, item) => {
        this.setState({
            currentServerDeployBranch: value
        })
    }

    setCurrentServerData = (dialog, appOwner, appName, serverName, serverIP, serverEnv, iterId) => {
        if (dialog === "deployDialog") {
            this.setState({
                deployDialogVisible: true
            })
        }
        this.setState({
            currentServerAppOwner: appOwner,
            currentServerAppName: appName,
            currentServerName: serverName,
            currentServerIP: serverIP,
            currentServerEnv: serverEnv,
            currentServerIterId: iterId,
        })
    }

    componentDidMount() {
        const _this = this
        axios.get(this.GetUserAllServerAPI)
            .then(function (response){
                _this.setState({
                    userServers: response.data
                })
                _this.nextServerPage(1)
            })
            .catch(function (error){})
    }

    render() {
        return(
            <div>
                <div className="list-item">
                    <Box direction="row" style={{width:"100%", height:"100%"}}>
                        <Box direction="column" style={{width:"85%", height:"100%"}}>
                            <Box className="box-h90p box" direction="column">
                                <Box className="box-h2p" direction="row">
                                    <Box className="box-w33">
                                        <div id="Servers-server-0"/>
                                    </Box>
                                    <Box className="box-w33">
                                        <div id="Servers-server-1"/>
                                    </Box>
                                    <Box className="box-w33">
                                        <div id="Servers-server-2"/>
                                    </Box>
                                </Box>
                                <Box className="box-h2p" direction="row">
                                    <Box className="box-w33">
                                        <div id="Servers-server-3"/>
                                    </Box>
                                    <Box className="box-w33">
                                        <div id="Servers-server-4"/>
                                    </Box>
                                    <Box className="box-w33">
                                        <div id="Servers-server-5"/>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="box-h10p box">
                                <Pagination size={"large"} pageSize={6} total={this.state.userServers.length} defaultCurrent={1} onChange={this.nextServerPage} style={{marginLeft:"auto"}}/>
                            </Box>
                        </Box>
                        <Box direction="column" style={{height:"100%", width:"15%"}}>
                            <Button size="medium" type="primary" onClick={this.openCreateServerFButton} style={{width:"50%", marginLeft:"25%"}}>
                                新建服务器
                            </Button>
                        </Box>

                    </Box>
                    <Drawer title="新建服务器"
                            placement="right"
                            visible={this.state.createFormVisible}
                            onClose={this.closeCreateServerFButton}
                            style={
                                {width: "60%"}
                            }
                    >
                        <CreateServerForm/>
                    </Drawer>
                </div>
                <Dialog title="请选择一个分支并部署"
                        visible={this.state.deployDialogVisible}
                        onOk={this.onDialogClose.bind(this, "deploy", "ok")}
                        onCancel={this.onDialogClose.bind(this, "deploy", "cancel")}
                        onClose={this.onDialogClose.bind(this, "deploy")}
                >
                    <Select
                        maxTagCount={2}
                        maxTagPlaceholder={(values: []) => `+${values.length - 2}`}
                        name="deployBranch"
                        placeholder="请选择部署分支"
                        onClick={this.queryBranches}
                        onChange={this.setBranch}
                    >
                        {
                            this.state.currentServerAllBranches.map((branch, index) => {
                                return <Select.Option value={branch} key={index}>{branch}</Select.Option>
                            })
                        }
                    </Select>
                </Dialog>

            </div>
        )
    }
}


let ServerMap = new Map([["running",RunningBackGround], ["deploying",DeployingBackGround],["applying",ApplyingBackGround],["idle",IdleBackGround],["stopped",StoppedBackGround]]);
class Server extends react.Component {

    state = {
        selectedKeys: []
    }

    constructor(props) {
        super(props)
        this.applicationOwner = this.props.applicationOwner
        this.applicationName = this.props.applicationName
        this.ip = this.props.ip
        this.branchName = this.props.branchName
        this.env = this.props.env
        this.owner = this.props.owner
        this.status = this.props.status
        this.applyTime = this.props.applyTime
        this.index = this.props.index
        this.serverName = this.props.serverName
        this.iterId = this.props.iterId

        // schedule       status|branchName
        this.fetcher = new APIFetcher("www.baidu.com", this.serverDataParser, this.serverCallBack)
        //this.e = new TaskExecutor(this.fetcher, 2000)

    }

    serverDataParser = (response) => {
        return response.data;
    }

    serverCallBack =(result) => {
        // change color and text
    }

    componentWillUnmount() {
        //this.e.kill()
    }

    menuItemClick = (key, item, e) => {
        if (key === "1") {

        } else if (key === "2") {
            this.props.currentServerCallBack("deployDialog", this.applicationOwner, this.applicationName, this.serverName, this.ip, this.env, this.iterId)
        } else if (key === "3") {

        }
    }

    onContextMenu = (e) => {
        e.preventDefault();

        const target = e.target;
        const { top, left } = target.getBoundingClientRect();

        Menu.create({
            target: e.target,
            offset: [e.clientX - left, e.clientY - top],
            className: "context-menu",
            popupClassName: "context-menu",
            onItemClick: this.menuItemClick,
            selectedKeys: this.state.selectedKeys,
            selectMode: "multiple",
            children: [
                <Item key="1">重启</Item>,
                <Item key="2">部署</Item>,
                <Item key="3">清除</Item>,
            ]
        });
    };

    render() {
        let BK = ServerMap.get(this.status)
        return (
            <div>
                <Card className="free-card" free onContextMenu={this.onContextMenu.bind(this)}>
                    <Card.Media
                        style={{ height: 140, backgroundImage:`url(${BK})`, backgroundSize:'50% 50%'}}
                    />
                    <Card.Header
                        title={this.serverName.substring(18)}
                        subTitle={this.applicationName}
                    />
                    <Card.Divider />
                    <Card.Content>
                        <div>服务器ip: {this.ip}</div>
                        <div>部署分支: {this.branchName}</div>
                        <div>部署环境: {this.env}</div>
                        <div>申请人: {this.owner}</div>
                        <div>服务器状态: {this.status}</div>
                        <div>申请时间: {this.applyTime}</div>
                    </Card.Content>
                    <Card.Actions>
                    </Card.Actions>
                </Card>

            </div>
        )
    }

}

export default Servers