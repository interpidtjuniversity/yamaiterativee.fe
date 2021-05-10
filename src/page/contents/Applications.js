import react from 'react'
import {Pagination, Box, Card, Button, Drawer, Form, Select, Input, Icon, ResponsiveGrid, Upload, Table} from '@alifd/next';
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
            createFormVisible: false,
            importFormVisible: false,
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
        this.openImportApplicationFButton = ()=> {
            this.setState({
                importFormVisible: true
            })
        }
        this.closeImportApplicationFButton = (reason, e) => {
            this.setState({
                importFormVisible: false
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
                        <Button size="medium" type="primary" onClick={this.openImportApplicationFButton} style={{width:"50%", marginLeft:"25%"}}>
                            导入应用
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
                <Drawer title="导入应用"
                        placement="right"
                        visible={this.state.importFormVisible}
                        onClose={this.closeImportApplicationFButton}
                        style={
                            {width: "60%"}
                        }
                >
                    <ImportApplicationForm/>
                </Drawer>
            </div>
        )
    }
}

class ImportApplicationForm extends react.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card.Content>
                <Form className="HierarchicalForm">

                </Form>
            </Card.Content>
        )
    }
}

class CreateApplicationForm extends react.Component {
    state = {
        authType: 1,
        allUsers: [],
        defaultConfig: new Map(),
        defaultYamaX: [],
    }


