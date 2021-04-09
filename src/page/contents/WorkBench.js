import react from 'react'

import User from "../../data/user";
import {Box, Tab, Dropdown, Menu, Drawer, Form, Input, Select} from '@alifd/next'
import '../../static/css/home/WorkBench.css';
import {Button} from "antd";
import axios from "axios";

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
            owners:[]
        }

    }

    userNameSelectClick =() => {
        const _this = this
        axios.get("/api/v1/home/workbench/newiteration/allusers").then(function (owners) {
            _this.setState({
                owners: owners.data
            })
        }).catch(function (error){})
    }


    render() {
        return (
            <Form style={{ width: "60%" }} {...this.formItemLayout} colon>
                <this.FormItem
                    label="OwnerName:"
                    required
                    requiredMessage="Please select the Application owner"
                >
                    <Select placeholder="Please select the Application owner" stype={{width:"100%"}} onClick={this.userNameSelectClick}>
                        {
                        this.state.owners.map(item => (
                            <option value={item}>{item}</option>
                        ))}
                    </Select>
                </this.FormItem>
                <this.FormItem
                    label="Application:"
                    required
                    requiredMessage="Please specify the Application name"
                >
                    <Input name="repoName"/>
                </this.FormItem>
            </Form>
        )
    }
}

export default WorkBench