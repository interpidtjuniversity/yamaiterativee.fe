import react from 'react'

import {Drawer, ResponsiveGrid} from '@alifd/next';

import {Card} from 'antd'
import NewServer from "../static/img/home/config/NewServer.png"
import IterationConfig from "../static/img/home/config/IterationConfig.png"
import PeopleConfig from "../static/img/home/config/PeopleConfig.png"
import RequirementConfig from "../static/img/home/config/RequirementConfig.png"
import * as React from "react";
import CreateServerForm from "./form/CreateServerForm";

const { Cell } = ResponsiveGrid;
const { Meta } = Card

class IterationInitPage extends react.Component{

    state = {
        createFormVisible: false
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
    }

    newServer = () => {
        this.openCreateServerFButton()
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
                                    src={RequirementConfig}
                                />
                            }
                            hoverable={true}
                        >
                            <Meta
                                title="需求管理"
                                description="config requirement for this iteration"
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
                                      iterBranch={this.iterBranch}
                    />
                </Drawer>
            </div>
        )
    }
}

export default IterationInitPage