import react from 'react'

import User from "../../data/user";
import {Box, Tab, Dropdown, Menu, Drawer, Form, Input, Select, Message, ResponsiveGrid, Card} from '@alifd/next'
import '../../static/css/home/WorkBench.css';
import '../../static/css/home/Servers.css';
import {Button} from "antd";
import axios from "axios";
import qs from 'qs'
import * as React from "react";

class WorkBench extends react.Component{

    constructor(props) {
        super(props)
        this.helloWords = User.userName + " 下午好， 又是忙碌的一天"
        this.workBenchIterationTabs = [
            {tab: "最近参与的迭代", key: 0},
            {tab: "与我相关的迭代", key: 1},
            {tab: "最近参与的发布", key: 2}
        ];

        this.iterationCreate = [
            {type: "标准迭代", key: 0},
            {type: "紧急发布", key: 1},
            {type: "基础Jar迭代", key: 2},
            {type: "其他迭代", key: 3},
        ]
        this.tabStyle = {};
        this.state = {
            visible: false,
            createType: -1
        }
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

    }

    render() {
        return(
                <div className="list-item">
                    <Box className="box-w4p box"  direction="row">
                        <Box className="box-w3p box" direction="column">
                            <Box className="box-h1p box">111</Box>
                            <Box className="box-h3p box" direction="row">
                                <Box className="box-w3p box">
                                    <Tab lazyLoad={false} navStyle={this.tabStyle}>
                                        {this.workBenchIterationTabs.map(item => (
                                            <Tab.Item key={item.key} title={item.tab} style={{paddingLeft: 100}}>
                                                {item.content}
                                            </Tab.Item>
                                        ))}
                                    </Tab>
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
                            <Box className="box-h3p box">111</Box>
                            <Box className="box-h3p box">111</Box>
                        </Box>


                        <Box className="box-w1p box" >

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
        this.IterType = "basice MR"
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
            if (value.admins[i] === User.userId) {
                self = true
                break
            }
        }
        if (!self) {
            value.admins.push(User.userId)
        }
        value.creator = User.userId
        value.admins = value.admins.join()
        axios.post("/api/v1/home/workbench/newiteration/new", qs.stringify(value))
            .then(function (response) {
                console.log(response)
            }).catch(function (error){})
    };
    onCancel = () => {};

    submitCreateIterationForm =() => {
        let form = {
            ownerName : this.state.owner,
            repoName : this.state.repo,
            creator : User.userName,
            admins : ["a","b","c"]
        }
        axios.post("/api/v1/home/workbench/newiteration/new", qs.stringify(form), { headers:{ 'Content-Type':'application/x-www-form-urlencoded' }})
            .then(function (response) {
                console.log(response)
            }).catch(function (error){})
    }


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
                                    return <Select.Option value={index} key={index}>{user}</Select.Option>
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

export default WorkBench