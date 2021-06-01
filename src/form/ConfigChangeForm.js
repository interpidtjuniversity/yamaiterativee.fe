import react from "react";
import {Box, Button, Card, Form, Input, ResponsiveGrid, Tab, Table} from "@alifd/next";
import * as React from "react";


import User from "../data/user";

import '../static/css/home/WorkBench.css';
import '../static/css/home/Servers.css';
import '../static/css/home/IterationInitPage.css';
import axios from "axios";
import qs from "qs";

function CustomTabItem({title, desc, img }) {
    return (
        <div className="custom-tab-item">
            <div className="tab-title">
                <img className="tab-img" src={img}  alt="hhhhhh"/>
                {title}
            </div>
        </div>
    );
}

class ConfigChangeForm extends react.Component {

    state={
        devYamaX: [],
        stableYamaX: [],
        testYamaX: [],
        preYamaX: [],
        prodYamaX: [],
    }

    constructor(props) {
        super(props);
        this.IterationConfigQueryAPI = "/api/v1/home/iterations/"+this.props.iterationId + "/optionconfig/"
        this.IterationConfigChangeAPI = "/api/v1/home/iterations/"+this.props.iterationId + "/optionconfig/reset"

        this.onSubmit = (value) => {
            value.devConfig = JSON.stringify(this.state.devYamaX)
            value.stableConfig = JSON.stringify(this.state.stableYamaX)
            value.testConfig = JSON.stringify(this.state.testYamaX)
            value.preConfig = JSON.stringify(this.state.preYamaX)
            value.prodConfig = JSON.stringify(this.state.prodYamaX)
            console.log(value)
            const _this = this
            axios.post(this.IterationConfigChangeAPI, qs.stringify(value)).then(function (response) {
                _this.props.formCloseCallBack()
            })
                .catch(function (exception) {})
        };
        this.onCancel = () => {
            this.props.formCloseCallBack()
        };

        this.YaMaXDevKeyColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value} index={index} changeable={record.changeable}  name="key" type="dev" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXStableKeyColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value} index={index} changeable={record.changeable}  name="key" type="stable" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXTestKeyColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value} index={index} changeable={record.changeable}  name="key" type="test" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXPreKeyColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value} index={index} changeable={record.changeable}  name="key" type="pre" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXProdKeyColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value} index={index} changeable={record.changeable}  name="key" type="prod" valueEdit={this.YaMaXEdit}/>
        }

        this.YaMaXDevValueColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value.toString()} index={index} changeable={record.changeable} name="value" type="dev" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXStableValueColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value.toString()} index={index} changeable={record.changeable} name="value" type="stable" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXTestValueColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value.toString()} index={index} changeable={record.changeable} name="value" type="test" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXPreValueColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value.toString()} index={index} changeable={record.changeable} name="value" type="pre" valueEdit={this.YaMaXEdit}/>
        }
        this.YaMaXProdValueColumnEdit = (value, index, record) => {
            return <EditablePane defaultTitle={value.toString()} index={index} changeable={record.changeable} name="value" type="prod" valueEdit={this.YaMaXEdit}/>
        }

        this.YaMaXEdit = (type, index, key, value) => {
            if (type === "dev") {
                let newYamaX = this.state.devYamaX
                if (key === "key") {
                    newYamaX[index].key = value
                } else if (key === "value") {
                    newYamaX[index].value = value
                }
                this.setState({
                    devYamaX: newYamaX
                })
            } else if (type === "stable") {
                let newYamaX = this.state.stableYamaX
                if (key === "key") {
                    newYamaX[index].key = value
                } else if (key === "value") {
                    newYamaX[index].value = value
                }
                this.setState({
                    stableYamaX: newYamaX
                })
            } else if (type === "test"){
                let newYamaX = this.state.testYamaX
                if (key === "key") {
                    newYamaX[index].key = value
                } else if (key === "value") {
                    newYamaX[index].value = value
                }
                this.setState({
                    testYamaX: newYamaX
                })
            } else if (type === "pre") {
                let newYamaX = this.state.preYamaX
                if (key === "key") {
                    newYamaX[index].key = value
                } else if (key === "value") {
                    newYamaX[index].value = value
                }
                this.setState({
                    preYamaX: newYamaX
                })
            } else if (type === "prod") {
                let newYamaX = this.state.prodYamaX
                if (key === "key") {
                    newYamaX[index].key = value
                } else if (key === "value") {
                    newYamaX[index].value = value
                }
                this.setState({
                    prodYamaX: newYamaX
                })
            }
        }

        this.YaMaXDevColumnOperation = (value, index, record) => {
            if (record.changeable) {
                return (
                    <div>
                        <Button type="primary" onClick={this.YaMaXDeleteRow.bind(this, "dev" ,index)}>
                            删除
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Button type="primary" disabled={true} onClick={this.YaMaXDeleteRow.bind(this, "dev", index)}>
                            删除
                        </Button>
                    </div>
                )
            }
        }
        this.YaMaXStableColumnOperation = (value, index, record) => {
            if (record.changeable) {
                return (
                    <div>
                        <Button type="primary" onClick={this.YaMaXDeleteRow.bind(this, "stable", index)}>
                            删除
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Button type="primary" disabled={true} onClick={this.YaMaXDeleteRow.bind(this, "stable", index)}>
                            删除
                        </Button>
                    </div>
                )
            }
        }
        this.YaMaXTestColumnOperation = (value, index, record) => {
            if (record.changeable) {
                return (
                    <div>
                        <Button type="primary" onClick={this.YaMaXDeleteRow.bind(this, "test" ,index)}>
                            删除
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Button type="primary" disabled={true} onClick={this.YaMaXDeleteRow.bind(this, "test" ,index)}>
                            删除
                        </Button>
                    </div>
                )
            }
        }
        this.YaMaXPreColumnOperation = (value, index, record) => {
            if (record.changeable) {
                return (
                    <div>
                        <Button type="primary" onClick={this.YaMaXDeleteRow.bind(this, "pre", index)}>
                            删除
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Button type="primary" disabled={true} onClick={this.YaMaXDeleteRow.bind(this, "pre", index)}>
                            删除
                        </Button>
                    </div>
                )
            }
        }
        this.YaMaXProdColumnOperation = (value, index, record) => {
            if (record.changeable) {
                return (
                    <div>
                        <Button type="primary" onClick={this.YaMaXDeleteRow.bind(this, "prod", index)}>
                            删除
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Button type="primary" disabled={true} onClick={this.YaMaXDeleteRow.bind(this, "prod", index)}>
                            删除
                        </Button>
                    </div>
                )
            }
        }

        this.YaMaXDeleteRow = (type, index) => {
            if (type === "dev") {
                let newYamaX = this.state.devYamaX
                newYamaX.splice(index, 1)
                this.setState({
                    devYamaX: []
                }, ()=>{
                    this.setState({
                        devYamaX: newYamaX,
                    })
                })
            } else if (type === "stable") {
                let newYamaX = this.state.stableYamaX
                newYamaX.splice(index, 1)
                this.setState({
                    stableYamaX: []
                }, ()=>{
                    this.setState({
                        stableYamaX: newYamaX
                    })
                })
            } else if (type === "test") {
                let newYamaX = this.state.testYamaX
                newYamaX.splice(index, 1)
                this.setState({
                    testYamaX: []
                },()=>{
                    this.setState({
                        testYamaX: newYamaX
                    })
                })
            } else if (type === "pre") {
                let newYamaX = this.state.preYamaX
                newYamaX.splice(index, 1)
                this.setState({
                    preYamaX: []
                },()=>{
                    this.setState({
                        preYamaX: newYamaX
                    })
                })
            } else if (type === "prod") {
                let newYamaX = this.state.prodYamaX
                newYamaX.splice(index, 1)
                this.setState({
                    prodYamaX: []
                }, ()=>{
                    this.setState({
                        prodYamaX: newYamaX
                    })
                })
            }
        }
        this.YaMaXAddRow = (type) => {
            debugger
            if (type === "dev") {
                let newYamaX = this.state.devYamaX
                newYamaX.push({key: "key", value: "value", changeable: true, displayable: true})
                this.setState({
                    devYamaX: newYamaX
                })
            } else if (type === "stable") {
                let newYamaX = this.state.stableYamaX
                newYamaX.push({key: "key", value: "value", changeable: true, displayable: true})
                this.setState({
                    stableYamaX: newYamaX
                })
            } else if (type === "test") {
                let newYamaX = this.state.testYamaX
                newYamaX.push({key: "key", value: "value", changeable: true, displayable: true})
                this.setState({
                    testYamaX: newYamaX
                })
            } else if (type === "pre") {
                let newYamaX = this.state.preYamaX
                newYamaX.push({key: "key", value: "value", changeable: true, displayable: true})
                this.setState({
                    preYamaX: newYamaX
                })
            } else if (type === "prod") {
                let newYamaX = this.state.prodYamaX
                newYamaX.push({key: "key", value: "value", changeable: true, displayable: true})
                this.setState({
                    prodYamaX: newYamaX
                })
            }
        }
        this.YaMaXSave = (type) => {
            if (type === "dev") {
                console.log(this.state.devYamaX)
            } else if (type === "stable") {
                console.log(this.state.stableYamaX)
            } else if (type === "test") {
                console.log(this.state.testYamaX)
            } else if (type === "pre") {
                console.log(this.state.preYamaX)
            } else if (type === "prod") {
                console.log(this.state.prodYamaX)
            }
        }

        this.tabs = [
            {
                key: "dev",
                title: "开发环境",
                desc: "dev",
                img: "https://img.alicdn.com/tfs/TB1wra0otTfau8jSZFwXXX1mVXa-8"
            },
            {
                key: "stable",
                title: "稳定环境",
                desc: "stable",
                img: "https://img.alicdn.com/tfs/TB1wra0otTfau8jSZFwXXX1mVXa-8"
            },
            {
                key: "test",
                title: "测试环境",
                desc: "test",
                img: "https://img.alicdn.com/tfs/TB1wra0otTfau8jSZFwXXX1mVXa-8"
            },
            {
                key: "pre",
                title: "预发环境",
                desc: "pre",
                img: "https://img.alicdn.com/tfs/TB1wra0otTfau8jSZFwXXX1mVXa-8"
            },
            {
                key: "prod",
                title: "生产环境",
                desc: "prod",
                img: "https://img.alicdn.com/tfs/TB1wra0otTfau8jSZFwXXX1mVXa-8"
            },
        ];
    }

    componentDidMount() {
        const _this = this
        axios.get(this.IterationConfigQueryAPI)
            .then(function (response){
                if (response.data.devConfig !== null) {
                    _this.setState({
                        devYamaX: response.data.devConfig,
                    })
                } if (response.data.stableConfig !== null) {
                    _this.setState({
                        stableYamaX: response.data.stableConfig,
                    })
                } if (response.data.testConfig !== null) {
                    _this.setState({
                        testYamaX: response.data.testConfig,
                    })
                } if (response.data.preConfig !== null) {
                    _this.setState({
                        preYamaX: response.data.preConfig,
                    })
                } if (response.data.prodConfig !== null) {
                    _this.setState({
                        prodYamaX: response.data.prodConfig,

                    })
                }
            })
            .catch(function (error){})

    }


    render() {
        return (
            <Card.Content>
                <Form className="HierarchicalForm">
                    <Form.Item label="应用所属人" required requiredMessage="请输入应用名称">
                        <Input name="appOwner" placeholder="请输入应用名称" defaultValue={this.props.appOwner} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="应用名称" required requiredMessage="请输入应用名称">
                        <Input name="appName" placeholder="请输入应用名称" defaultValue={this.props.appName} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="迭代Id" required requiredMessage="请输入迭代Id">
                        <Input name="iterId" placeholder="请输入迭代Id" defaultValue={this.props.iterationId} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="迭代标识" required requiredMessage="请输入迭代标识">
                        <Input name="iterTitle" placeholder="请输入迭代标识" defaultValue={this.props.iterTitle} disabled={this.props.autoFill}/>
                    </Form.Item>
                    <Form.Item label="YamaX">
                        <Tab shape="wrapped" tabRender={(key, props) => <CustomTabItem key={key} {...props}/>}>
                            {this.tabs.map(pane => {
                                return(
                                    <Tab.Item key={pane.key} {...pane} tabStyle={{height: "60px"}}>
                                        {
                                            pane.desc === "dev" && (
                                                <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock">
                                                    <Box direction="row">
                                                        <Button onClick={this.YaMaXAddRow.bind(this, "dev")} type="primary" style={{width:"40%"}}>
                                                            新增
                                                        </Button>
                                                        <Button onClick={this.YaMaXSave.bind(this, "dev")} type="primary" style={{marginLeft:"20%", width:"40%"}}>
                                                            保存
                                                        </Button>
                                                    </Box>
                                                    <Table dataSource={this.state.devYamaX} fixedHeader={true} maxBodyHeight={300}>
                                                        <Table.Column
                                                            title="key"
                                                            cell={this.YaMaXDevKeyColumnEdit}
                                                            dataIndex="key"
                                                        />
                                                        <Table.Column
                                                            title="value"
                                                            cell={this.YaMaXDevValueColumnEdit}
                                                            dataIndex="value"
                                                        />
                                                        <Table.Column
                                                            title="operation"
                                                            cell={this.YaMaXDevColumnOperation}
                                                        />
                                                    </Table>
                                                </ResponsiveGrid>
                                            )
                                        }
                                        {
                                            pane.desc === "stable" && (
                                                <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock">
                                                    <Box direction="row">
                                                        <Button onClick={this.YaMaXAddRow.bind(this, "stable")} type="primary" style={{width:"40%"}}>
                                                            新增
                                                        </Button>
                                                        <Button onClick={this.YaMaXSave.bind(this, "stable")} type="primary" style={{marginLeft:"20%", width:"40%"}}>
                                                            保存
                                                        </Button>
                                                    </Box>
                                                    <Table dataSource={this.state.stableYamaX} fixedHeader={true} maxBodyHeight={300}>
                                                        <Table.Column
                                                            title="key"
                                                            cell={this.YaMaXStableKeyColumnEdit}
                                                            dataIndex="key"
                                                        />
                                                        <Table.Column
                                                            title="value"
                                                            cell={this.YaMaXStableValueColumnEdit}
                                                            dataIndex="value"
                                                        />
                                                        <Table.Column
                                                            title="operation"
                                                            cell={this.YaMaXStableColumnOperation}
                                                        />
                                                    </Table>
                                                </ResponsiveGrid>
                                            )
                                        }
                                        {
                                            pane.desc === "test" && (
                                                <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock">
                                                    <Box direction="row">
                                                        <Button onClick={this.YaMaXAddRow.bind(this, "test")} type="primary" style={{width:"40%"}}>
                                                            新增
                                                        </Button>
                                                        <Button onClick={this.YaMaXSave.bind(this, "test")} type="primary" style={{marginLeft:"20%", width:"40%"}}>
                                                            保存
                                                        </Button>
                                                    </Box>
                                                    <Table dataSource={this.state.testYamaX} fixedHeader={true} maxBodyHeight={300}>
                                                        <Table.Column
                                                            title="key"
                                                            cell={this.YaMaXTestKeyColumnEdit}
                                                            dataIndex="key"
                                                        />
                                                        <Table.Column
                                                            title="value"
                                                            cell={this.YaMaXTestValueColumnEdit}
                                                            dataIndex="value"
                                                        />
                                                        <Table.Column
                                                            title="operation"
                                                            cell={this.YaMaXTestColumnOperation}
                                                        />
                                                    </Table>
                                                </ResponsiveGrid>
                                            )
                                        }
                                        {
                                            pane.desc === "pre" && (
                                                <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock">
                                                    <Box direction="row">
                                                        <Button onClick={this.YaMaXAddRow.bind(this, "pre")} type="primary" style={{width:"40%"}}>
                                                            新增
                                                        </Button>
                                                        <Button onClick={this.YaMaXSave.bind(this, "pre")} type="primary" style={{marginLeft:"20%", width:"40%"}}>
                                                            保存
                                                        </Button>
                                                    </Box>
                                                    <Table dataSource={this.state.preYamaX} fixedHeader={true} maxBodyHeight={300}>
                                                        <Table.Column
                                                            title="key"
                                                            cell={this.YaMaXPreKeyColumnEdit}
                                                            dataIndex="key"
                                                        />
                                                        <Table.Column
                                                            title="value"
                                                            cell={this.YaMaXPreValueColumnEdit}
                                                            dataIndex="value"
                                                        />
                                                        <Table.Column
                                                            title="operation"
                                                            cell={this.YaMaXPreColumnOperation}
                                                        />
                                                    </Table>
                                                </ResponsiveGrid>
                                            )
                                        }
                                        {
                                            pane.desc === "prod" && (
                                                <ResponsiveGrid gap={[0, 15]} columns={1} className="HierarchicalBlock">
                                                    <Box direction="row">
                                                        <Button onClick={this.YaMaXAddRow.bind(this, "prod")} type="primary" style={{width:"40%"}}>
                                                            新增
                                                        </Button>
                                                        <Button onClick={this.YaMaXSave.bind(this, "prod")} type="primary" style={{marginLeft:"20%", width:"40%"}}>
                                                            保存
                                                        </Button>
                                                    </Box>
                                                    <Table dataSource={this.state.prodYamaX} fixedHeader={true} maxBodyHeight={300}>
                                                        <Table.Column
                                                            title="key"
                                                            cell={this.YaMaXProdKeyColumnEdit}
                                                            dataIndex="key"
                                                        />
                                                        <Table.Column
                                                            title="value"
                                                            cell={this.YaMaXProdValueColumnEdit}
                                                            dataIndex="value"
                                                        />
                                                        <Table.Column
                                                            title="operation"
                                                            cell={this.YaMaXProdColumnOperation}
                                                        />
                                                    </Table>
                                                </ResponsiveGrid>
                                            )
                                        }
                                    </Tab.Item>
                                )
                            })}
                        </Tab>
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

class EditablePane extends React.Component{
    constructor(props) {
        super(props);
        this.index = this.props.index
        this.name = this.props.name
        this.type = this.props.type
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
            this.props.valueEdit(this.type, this.props.index, this.name, e.target.value)
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

export default ConfigChangeForm
