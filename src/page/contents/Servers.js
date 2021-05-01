import react from 'react'
import {Pagination, Box, Card, Button, Drawer, Form, Select, Input, Radio, ResponsiveGrid } from '@alifd/next';
import * as React from "react";
import ReactDOM from "react-dom"

import '../../static/css/home/WorkBench.css';
import '../../static/css/home/Servers.css';

import RunningBackGround from '../../static/img/home/servers/running.svg'
import ApplyingBackGround from '../../static/img/home/servers/applying.svg'
import DeployingBackGround from '../../static/img/home/servers/deploying.svg'
import IdleBackGround from '../../static/img/home/servers/idle.svg'
import StoppedBackGround from '../../static/img/home/servers/stopped.svg'

import servers1 from "../../data/homepage/server/servers-page1"
import servers2 from "../../data/homepage/server/servers-page2"
import APIFetcher from "../../axios/task/APIFetcher";
import TaskExecutor from "../../axios/task/TaskExecutor";

class Servers extends react.Component{
    state = {
        createFormVisible: false
    }
    constructor(props) {
        super(props);

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
        let data;
        if (value === 1) {
            data = servers1
        } else if (value === 2) {
            data = servers2
        }

        for(let i=0; i < 6; i++) {
            let parentId = "Servers-server-" + i;
            let parent = document.getElementById(parentId);
            ReactDOM.unmountComponentAtNode(parent)
            if (i < data.length) {
                let server = <Server
                    applicationName={data[i].applicationName}
                    branchName={data[i].branchName}
                    applyTime={data[i].applyTime}
                    ip={data[i].ip}
                    env={data[i].env}
                    owner={data[i].owner}
                    status={data[i].status}
                    index={data[i].index}
                    serverName={data[i].serverName}
                />
                ReactDOM.render(server, parent);
            }
        }
    }

    componentDidMount() {
        this.nextServerPage(1);
    }

    render() {
        return(
            <div className="list-item">
                <Box direction="row" style={{width:"100%", height:"100%"}}>
                    <Box direction="column" style={{width:"85%", height:"100%", background:"orange"}}>
                        <Box className="box-h90p box" direction="column" style={{background:"red"}}>
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
                        <Box className="box-h10p box" style={{background:"greenyellow"}}>
                            <Pagination size={"large"} pageSize={6} total={10} defaultCurrent={1} onChange={this.nextServerPage} style={{marginLeft:"auto"}}/>
                        </Box>
                    </Box>
                    <Box direction="column" style={{height:"100%", width:"15%", background:"green"}}>
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
        )
    }
}


class CreateServerForm extends react.Component {

    state={
        authType: 1
    }

    constructor(props) {
        super();
        this.onSubmit = () => {
        };
        this.onCancel = () => {
        };
    }


    render() {
        return (
            <Card.Content>
                <Form className="HierarchicalForm">
                    <Form.Item label="应用名称" required requiredMessage="请输入应用名称">
                        <Input name="applicationName" placeholder="请输入应用名称" />
                    </Form.Item>
                    <Form.Item label="服务器名称" required requiredMessage="请输入服务器名称">
                        <Input name="serverName" placeholder="给服务器起个名字" />
                    </Form.Item>
                    <Form.Item label="服务器所属环境" required requiredMessage="请选择服务器所属环境">
                        <Select name="serverEnv" placeholder="请选择服务器所属环境">
                            <Select.Option value={1}>开发环境</Select.Option>
                            <Select.Option value={2}>集成环境</Select.Option>
                            <Select.Option value={3}>测试环境</Select.Option>
                            <Select.Option value={4}>预发环境</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="项目权限">
                        <Radio.Group name="authType">
                            <Radio value={1}>私密服务器</Radio>
                            <Radio value={2}>内部服务器</Radio>
                            <Radio value={3}>开放服务器</Radio>
                        </Radio.Group>
                        {this.state.authType !== 3 && (
                            <ResponsiveGrid gap={[0, 15]} columns={2} className="HierarchicalBlock">
                                <ResponsiveGrid.Cell colSpan={{ desktop: 1, tablet: 1, phone: 2 }}>
                                    <Form.Item label="权限范围">
                                        <Select name="authScope" placeholder="请选择权限范围">
                                            <Select.Option value={1}>公司内部</Select.Option>
                                            <Select.Option value={2}>团队内部</Select.Option>
                                            <Select.Option value={3}>个人</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </ResponsiveGrid.Cell>
                                <ResponsiveGrid.Cell colSpan={{ desktop: 1, tablet: 1, phone: 2 }}>
                                    <Form.Item label="权限成员">
                                        <Select
                                            maxTagCount={2}
                                            maxTagPlaceholder={(values: []) => `+${values.length - 2}`}
                                            name="authMembers"
                                            mode="multiple"
                                            placeholder="请选择权限成员"
                                        >
                                            <Select.Option value={1}>张三</Select.Option>
                                            <Select.Option value={2}>李四</Select.Option>
                                            <Select.Option value={3}>王五</Select.Option>
                                            <Select.Option value={4}>阮小二</Select.Option>
                                            <Select.Option value={5}>阮小五</Select.Option>
                                            <Select.Option value={6}>阮小七</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </ResponsiveGrid.Cell>
                                {this.state.authType === 1 ? (
                                    <>
                                        <ResponsiveGrid.Cell key="item 1" colSpan={{ desktop: 1, tablet: 1, phone: 2 }}>
                                            <Form.Item label="私密ID">
                                                <Input name="authId" placeholder="输入私密 ID" />
                                            </Form.Item>
                                        </ResponsiveGrid.Cell>
                                        ,
                                        <ResponsiveGrid.Cell key="item 2" colSpan={{ desktop: 1, tablet: 1, phone: 2 }}>
                                            <Form.Item label="项目通行码">
                                                <Input name="authCode" placeholder="请输入项目通行码" />
                                            </Form.Item>
                                        </ResponsiveGrid.Cell>
                                    </>
                                ) : null}
                            </ResponsiveGrid>
                        )}
                    </Form.Item>
                    <Form.Item label="项目描述">
                        <Input.TextArea name="description" placeholder="请输入项目详细信息" rows={4} />
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


let ServerMap = new Map([["running",RunningBackGround], ["deploying",DeployingBackGround],["applying",ApplyingBackGround],["idle",IdleBackGround],["stopped",StoppedBackGround]]);
class Server extends react.Component {
    constructor(props) {
        super(props)
        this.applicationName = this.props.applicationName
        this.ip = this.props.ip
        this.branchName = this.props.branchName
        this.env = this.props.env
        this.owner = this.props.owner
        this.status = this.props.status
        this.applyTime = this.props.applyTime
        this.index = this.props.index
        this.serverName = this.props.serverName

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

    render() {
        let BK = ServerMap.get(this.status)
        return (
            <div>
                <Card className="free-card" free>
                    <Card.Media
                        style={{ height: 140, backgroundImage:`url(${BK})`, backgroundSize:'50% 50%'}}
                    />
                    <Card.Header
                        title={this.serverName}
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