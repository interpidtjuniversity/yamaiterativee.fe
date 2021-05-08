import react from 'react'

import { ResponsiveGrid } from '@alifd/next';

import {Card} from 'antd'
import NewServer from "../static/img/home/config/NewServer.png"
import IterationConfig from "../static/img/home/config/IterationConfig.png"
import PeopleConfig from "../static/img/home/config/PeopleConfig.png"
import RequirementConfig from "../static/img/home/config/RequirementConfig.png"

const { Cell } = ResponsiveGrid;
const { Meta } = Card

class IterationInitPage extends react.Component{

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
        this.iterationId = this.props.iterationId
        this.application = this.props.application
    }

    newServer = () => {
        alert("new server")
    }

    render() {
        return(
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
        )
    }
}

export default IterationInitPage