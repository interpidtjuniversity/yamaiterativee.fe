import React, { Component } from 'react';
import {Button, Box, Drawer} from '@alifd/next';
import SubmitMRForm from "../../form/SubmitMRForm";
import NewJointDebuggingForm from "../../form/NewJointDebuggingForm";


class IterAction extends Component {

    state = {
        finishDev: false,
        submitMRDev: false,
        jarManageDev: false,
        changeConfigDev: false,
        tigerPipelineDev: false,
        applyServerDev: false,
        newJointDebuggingDev: false,

        finishItg: false,
        submitMRItg: false,
        jarManageItg: false,
        tigerPipelineItg: false,

        finishPre: false,
        submitMRPre: false,
        jarManagePre: false,
        tigerPipelinePre: false,

        finishGray: false,
        whiteList: false,
        blackList: false,
        flowControl: false,

        finishProd: false,

    }

    constructor(props) {
        super(props);
        this.actionData = this.props.actionData
        this.iterationId = this.props.iterationId
    }

    openDialog(id) {
        switch (id) {
            case "finishDev":
                this.setState({finishDev: true})
                break
            case "submitMRDev":
                this.setState({submitMRDev: true})
                break
            case "jarManageDev":
                this.setState({jarManageDev:true})
                break
            case "changeConfigDev":
                this.setState({changeConfigDev: true})
                break
            case "tigerPipelineDev":
                this.setState({tigerPipelineDev: true})
                break
            case "applyServerDev":
                this.setState({applyServerDev: true})
                break
            case "newJointDebuggingDev":
                this.setState({newJointDebuggingDev: true})
                 break
            case "finishItg":
                this.setState({finishItg:true})
                break
            case "submitMRItg":
                this.setState({submitMRItg:true})
                break
            case "jarManageItg" :
                this.setState({jarManageItg: true})
                break
            case "tigerPipelineItg":
                this.setState({tigerPipelineItg:true})
                break
            case "finishPre":
                this.setState({finishPre:true})
                break
            case "submitMRPre":
                this.setState({submitMRPre:true})
                break
            case "jarManagePre":
                this.setState({jarManagePre:true})
                break
            case "tigerPipelinePre":
                this.setState({tigerPipelinePre:true})
                break
            case "finishGray":
                this.setState({finishGray:true})
                break
            case "whiteList":
                this.setState({whiteList:true})
                break
            case "blackList":
                this.setState({blackList:true})
                break
            case "flowControl":
                this.setState({flowControl:true})
                break
            case "finishProd":
                this.setState({finishProd:true})
                break
        }
    }

    render() {
        this.actions = this.actionData.map((item, index) => {
            return <Button type={"primary"} key={index} onClick={this.openDialog.bind(this, item.id)}>{item.buttonShowWords}</Button>
        })

        return (
            <div>
                <Box direction={"row"} spacing={20}>
                    {this.actions}
                </Box>
                {/*dev*/}
                <Drawer title="完成开发阶段"
                        placement="right"
                        visible={this.state.finishDev}
                        onClose={() => {this.setState({finishDev: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.owner} appName={this.application} iterId={this.iterationId} iterTitle={this.iterTitle}
                                  iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({finishDev: false})}}
                    />
                </Drawer>
                <Drawer title="提交MR"
                        placement="right"
                        visible={this.state.submitMRDev}
                        onClose={() => {this.setState({submitMRDev: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.owner} appName={this.application} iterId={this.iterationId} iterTitle={this.iterTitle}
                                  iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({submitMRDev: false})}}
                    />
                </Drawer>
                <Drawer title="Jar包管理"
                        placement="right"
                        visible={this.state.jarManageDev}
                        onClose={() => {this.setState({jarManageDev: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.owner} appName={this.application} iterId={this.iterationId} iterTitle={this.iterTitle}
                                  iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({jarManageDev: false})}}
                    />
                </Drawer>
                <Drawer title="配置变更"
                        placement="right"
                        visible={this.state.changeConfigDev}
                        onClose={() => {this.setState({changeConfigDev: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.owner} appName={this.application} iterId={this.iterationId} iterTitle={this.iterTitle}
                                  iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({changeConfigDev: false})}}
                    />
                </Drawer>
                <Drawer title="触发pipeline"
                        placement="right"
                        visible={this.state.tigerPipelineDev}
                        onClose={() => {this.setState({tigerPipelineDev: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.owner} appName={this.application} iterId={this.iterationId} iterTitle={this.iterTitle}
                                  iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({tigerPipelineDev: false})}}
                    />
                </Drawer>
                <Drawer title="申请服务器"
                        placement="right"
                        visible={this.state.applyServerDev}
                        onClose={() => {this.setState({applyServerDev: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.owner} appName={this.application} iterId={this.iterationId} iterTitle={this.iterTitle}
                                  iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({applyServerDev: false})}}
                    />
                </Drawer>
                <Drawer title="新建联调环境"
                        placement="right"
                        visible={this.state.newJointDebuggingDev}
                        onClose={() => {this.setState({newJointDebuggingDev: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <NewJointDebuggingForm iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({newJointDebuggingDev: false})}}
                    />
                </Drawer>



                {/*pre*/}
            </div>
        )
    }
}


export default IterAction