import react from 'react'

import {Drawer, ResponsiveGrid} from '@alifd/next';

import {Card} from 'antd'
import NewServer from "../static/img/home/config/NewServer.png"
import IterationConfig from "../static/img/home/config/IterationConfig.png"
import PeopleConfig from "../static/img/home/config/PeopleConfig.png"
import SubmitMR from "../static/img/home/config/SubmitMR.png"
import * as React from "react";
import CreateServerForm from "../form/CreateServerForm";
import ConfigChangeForm from "../form/ConfigChangeForm";
import SubmitMRForm from "../form/SubmitMRForm";

const { Cell } = ResponsiveGrid;
const { Meta } = Card

class IterationInitPage extends react.Component{

    state = {
        createFormVisible: false,
        modifyConfigFormVisible: false,
        submitMRFormVisible: false,
    }

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
        this.owner = this.props.owner
        this.application = this.props.application
        this.iterBranch = this.props.iterBranch
        this.iterTitle = this.props.iterTitle
        this.iterState = this.props.iterState
        this.serverType = this.props.serverType

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

        this.openModifyConfigFButton = ()=> {
            this.setState({
                modifyConfigFormVisible: true
            })
        }
        this.closeModifyConfigFButton = (reason, e) => {
            this.setState({
                modifyConfigFormVisible: false
            })
        }

        this.openSubmitMRFButton = ()=> {
            this.setState({
                submitMRFormVisible: true
            })
        }
        this.closeSubmitMRFButton = (reason, e) => {
            this.setState({
                submitMRFormVisible: false
            })
        }
    }

    newServer = () => {
        this.openCreateServerFButton()
    }
    modifyIterationConfig = () => {
        this.openModifyConfigFButton()
    }
    submitMR = () => {
        this.openSubmitMRFButton()
    }

    render() {
        return(
            <div>
                <ResponsiveGrid gap={20}>

                    <Cell colSpan={12} rowSpan={10}>
                    </Cell>

                    <Cell colSpan={3}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src={NewServer}
                                />
                            }
                            hoverable={true}
                            onClick={this.newServer}
                        >
                            <Meta
                                title="新建服务器"
                                description="new a server for this iteration"
                            />
                        </Card>
                    </Cell>

                    <Cell colSpan={3}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src={IterationConfig}
                                />
                            }
                            hoverable={true}
                            onClick={this.modifyIterationConfig}
                        >
                            <Meta
                                title="配置迭代"
                                description="config for this iteration"
                            />
                        </Card>
                    </Cell>

                    <Cell colSpan={3}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src={PeopleConfig}
                                />
                            }
                            hoverable={true}
                        >
                            <Meta
                                title="成员管理"
                                description="manage group of this iteration"
                            />
                        </Card>
                    </Cell>

                    <Cell colSpan={3}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src={SubmitMR}
                                />
                            }
                            hoverable={true}
                            onClick={this.submitMR}
                        >
                            <Meta
                                title="提交MR"
                                description="change the code"
                            />
                        </Card>
                    </Cell>

                    <Cell colSpan={12}>

                    </Cell>
                </ResponsiveGrid>
                <Drawer title="新建服务器"
                        placement="right"
                        visible={this.state.createFormVisible}
                        onClose={this.closeCreateServerFButton}
                        style={
                            {width: "60%"}
                        }
                >
                    <CreateServerForm appOwner={this.owner} appName={this.application} iterId={this.iterationId} iterTitle={this.iterTitle}
                                      iterationId={this.iterationId} iterState={this.iterState} autoFill={true} serverImage={this.serverType}
                                      iterBranch={this.iterBranch} formCloseCallBack={this.closeCreateServerFButton}
                    />
                </Drawer>

                <Drawer title="更改配置"
                        placement="right"
                        visible={this.state.modifyConfigFormVisible}
                        onClose={this.closeModifyConfigFButton}
                        style={
                            {width: "60%"}
                        }
                >
                    <ConfigChangeForm appOwner={this.owner} appName={this.application} iterId={this.iterationId} iterTitle={this.iterTitle}
                                      iterationId={this.iterationId} autoFill={true} formCloseCallBack={this.closeModifyConfigFButton}
                    />
                </Drawer>

                <Drawer title="提交MR"
                        placement="right"
                        visible={this.state.submitMRFormVisible}
                        onClose={this.closeSubmitMRFButton}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.owner} appName={this.application} iterId={this.iterationId} iterTitle={this.iterTitle} iterBranch={this.iterBranch}
                                  iterationId={this.iterationId} env="dev" autoFill={true} formCloseCallBack={this.closeSubmitMRFButton}
                    />
                </Drawer>
            </div>
        )
    }
}

export default IterationInitPage