import react from 'react'
import {Pagination, Box, Card, Button, Drawer, Form, Select, Input, Icon, ResponsiveGrid, Upload} from '@alifd/next';
import * as React from "react";
import ReactDOM from "react-dom"

import '../../static/css/home/WorkBench.css';
import '../../static/css/home/Servers.css';

import application1 from "../../data/homepage/application/application-page1"
import application2 from "../../data/homepage/application/application-page2"
import User from "../../data/user"
import APIFetcher from "../../axios/task/APIFetcher";
import TaskExecutor from "../../axios/task/TaskExecutor";
import axios from "axios";
import qs from "qs";

class Applications extends react.Component{

    constructor(props) {
        super(props);
        this.state = {
            createFormVisible: false
        }

        this.openCreateApplicationFButton = ()=> {
            this.setState({
                createFormVisible: true
            })
        }
        this.closeCreateApplicationFButton = (reason, e) => {
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


    nextApplicationPage = (value) => {
        let data;
        if (value === 1) {
            data = application1
        } else if (value === 2) {
            data = application2
        }

        for(let i=0; i < 6; i++) {
            let parentId = "Applications-application-" + i;
            let parent = document.getElementById(parentId);
            ReactDOM.unmountComponentAtNode(parent)
            if (i < data.length) {
                let application = <Application
                    applicationId={data[i].applicationId}
                    applicationName={data[i].applicationName}
                    repository={data[i].repository}
                    latestIteration={data[i].latestIteration}
                    members={data[i].members}
                    owner={data[i].owner}
                    createdTime={data[i].createdTime}
                    icon={data[i].icon}
                    index={data[i].index}
                />
                ReactDOM.render(application, parent);
            }
        }
    }

    componentDidMount() {
        this.nextApplicationPage(1);
    }

    render() {
        return(
            <div className="list-item">
                <Box direction="row" style={{width:"100%", height:"100%"}}>
                    <Box direction="column" style={{width:"85%", height:"100%", background:"orange"}}>
                        <Box className="box-h90p box" direction="column" style={{background:"red"}}>
                            <Box className="box-h2p" direction="row">
                                <Box className="box-w33">
                                    <div id="Applications-application-0"/>
                                </Box>
                                <Box className="box-w33">
                                    <div id="Applications-application-1"/>
                                </Box>
                                <Box className="box-w33">
                                    <div id="Applications-application-2"/>
                                </Box>
                            </Box>
                            <Box className="box-h2p" direction="row">
                                <Box className="box-w33">
                                    <div id="Applications-application-3"/>
                                </Box>
                                <Box className="box-w33">
                                    <div id="Applications-application-4"/>
                                </Box>
                                <Box className="box-w33">
                                    <div id="Applications-application-5"/>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="box-h10p box" style={{background:"greenyellow"}}>
                            <Pagination size={"large"} pageSize={6} total={10} defaultCurrent={1} onChange={this.nextApplicationPage} style={{marginLeft:"auto"}}/>
                        </Box>
                    </Box>
                    <Box direction="column" style={{height:"100%", width:"15%", background:"green"}}>
                        <Button size="medium" type="primary" onClick={this.openCreateApplicationFButton} style={{width:"50%", marginLeft:"25%"}}>
                            新建应用
                        </Button>
                    </Box>

                </Box>
                <Drawer title="新建应用"
                        placement="right"
                        visible={this.state.createFormVisible}
                        onClose={this.closeCreateApplicationFButton}
                        style={
                            {width: "60%"}
                        }
                >
                    <CreateApplicationForm/>
                </Drawer>
            </div>
        )
    }
}


class CreateApplicationForm extends react.Component {
    state = {
        authType: 1,
        allUsers: [],
        authUsers: [],
    }


    constructor(props) {
        super(props);
        this.uploadAPI = "/api/v1/home/application/newapplication/seticon"
        this.saveUploaderRef = (ref) => {
            if (!ref) return;
            this.uploaderRef = ref.getInstance()
        }
        this.beforeUploaderDoUpload = () => {
        }
        this.uploaderDoUpload = () => {
            this.uploaderRef.startUpload();
        }

        this.onSubmit = (value) => {
            const _this = this
            /**
             * appBusinessDomain
             *  1:支付 2:网商 3:门户 4:运营
             * appAuthScope
             *  1:公司内部 2:团队内部 3:个人
             * */
            console.log(value)
            value.authMembers = value.authMembers.join()
            axios.post("/api/v1/home/application/newapplication/new", qs.stringify(value))
                .then(function (response) {
                    console.log(response)
                }).catch(function (error){})
        };
        this.onCancel = () => {};
        // for content display
        this.appAuthTypeChange = (value) => {
            this.setState({
                authType: value
            })
        }
        // for exist assert
        this.appNameChange = (value) => {
            this.setState({
                appName: value
            })
        }
        this.queryUser = () => {
            if (this.state.authUsers.length === 0) {
                const _this = this
                axios.get("/api/v1/home/application/newapplication/allusers").then(function (allUsers) {
                    _this.setState({
                        allUsers: allUsers.data
                    })
                }).catch(function (error){})
            }
        }
    }

    render() {
        return (
            <Card.Content>
                <Form className="HierarchicalForm">
                    <Form.Item label="拥有者">
                        <Input disabled={true} name="appOwner" value={User.userName} />
                    </Form.Item>
                    <Form.Item label="应用名称" required requiredMessage="请输入应用名称">
                        <Input name="applicationName" placeholder="请输入应用名称" onChange={this.appNameChange}/>
                    </Form.Item>
                    <Form.Item label="业务域" required requiredMessage="请选择应用名所属业务域">
                        <Select name="appBusinessDomain" placeholder="请选择应用名所属业务域">
                            <Select.Option value={1} key={1}>支付</Select.Option>
                            <Select.Option value={2} key={2}>网商</Select.Option>
                            <Select.Option value={3} key={3}>门户</Select.Option>
                            <Select.Option value={4} key={4}>运营</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="应用权限">
                            <ResponsiveGrid gap={[0, 15]} columns={2} className="HierarchicalBlock">
                                <ResponsiveGrid.Cell>
                                    <Form.Item label="权限范围" required requiredMessage="请选择权限范围">
                                        <Select name="appAuthScope" placeholder="请选择权限范围" onChange={this.appAuthTypeChange}>
                                            <Select.Option value={1} key={1}>公司内部</Select.Option>
                                            <Select.Option value={2} key={2}>团队内部</Select.Option>
                                            <Select.Option value={3} key={3}>个人</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </ResponsiveGrid.Cell>
                                {this.state.authType !== 3 && (
                                <ResponsiveGrid.Cell>
                                    <Form.Item label="权限成员">
                                        <Select
                                            maxTagCount={2}
                                            maxTagPlaceholder={(values: []) => `+${values.length - 2}`}
                                            name="authMembers"
                                            mode="multiple"
                                            placeholder="请选择权限成员"
                                            onClick={this.queryUser}
                                        >
                                            {
                                                this.state.allUsers.map((user, index) => {
                                                    return <Select.Option value={index} key={index}>{user}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </ResponsiveGrid.Cell>
                                )}
                            </ResponsiveGrid>
                    </Form.Item>
                    <Form.Item label="应用配置">
                        <ResponsiveGrid gap={[0, 15]} columns={2} className="HierarchicalBlock">
                            <Form.Item label="应用域名" required requiredMessage="应用域名">
                                <Input name="appDomainName" placeholder="应用域名" rows={10}/>
                            </Form.Item>
                            <Form.Item label="数据库配置" required requiredMessage="请选择数据库">
                                <Select name="appDataBase" placeholder="请选择数据库" defaultValue="Mysql">
                                    <Select.Option value={1} key={1}>Mysql</Select.Option>
                                    <Select.Option value={2} key={2}>OceanBase</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="注册中心配置" required requiredMessage="请选择注册中心">
                                <Select name="appRegistry" placeholder="请选择注册中心" defaultValue="Consul">
                                    <Select.Option value={1} key={1}>Consul</Select.Option>
                                    <Select.Option value={2} key={2}>Zookeeper</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="应用镜像配置" required requiredMessage="请选择应用镜像">
                                <Select name="appImage" placeholder="请选择应用镜像" defaultValue="Java">
                                    <Select.Option value={1} key={1}>Java</Select.Option>
                                    <Select.Option value={2} key={2}>Golang</Select.Option>
                                    <Select.Option value={3} key={3}>Python</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="链路追踪" required requiredMessage="请选择链路追踪镜像">
                                <Select name="appTraceImage" placeholder="请选择链路追踪镜像" defaultValue="Zipkin">
                                    <Select.Option value={1} key={1}>Zipkin</Select.Option>
                                </Select>
                            </Form.Item>

                        </ResponsiveGrid>
                    </Form.Item>
                    <ResponsiveGrid gap={[0, 15]} columns={2} className="HierarchicalBlock">
                        <Form.Item label="应用图标" required requiredMessage="请上传应用图标">
                            <Upload action={this.uploadAPI}
                                    autoUpload={false}
                                    beforeUpload={this.beforeUploaderDoUpload}
                                    listType="image"
                                    ref={this.saveUploaderRef}
                                    name="image"
                            >
                                <Button>
                                    <Icon type="upload"/>
                                    select a app icon
                                </Button>
                            </Upload>
                            <br/>
                            <Button type="primary" onClick={this.uploaderDoUpload}>
                                Upload
                            </Button>
                        </Form.Item>
                    </ResponsiveGrid>
                    <Form.Item label="应用描述" required requiredMessage="请输入应用详细信息">
                        <Input.TextArea name="appDescription" placeholder="请输入应用详细信息" rows={10}/>
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


class Application extends react.Component {
    constructor(props) {
        super(props)
        this.applicationId = this.props.applicationId
        this.applicationName = this.props.applicationName
        this.repository = this.props.repository
        this.latestIteration = this.props.latestIteration
        this.members = this.props.members
        this.owner = this.props.owner
        this.createdTime = this.props.createdTime
        this.index = this.props.index
        this.icon = this.props.icon

        // schedule       status|branchName
        this.fetcher = new APIFetcher("www.baidu.com", this.applicationDataParser, this.applicationCallBack)
        //this.e = new TaskExecutor(this.fetcher, 2000)

    }

    applicationDataParser = (response) => {
        return response.data;
    }

    applicationCallBack =(result) => {
        // change color and text
    }

    componentWillUnmount() {
        //this.e.kill()
    }

    render() {
        return (
            <div>
                <Card className="free-card" free>
                    <Card.Media
                        style={{ height: 140, backgroundImage:`url(${this.icon})`, backgroundSize:'50% 50%'}}
                    />
                    <Card.Header
                        title={this.applicationName}
                        subTitle={this.applicationName}
                    />
                    <Card.Divider />
                    <Card.Content>
                        <div>应用Id: {this.applicationId}</div>
                        <div>应用名: {this.applicationName}</div>
                        <div>代码仓库: {this.repository}</div>
                        <div>应用成员: {this.members}</div>
                        <div>创建人: {this.owner}</div>
                        <div>创建时间: {this.createdTime}</div>
                        <div>最近迭代: {this.latestIteration}</div>
                    </Card.Content>
                    <Card.Actions>
                    </Card.Actions>
                </Card>

            </div>
        )
    }

}

export default Applications