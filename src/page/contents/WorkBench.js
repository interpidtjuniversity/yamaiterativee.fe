import react from 'react'
import User from "../../data/user";
import {
    Box,
    Dropdown,
    Menu,
    Drawer,
    Form,
    Input,
    Select,
    Message,
    Card,
} from '@alifd/next'
import '../../static/css/home/WorkBench.css';
import '../../static/css/home/Servers.css';
import {Button, Tabs} from "antd";
import axios from "axios";
import qs from 'qs'
import * as React from "react";
import ReactDOM from "react-dom";
import {Canvas, Node} from "butterfly-dag";
import ExecMergeRequestList from "./workbench/ExecMergeRequestList";
import DefaultList from "./workbench/DefaultList";
import LatestIterationList from "./workbench/LatestIterationList";
import TaskExecutor from "../../axios/task/TaskExecutor";
import SimpleTask from "../../axios/task/SimpleTask";
import {EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

const $ = require('jquery');
const { TabPane } = Tabs;
import SuccessPNG from "../../static/img/home/workbench/success.png"
import ErrorPNG from "../../static/img/home/workbench/error.png"
import CancelPNG from "../../static/img/home/workbench/cancel.png"
import * as url from "url";

class WorkBench extends react.Component{

    state = {
        userLatestActions: [],
        actionKey1: "exec",
        actionKey2: "execMergeRequest",
        iterationAndReleaseKey: "latestIteration",
        visible: false,
        createType: -1,
        currentMsg: "",
    }

    constructor(props) {
        super(props)
        debugger
        this.helloWords = User.userName + " 下午好， 又是忙碌的一天"
        this.workBenchIterationTabs = [
            {tab: "最近参与的迭代", key: "latestIteration"},
            {tab: "与我相关的迭代", key: "relatedIteration"},
            {tab: "最近参与的发布", key: "latestRelease"}
        ];

        this.iterationCreate = [
            {type: "标准迭代", key: 0},
            {type: "紧急发布", key: 1},
            {type: "基础Jar迭代", key: 2},
            {type: "其他迭代", key: 3},
        ]
        this.tabStyle = {};
        this.openIterationCreateDrawer = (cT) => {
            this.setState({
                    visible: true,
                    createType: cT
                }
            )
        }
        this.closeIterationCreateDrawer = () => {
            this.setState({
                visible: false,
                createType: -1
            })
        }
        this.formMap = new Map([[0, <StanderIteration/>]])

        this.userLatestIterationActionsAPI = "/api/v1/iteration/useriterationaction"
        this.workbenchUserDataAPI = "/api/v1/home/workbench/userdata"
    }

    gotoIterationDetails = (id) => {
        this.props.history.push({pathname:"/home/iterations/"+id})
    }

    setTime = () => {
        let hour = new Date().getHours();
        let msg;
        if (0 <= hour && hour <= 6) {
            msg = "凌晨了,注意休息"
        } else if (hour > 6 && hour <= 12) {
            msg = "早上好，又是忙碌的一天"
        } else if (hour > 12 && hour <=18 ) {
            msg = "下午好，又是忙碌的一天"
        } else if (18 < hour && hour <= 23) {
            msg = "晚上好，还在加班吗?"
        }
        this.setState({
            currentMsg: msg,
        })
    }

    componentDidMount() {
        const _this = this
        let data = {
            actorName: User.userName,
            limit: 3
        }
        axios.post(_this.userLatestIterationActionsAPI, qs.stringify(data))
            .then(function (response) {
                let actions = response.data.map((item, index) => {
                    return (
                        <UserLatestAction key={index} actionData={item}/>
                    )
                })
                let userLatestActionsMountDiv = document.getElementById("userLatestActionsDiv")
                ReactDOM.unmountComponentAtNode(userLatestActionsMountDiv)
                ReactDOM.render(actions, userLatestActionsMountDiv)
            })
            .catch(function (error){})

        this.queryListData(_this.state.actionKey1, _this.state.actionKey2)
        this.queryListData(_this.state.iterationAndReleaseKey, "")
        this.timeTask = new TaskExecutor(new SimpleTask(_this.setTime), 1000)
    }

    queryListData = (level1Key, level2Key) => {
        debugger
        const _this = this
        let data = {
            level1Key: level1Key,
            level2Key: level2Key,
            userName: User.userName,
            limit: 3,
        }
        axios.post(_this.workbenchUserDataAPI, qs.stringify(data))
            .then(function (response) {
                let div;
                let data;
                debugger
                if (level1Key === "exec") {
                    if (level2Key === "execMergeRequest") {
                        div = document.getElementById("execMergeRequest")
                        data = <ExecMergeRequestList mergeRequestData={response.data}/>
                    } else if (level2Key === "execApprove"){
                        div = document.getElementById("execApprove")
                        data = <DefaultList data={response.data}/>
                    } else if (level2Key === "execRequirement"){
                        div = document.getElementById("execRequirement")
                        data = <DefaultList data={response.data}/>
                    }
                } else if (level1Key === "create") {
                    if (level2Key === "createApplication") {
                        div = document.getElementById("createApplication")
                        data = <DefaultList data={response.data}/>
                    } else if (level2Key === "createIteration"){
                        div = document.getElementById("createIteration")
                        data = <DefaultList data={response.data}/>
                    } else if (level2Key === "createServer"){
                        div = document.getElementById("createServer")
                        data = <DefaultList data={response.data}/>
                    } else if (level2Key === "createRequirement"){
                        div = document.getElementById("createRequirement")
                        data = <DefaultList data={response.data}/>
                    } else if (level2Key === "createApprove"){
                        div = document.getElementById("createApprove")
                        data = <DefaultList data={response.data}/>
                    }
                } else if (level1Key === "latestIteration") {
                    div = document.getElementById("latestIteration")
                    data = <LatestIterationList iterationData={response.data} gotoIterationDetails={_this.gotoIterationDetails}/>
                } else if (level1Key === "relatedIteration") {
                    div = document.getElementById("relatedIteration")
                    data = <DefaultList data={response.data}/>
                } else if (level1Key === "latestRelease") {
                    div = document.getElementById("latestRelease")
                    data = <DefaultList data={response.data}/>
                }
                if (div !== undefined) {
                    ReactDOM.render(data, div)
                }
            })
            .catch(function (error) {})
    }

    setActionKey1 = (key) => {
        this.setState({
            level1Tab: key
        }, ()=>{
            this.queryListData(key, this.state.actionKey2)
        })
    }
    setActionKey2 = (key) => {
        this.setState({
            level2Tab: key
        }, ()=>{
            this.queryListData(this.state.actionKey1, key)
        })
    }

    setIterationAndReleaseKey = (key) => {
        this.setState({
            iterationAndReleaseKey: key
        }, ()=>{
            this.queryListData(key, "")
        })
    }


    render() {
        return(
                <div className="list-item">
                    <Box className="box-w4p box"  direction="row">
                        <Box className="box-w3p box" direction="column">
                            <Box className="box-h1p box" direction="row">
                                <Box>
                                    <div style={{fontSize: 40}}>工作台</div>
                                </Box>
                                <Box direction="row">
                                    <Box><div style={{marginTop: 30}}>{User.userName}</div></Box>
                                    <Box><div style={{marginTop: 30}}>{this.state.currentMsg}</div></Box>
                                </Box>
                            </Box>
                            <Box className="box-h3p box" direction="row">
                                <Box className="box-w3p box">
                                    <Tabs defaultActiveKey="latestIteration" tabBarGutter={50} onChange={this.setIterationAndReleaseKey}>
                                        {this.workBenchIterationTabs.map(item => (
                                            <TabPane key={item.key} tab={item.tab}>
                                                <div id={item.key}/>
                                            </TabPane>
                                        ))}
                                    </Tabs>
                                </Box>

                                <Box className="box-w1p box" style={{paddingLeft:50, paddingTop:10}}>
                                    <Dropdown trigger={<Button type="primary" style={{width:110}}>新建迭代</Button>} triggerType="click">
                                        <Menu>{
                                            this.iterationCreate.map(item => (
                                                <Menu.Item onClick={this.openIterationCreateDrawer.bind(this, item.key)} key={item.key}>{item.type}</Menu.Item>
                                            ))}
                                        </Menu>
                                    </Dropdown>
                                </Box>
                            </Box>
                            <Box className="box-h3p box">
                                <Tabs defaultActiveKey="exec" tabBarGutter={50} onChange={this.setActionKey1}>
                                    <TabPane tab="我执行的" key="exec">
                                        <Tabs defaultActiveKey="execMergeRequest" tabBarGutter={50} onChange={this.setActionKey2}>
                                            <TabPane tab="合并请求" key="execMergeRequest">
                                                <div id="execMergeRequest"/>
                                            </TabPane>
                                            <TabPane tab="审批" key="execApprove">
                                                <div id="execApprove"/>
                                            </TabPane>
                                            <TabPane tab="需求" key="execRequirement">
                                                <div id="execRequirement"/>
                                            </TabPane>
                                        </Tabs>
                                    </TabPane>
                                    <TabPane tab="我创建的" key="create">
                                        <Tabs defaultActiveKey="createApplication" tabBarGutter={50} onChange={this.setActionKey2}>
                                            <TabPane tab="应用" key="createApplication">
                                                <div id="createApplication"/>
                                            </TabPane>
                                            <TabPane tab="迭代" key="createIteration">
                                                <div id="createIteration"/>
                                            </TabPane>
                                            <TabPane tab="服务器" key="createServer">
                                                <div id="createServer"/>
                                            </TabPane>
                                            <TabPane tab="需求" key="createRequirement">
                                                <div id="createRequirement"/>
                                            </TabPane>
                                            <TabPane tab="审批" key="createApprove">
                                                <div id="createApprove"/>
                                            </TabPane>
                                        </Tabs>
                                    </TabPane>
                                </Tabs>
                            </Box>
                            <Box className="box-h4p box">
                                <div id="userLatestActionsDiv"/>
                            </Box>
                        </Box>


                        <Box className="box-w1p box" direction="column">
                            <Box direction="row" style={{marginTop: "30%"}}>
                                <Box style={{width: "70%", fontSize: 20}}>常用功能</Box>
                                <Box>
                                    <div className="icons-list">
                                        <SettingOutlined style={{color: "green", fontSize: "25px"}}/>
                                    </div>
                                </Box>
                            </Box>
                            <Box direction="row" style={{marginTop: "5%"}}>
                                <Box><Button type="normal">服务自助</Button></Box>
                                <Box style={{marginLeft: "15%", position: "absolute"}}><Button type="normal">代码搜索</Button></Box>
                            </Box>
                            <Box direction="row" style={{marginTop: "5%"}}>
                                <Box><Button type="normal">代码权限申请</Button></Box>
                                <Box style={{marginLeft: "15%", position: "absolute"}}><Button type="normal">联调环境</Button></Box>
                            </Box>
                            <Box direction="row" style={{marginTop: "5%"}}>
                                <Box><Button type="normal">服务器操作记录</Button></Box>
                                <Box style={{marginLeft: "15%", position: "absolute"}}><Button type="normal">链路分析</Button></Box>
                            </Box>


                            <Box direction="row" style={{marginTop: "20%"}}>
                                <Box style={{width: "70%", fontSize: 20}}>服务自助</Box>
                                <Box>
                                    <div className="icons-list">
                                        <EllipsisOutlined style={{color: "green", fontSize: "25px"}}/>
                                    </div>
                                </Box>
                            </Box>
                            <Box direction="row" style={{marginTop: "5%"}}>
                                <Box><Button type="normal">机器申请</Button></Box>
                            </Box>

                            <Box direction="row" style={{marginTop: "20%"}}>
                                <Box style={{width: "70%", fontSize: 20}}>公告</Box>
                            </Box>
                            <Box direction="row" style={{marginTop: "5%"}}>
                                <Paragraph>
                                    YamaIterativeE 更新公告
                                </Paragraph>
                            </Box>
                        </Box>


                    </Box>


                    <Drawer
                        title="标题"
                        placement="right"
                        visible={this.state.visible}
                        onClose={this.closeIterationCreateDrawer}
                        width="100%"
                    >
                        {this.formMap.get(this.state.createType)}
                    </Drawer>
                </div>
        )
    }
}

class BaseNode extends Node {
    constructor(opts) {
        super(opts);
        this.id = opts.id;
        this.top = opts.top;
        this.left = opts.left;
        this.options = opts;
    }
    draw = (opts) => {
        let color
        let icon
        switch (opts.options.state) {
            case "Finish":
                color = "#43ea3e"
                icon = "../../static/img/home/workbench/success.png"
                break
            case "Cancel":
                color = "#8a958a"
                icon = "../../static/img/home/workbench/cancel.png"
                break
            case "Running":
                color = "#ec6010"
                break
            case "Init":
                color = "#D9D9D9"
                break
            case "Ready":
                color = "#D9D9D9"
                break
            case "Failure":
                color = "#ec1010"
                icon = "../../static/img/home/workbench/error.png"
                break
            default :
                color = "#7f7f80"
                break
        }

        let container = $('<div class="grid-node"></div>')
            .css('top', this.top + 'px')
            .css('left', this.left+ 'px')
            .attr('id',  this.id = opts.id)
            .css("background", color)

        return container[0];
    }
}

class UserLatestAction extends react.Component {
    constructor(props) {
        super(props);
        for (let i = 0; i < this.props.actionData.nodes.length; i++) {
            delete this.props.actionData.nodes[i].group
            delete this.props.actionData.nodes[i].iconType
            delete this.props.actionData.nodes[i].className
            //delete this.props.actionData.nodes[i].id
            this.props.actionData.nodes[i].Class = BaseNode;
            this.props.actionData.nodes[i].left = this.props.actionData.nodes[i].left/2;
            this.props.actionData.nodes[i].top = this.props.actionData.nodes[i].top - 50;
        }
        delete this.props.actionData.groups
        this.canvasDivId = "userLatestActionsDiv_"+this.props.actionData.actionId
    }

    componentDidMount() {
        let root = document.getElementById(this.canvasDivId);
        this.canvas = new Canvas({
            root: root,
            disLinkable: false, // 可删除连线
            linkable: false,    // 可连线
            draggable: false,   // 可拖动
            zoomable: false,    // 可放大
            moveable: false,    // 可平移
        });
        this.canvas.draw(this.props.actionData);
    }

    render() {
        return (
            <Box direction="row">
                <Box style={{width: "10%", height: 120}}>
                    <div className="userActionInfoDiv">
                        {this.props.actionData.iterationContent}
                    </div>
                </Box>

                <Box style={{width: "10%", height: 120}}>
                    <div className="userActionInfoDiv">
                        {this.props.actionData.pipelineName}
                    </div>
                </Box>
                <Box style={{width: "80%", height: 120}}>
                    <div style={{position: "relative",height:"100%",width:"100"}}>
                        <div id={this.canvasDivId} style={{height: "100%", width: "100%"}}/>
                    </div>
                </Box>
            </Box>
        )
    }
}

class StanderIteration extends react.Component {
    constructor(props) {
        super(props);
        this.formItemLayout = {
            labelCol: {
                fixedSpan: 8
            },
            wrapperCol: {
                span: 14
            }
        };
        this.FormItem = Form.Item;

        this.state = {
            owners:[],
            repos:[],
            owner:"",
            repo:"",
            allUsers:[],
        }
        this.IterType = "basic MR"
        this.userRepoSelectRef = React.createRef()

    }

    userNameSelectClick =() => {
        if (this.state.owners.length > 0) {
            return
        }
        const _this = this
        axios.get("/api/v1/home/workbench/newiteration/allusers").then(function (owners) {
            _this.setState({
                owners: owners.data
            })
        }).catch(function (error){})
    }
    userNameSelectChange =(value, actionType, item) => {
        this.setState({
            owner:value
        })
        const _this=this
        axios.get("/api/v1/home/workbench/newiteration/ownerrepos/"+value).then(function (repos){
            _this.setState({
                repos: repos.data
            })
        }).catch(function (error){})
    }

    userRepoSelectChange =(value, actionType, item) => {
        this.setState({
            repo:value
        })
    }
    userRepoSelectClick =() => {
        if ("" === this.state.owner) {
            Message.error("Please select the Application owner")
        }
    }
    queryUser = () => {
        if (this.state.allUsers.length === 0) {
            const _this = this
            axios.get("/api/v1/home/application/newapplication/allusers").then(function (allUsers) {
                _this.setState({
                    allUsers: allUsers.data
                })
            }).catch(function (error){})
        }
    }
    onSubmit = (value) => {
        let self = false
        for(let i=0; i<value.admins.length; i++) {
            if (value.admins[i] === User.userName) {
                self = true
                break
            }
        }
        if (!self) {
            value.admins.push(User.userName)
        }
        value.creator = User.userName
        value.admins = value.admins.join()
        axios.post("/api/v1/home/workbench/newiteration/new", qs.stringify(value))
            .then(function (response) {
                console.log(response)
            }).catch(function (error){})
    };
    onCancel = () => {};


    render() {
        return (
            <Card.Content>
                <Form className="HierarchicalForm">
                    <Form.Item label="创建人">
                        <Input disabled={true} name="creator" value={User.userName} />
                    </Form.Item>
                    <this.FormItem
                        label="仓库拥有者:"
                        required
                        requiredMessage="Please select the Application owner"
                    >
                        <Select name="appOwner" placeholder="Please select the Application owner" dataSource={this.state.owners} stype={{width:"100%"}} onChange={this.userNameSelectChange} onClick={this.userNameSelectClick} hasArrow={true} showSearch={true}>
                        </Select>
                    </this.FormItem>
                    <this.FormItem
                        label="仓库名称:"
                        required
                        requiredMessage="Please specify the Application name"
                    >
                        <Select name="appName" placeholder="Please select the Application" stype={{width:"100%"}} onClick={this.userRepoSelectClick} onChange={this.userRepoSelectChange} dataSource={this.state.repos} hasArrow={true} showSearch={true}>
                        </Select>
                    </this.FormItem>
                    <Form.Item label="迭代类型">
                        <Input disabled={true} name="iterType" value={this.IterType} />
                    </Form.Item>
                    <Form.Item label="迭代成员">
                        <Select
                            maxTagCount={2}
                            maxTagPlaceholder={(values: []) => `+${values.length - 2}`}
                            name="admins"
                            mode="multiple"
                            placeholder="请选择迭代成员"
                            onClick={this.queryUser}
                        >
                            {
                                this.state.allUsers.map((user, index) => {
                                    return <Select.Option value={user} key={index}>{user}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <this.FormItem required
                               requiredMessage="Please describe your iteration">
                        <Input.TextArea label="迭代描述" name="content" placeholder="Please describe your iteration"
                        />
                    </this.FormItem>
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

export default WorkBench