    constructor(props) {
        super(props);
        this.uploadAPI = "/api/v1/home/application/newapplication/seticon"
        this.getNewAppDefaultConfigAPI = "/api/v1/home/application/newapplication/optionconfig/"
        this.saveUploaderRef = (ref) => {
            if (!ref) return;
            this.uploaderRef = ref.getInstance()
        }
        this.beforeUploaderDoUpload = () => {
        }
        this.uploaderDoUpload = () => {
            this.uploaderRef.startUpload();
        }
        this.saveYamaXDataTableRef = (ref) => {
            if (!ref) return;
            this.yamaXRef = ref.getInstance()
        }

        this.onSubmit = (value) => {
            const _this = this
            /**
             * appBusinessDomain
             *  1:支付 2:网商 3:门户 4:运营
             * appAuthScope
             *  1:公司内部 2:团队内部 3:个人
             * */
            value.authMembers = value.authMembers.join()
            value.configs = JSON.stringify(this.state.defaultYamaX)
            value.image = value.image[0].imgURL
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
            if (this.state.allUsers.length === 0) {
                const _this = this
                axios.get("/api/v1/home/application/newapplication/allusers").then(function (allUsers) {
                    _this.setState({
                        allUsers: allUsers.data
                    })
                }).catch(function (error){})
            }
        }

        this.YaMaXKeyColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value} index={index} changeable={record.changeable}  name="key" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXValueColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value.toString()} index={index} changeable={record.changeable} name="value" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXEdit = (index, key, value) => {
            let newYamaX = this.state.defaultYamaX
            if (key === "key") {
                newYamaX[index].key = value
            } else if (key === "value") {
                newYamaX[index].value = value
            }
            this.setState({
                defaultYamaX: newYamaX
            })
        }
        this.YaMaXDeleteRow = (index) => {
            let newYamaX = this.state.defaultYamaX
            newYamaX.splice(index, 1)
            this.setState({
                defaultYamaX: newYamaX
            })
        }
        this.YaMaXAddRow = () => {
            let newYamaX = this.state.defaultYamaX
            newYamaX.push({key: "key",value: "value", changeable: true, displayable: true})
            this.setState({
                defaultYamaX: newYamaX
            })
        }
        this.YaMaXSave = () => {
            console.log(this.state.defaultYamaX)
            // save this.state.defaultYamaX
        }

        this.YaMaXColumnOperation = (value, index, record) => {
            if (record.changeable) {
                return (
                    <div>
                        <Button type="primary" onClick={this.YaMaXDeleteRow.bind(this, index)}>
                            删除
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Button type="primary" disabled={true} onClick={this.YaMaXDeleteRow.bind(this, index)}>
                            删除
                        </Button>
                    </div>
                )
            }
        }

        this.queryAppDefaultConfigs = (type, key) => {
            debugger
            const _this = this
            debugger
            if (key === undefined) {
                let config = _this.state.defaultConfig
                config.delete(type)
                let yamaX = _this.generateDefaultYamaX(config)
                _this.setState({
                    defaultYamaX: [],
                    defaultConfig: config
                },()=>{
                    _this.setState({
                        defaultYamaX: yamaX
                    })
                })
            } else {
                axios.get(_this.getNewAppDefaultConfigAPI + key)
                    .then(function (configs) {
                        let config = _this.state.defaultConfig
                        config.set(type, configs.data)
                        let yamaX = _this.generateDefaultYamaX(config)
                        _this.setState({
                            defaultYamaX: yamaX,
                            defaultConfig: config
                        })
                    })
                    .catch(function (error) {
                        _this.setState({
                            defaultYamaX: []
                        })
                    })
            }
        }

        this.generateDefaultYamaX = (m) => {
            let yamaX = []
            debugger
            for(let item of m.values()){
                for(let i=0; i<item.length; i++) {
                    yamaX.push(item[i])
                }
            }
            return yamaX
        }
        /**
         * config
         *  as client
         spring.sleuth.enabled=true
         grpc.client.cloud-grpc-server-consul.enableKeepAlive=true
         grpc.client.cloud-grpc-server-consul.keepAliveWithoutCalls=true
         grpc.client.cloud-grpc-server-consul.negotiationType=plaintext
         as server
         management.endpoints.web.exposure.include=*
         management.server.port=8088
         management.endpoint.health.show-details=always
         management.endpoint.serviceregistry.enabled=true
         server.port=8080
         spring.zipkin.enabled=true
         spring.sleuth.sampler.probability=1
         spring.sleuth.grpc.enabled=true
         spring.application.name=miniselfop
         spring.cloud.consul.discovery.register=true
         spring.cloud.consul.discovery.port=10000
         spring.cloud.consul.port=4000
         grpc.server.port=10000

         # global consul
         spring.cloud.consul.host=100.68.104.56
         # global zipkin
         spring.zipkin.base-url=http://192.168.1.4:9411
         # server ip
         spring.cloud.consul.discovery.hostname=100.68.104.56
         spring.cloud.consul.discovery.tags=dev
         spring.cloud.consul.discovery.instance-id=miniselfop-dev-daecwrn7
         * */
    }

    componentDidMount() {
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
                    <Form.Item label="应用资源配置">
                        <ResponsiveGrid gap={[0, 15]} columns={2} className="HierarchicalBlock">
                            <Form.Item label="数据库配置">
                                <Select name="appDataBase" placeholder="请选择数据库" defaultValue="" onChange={this.queryAppDefaultConfigs.bind(this, "appDataBase")} hasClear={true}>
                                    <Select.Option value="SPRING_MYSQL" key={1}>Mysql</Select.Option>
                                    <Select.Option value="SPRING_OCEANBASE" key={2}>OceanBase</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="注册中心配置">
                                <Select name="appRegistry" placeholder="请选择注册中心" defaultValue="" onChange={this.queryAppDefaultConfigs.bind(this, "appRegistry")} hasClear={true}>
                                    <Select.Option value="SPRING_CONSUL" key={1}>Consul</Select.Option>
                                    <Select.Option value="SPRING_ZOOKEEPER" key={2}>Zookeeper</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="应用镜像配置" required requiredMessage="请选择应用镜像">
                                <Select name="appImage" placeholder="请选择应用镜像" defaultValue="" onChange={this.queryAppDefaultConfigs.bind(this, "appImage")} hasClear={true}>
                                    <Select.Option value="JAVA_SPRING" key={1}>Java Spring</Select.Option>
                                    <Select.Option value={"Golang"} key={2}>Golang</Select.Option>
                                    <Select.Option value={"Python"} key={3}>Python</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="链路追踪">
                                <Select name="appTraceImage" placeholder="请选择链路追踪镜像" defaultValue="" onChange={this.queryAppDefaultConfigs.bind(this,"appTraceImage")} hasClear={true}>
                                    <Select.Option value="SPRING_ZIPKIN" key={1}>Zipkin</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="健康检查">
                                <Select name="appHealthyCheck" placeholder="请选择健康检查" defaultValue="" onChange={this.queryAppDefaultConfigs.bind(this,"appHealthyCheck")} hasClear={true}>
                                    <Select.Option value="SPRING_ACTUATOR" key={1}>Actuator</Select.Option>
                                </Select>
                            </Form.Item>

                        </ResponsiveGrid>
                    </Form.Item>
                    <Form.Item label="应用样式配置">
                        <ResponsiveGrid gap={[0, 15]} columns={2} className="HierarchicalBlock">
                            <Form.Item label="应用图标" required requiredMessage="请上传应用图标">
                                <Upload action={this.uploadAPI}
                                        autoUpload={false}
                                        beforeUpload={this.beforeUploaderDoUpload}
                                        listType="image"
                                        ref={this.saveUploaderRef}
                                        useDataURL={true}
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
                    </Form.Item>
                    <Form.Item label="YamaX">
                        <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock">
                            <Box direction="row">
                                <Button onClick={this.YaMaXAddRow} type="primary" style={{width:"40%"}}>
                                    新增
                                </Button>
                                <Button onClick={this.YaMaXSave} type="primary" style={{marginLeft:"20%", width:"40%"}}>
                                    保存
                                </Button>
                            </Box>
                            <Table dataSource={this.state.defaultYamaX} fixedHeader={true} maxBodyHeight={200} ref={this.saveYamaXDataTableRef}>
                                <Table.Column
                                    title="key"
                                    cell={this.YaMaXKeyColumnEdit}
                                    dataIndex="key"
                                />
                                <Table.Column
                                    title="value"
                                    cell={this.YaMaXValueColumnEdit}
                                    dataIndex="value"
                                />
                                <Table.Column
                                    title="operation"
                                    cell={this.YaMaXColumnOperation}
                                />
                            </Table>
                        </ResponsiveGrid>
                    </Form.Item>
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

/**
 * get editablePane value through parent component
 *
 * */
class EditablePane extends React.Component{
    constructor(props) {
        super(props);
        this.index = this.props.index
        this.name = this.props.name
        this.changeable = this.props.changeable
        this.state = {
            cellTitle: this.props.defaultTitle,
            editable: false
        };

        this.onKeyDown = e => {
            const { keyCode } = e;
            if (keyCode > 36 && keyCode < 41) {
                e.stopPropagation();
            }
        };
        this.onBlur = e => {
            this.setState({
                editable: false,
                cellTitle: e.target.value
            });
            this.props.valueEdit(this.props.index, this.name, e.target.value)
        };
        this.onDblClick = () => {
            this.setState({
                editable: true
            });
        };
    }



    // Stop bubble up the events of keyUp, keyDown, keyLeft, and keyRight
    render() {
        if (this.changeable === false) {
            return (
                <Input
                    disabled={true}
                    defaultValue={this.props.defaultTitle}
                />
            )
        } else {
            if (this.state.editable) {
                return (
                    <Input
                        autoFocus
                        defaultValue={this.state.cellTitle}
                        onKeyDown={this.onKeyDown}
                        onBlur={this.onBlur}
                    />
                );
            }
            return <span onDoubleClick={this.onDblClick}>{this.state.cellTitle}</span>;
        }
    }
}

export default Applications