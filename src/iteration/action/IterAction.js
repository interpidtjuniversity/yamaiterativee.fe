import React, { Component } from 'react';
import {Button, Box, Drawer, Message} from '@alifd/next';
import {Popconfirm, message, Input} from 'antd';
import SubmitMRForm from "../../form/SubmitMRForm";
import NewJointDebuggingForm from "../../form/NewJointDebuggingForm";
import TriggerDevPipelineForm from "../../form/TriggerDevPipelineForm";
import ConfigChangeForm from "../../form/ConfigChangeForm";
import CreateServerForm from "../../form/CreateServerForm";
import ReleaseSuccess from "../../static/img/home/workbench/release_success.png"

import axios from "axios";
import qs from "qs";

class IterAction extends Component {

    state = {
        finishDev: false,
        submitMRDev: false,
        jarManageDev: false,
        changeConfigDev: false,
        triggerPipelineDev: false,
        applyServerDev: false,
        jointDebuggingDev: false,

        finishItg: false,
        submitMRItg: false,
        jarManageItg: false,
        triggerPipelineItg: false,
        syncMaster: false,

        finishPre: false,
        submitMRPre: false,
        jarManagePre: false,
        triggerPipelinePre: false,

        finishGray: false,
        whiteList: false,
        blackList: false,
        advanceGray: false,
        rollBackGray: false,
        grayStatus: "success",

        finishProd: false,

    }

    constructor(props) {
        super(props);
        this.actionData = this.props.actionData
        this.iterationId = this.props.iterationId
        this.iterTitle = this.props.iterTitle
        this.iterBranch = this.props.iterBranch
        this.iterState = this.props.iterState
        this.appOwner = this.props.appOwner
        this.appName = this.props.appName
        this.serverType = this.props.serverType
        this.DevAdvanceAPI = "/api/v1/home/iterations/advance/dev"
        this.ItgAdvanceAPI = "/api/v1/home/iterations/advance/itg"
        this.PreAdvanceAPI = "/api/v1/home/iterations/advance/pre"
        this.GrayAdvanceAPI = "/api/v1/home/iterations/advance/gray"
        this.ProdAdvanceAPI = "/api/v1/home/iterations/advance/prod"
        this.syncMasterAPI = "/api/v1/home/iterations/syncMaster"
        this.AdvanceGrayAPI = "/api/v1/home/iterations/gray/advance"
        this.RollBackGrayAPI = "/api/v1/home/iterations/gray/rollback"

        this.devHideMap = new Map([["finishDev", true],["submitMRDev",true],["jarManageDev",true],["changeConfigDev",false],["triggerPipelineDev",true],["applyServerDev",false],["jointDebuggingDev",false]])
        this.itgHideMap = new Map([["finishItg", true],["submitMRItg",true],["jarManageItg",true],["triggerPipelineItg",true],["syncMaster", true]])
        this.preHideMap = new Map([["finishPre", true],["submitMRPre",true],["jarManagePre",true],["triggerPipelinePre",true]])
        this.grayHideMap = new Map([["finishGray", true],["whiteList",true],["blackList",true],["advanceGray",true],["rollBackGray",true]])
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
            case "triggerPipelineDev":
                this.setState({triggerPipelineDev: true})
                break
            case "applyServerDev":
                this.setState({applyServerDev: true})
                break
            case "jointDebuggingDev":
                this.setState({jointDebuggingDev: true})
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
            case "triggerPipelineItg":
                this.setState({triggerPipelineItg:true})
                break
            case "syncMaster":
                this.setState({syncMaster:true})
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
            case "triggerPipelinePre":
                this.setState({triggerPipelinePre:true})
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
            case "advanceGray":
                this.setState({advanceGray:true})
                break
            case "rollBackGray":
                this.setState({rollBackGray:true})
                break
            case "finishProd":
                this.setState({finishProd:true})
                break
        }
    }

    syncMaster = (e) => {
        const _this = this
        let value = {
            iterId : _this.iterationId
        }
        axios.post(_this.syncMasterAPI, qs.stringify(value))
            .then(function (response) {
                if (response.data === "error") {
                    Message.error("同步master代码错误, 请检查冲突!")
                } else {
                    Message.success("同步master代码成功!")
                }
            }).catch(function (error){})
        this.setState({syncMaster: false})
    }
    syncMasterCancel = (e) => {
        this.setState({syncMaster: false})
    }

    advanceGray = (e) => {
        this.setState({advanceGray: false})
        let data = {iterId: this.iterationId}
        const _this = this
        axios.post(_this.AdvanceGrayAPI, qs.stringify(data))
            .then(function (response){
                if (response.data === "error") {
                    Message.error("灰度执行失败!")
                } else if (response.data === "warning") {
                    Message.warning("灰度执行完毕!")
                }
            })
            .catch(function (error){})
        setTimeout(function (){
            location.reload([true])
        }, 5000)
    }
    advanceGrayCancel = (e) => {
        this.setState({advanceGray: false})
    }

    rollBackGray = (e) => {
        this.setState({rollBackGray: false})
        let data = {iterId: this.iterationId}
        const _this = this
        axios.post(_this.RollBackGrayAPI, qs.stringify(data))
            .then(function (response){
                if (response.data === "error") {
                    Message.error("回滚执行失败!")
                } else if (response.data === "warning") {
                    Message.warning("回滚执行完毕!")
                }
            })
            .catch(function (error){})
        setTimeout(function (){
            location.reload([true])
        }, 5000)
    }
    rollBackGrayCancel = (e) => {
        this.setState({rollBackGray: false})
    }

    advance = (type, e) => {
        debugger
        const _this = this
        let value = {
            iterId: _this.iterationId
        }
        let api
        let state
        switch (type){
            case "dev":
                api = _this.DevAdvanceAPI
                break
            case "itg":
                api = _this.ItgAdvanceAPI
                break
            case "pre":
                api = _this.PreAdvanceAPI
                break
            case "gray":
                api = _this.GrayAdvanceAPI
                break
            case "prod":
                api = _this.ProdAdvanceAPI
                break
        }
        axios.post(api, qs.stringify(value))
            .then(function (response) {
                debugger
                if (type==="itg" && response.data === "error") {
                    let msg = "当前分支:"+_this.iterBranch+"合并到master有冲突,请检查!"
                    Message.error(msg)
                } else if (type === "gray" && response.data === "error"){
                    let msg = "当前迭代:"+_this.iterationId+"灰度未完成,请先推进!"
                    Message.error(msg)
                } else {
                    location.reload([true])
                }
            }).catch(function (error){})
        this.setState({finishDev: false,finishItg: false,finishPre: false,finishGray: false})
    }

    advanceCancel = (type, e) => {
        switch (type){
            case "dev":
                this.setState({finishDev: false})
                break
            case "itg":
                this.setState({finishItg: false})
                break
            case "pre":
                this.setState({finishPre: false})
                break
            case "gray":
                this.setState({finishGray: false})
                break
            case "prod":
                this.setState({finishProd: false})
                break
        }
    }

    render() {

        this.actions = this.actionData.map((item, index) => {
            if (item.type < this.iterState) {
                if (item.type === 0) {
                    return <Button type={"primary"} key={index} disabled={this.devHideMap.get(item.id)}
                                   onClick={this.openDialog.bind(this, item.id)}>{item.buttonShowWords}</Button>
                } else if (item.type === 1) {
                    return <Button type={"primary"} key={index} disabled={this.itgHideMap.get(item.id)}
                                   onClick={this.openDialog.bind(this, item.id)}>{item.buttonShowWords}</Button>
                } else if (item.type === 2) {
                    return <Button type={"primary"} key={index} disabled={this.preHideMap.get(item.id)}
                                   onClick={this.openDialog.bind(this, item.id)}>{item.buttonShowWords}</Button>
                } else if (item.type === 3) {
                    return <Button type={"primary"} key={index} disabled={this.grayHideMap.get(item.id)}
                                   onClick={this.openDialog.bind(this, item.id)}>{item.buttonShowWords}</Button>
                } else if (item.type === 4) {
                    return <img alt="finishProd" src={ReleaseSuccess} style={{width: "100%", height:"100%"}}/>
                }
            } else {
                return <Button type={"primary"} key={index}
                               onClick={this.openDialog.bind(this, item.id)}>{item.buttonShowWords}</Button>
            }
        })

        return (
            <div>
                <Box direction={"row"} spacing={20}>
                    {this.actions}
                </Box>
                {/*dev*/}
                <Popconfirm
                    title="确认要完成开发阶段吗?"
                    placement="bottomLeft"
                    visible={this.state.finishDev}
                    onConfirm={this.advance.bind(this, "dev")}
                    onCancel={this.advanceCancel.bind(this, "dev")}
                    okText="Yes"
                    cancelText="No"
                    style={{width: 100, height:100}}
                />

                <Drawer title="提交MR"
                        placement="right"
                        visible={this.state.submitMRDev}
                        onClose={() => {this.setState({submitMRDev: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} iterBranch={this.iterBranch}
                                  iterationId={this.iterationId} env="dev" autoFill={true} formCloseCallBack={() => {this.setState({submitMRDev: false})}}
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
                    <SubmitMRForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} env="dev"
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
                    <ConfigChangeForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} iterBranch={this.iterBranch}
                                            iterationId={this.iterationId} env="dev" autoFill={true} formCloseCallBack={() => {this.setState({submitMRDev: false})}}
                    />
                </Drawer>
                <Drawer title="触发pipeline"
                        placement="right"
                        visible={this.state.triggerPipelineDev}
                        onClose={() => {this.setState({triggerPipelineDev: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <TriggerDevPipelineForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} iterBranch={this.iterBranch}
                                  iterationId={this.iterationId} iterState={this.iterState} env="dev" autoFill={true} formCloseCallBack={() => {this.setState({triggerPipelineDev: false})}}
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
                    <CreateServerForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} iterState={this.iterState}
                                  iterationId={this.iterationId} serverImage={this.serverType} autoFill={true} formCloseCallBack={() => {this.setState({applyServerDev: false})}}
                    />
                </Drawer>
                <Drawer title="联调环境"
                        placement="right"
                        visible={this.state.jointDebuggingDev}
                        onClose={() => {this.setState({jointDebuggingDev: false})}}
                        style={
                            {width: "100%"}
                        }
                >
                    <NewJointDebuggingForm iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({jointDebuggingDev: false})}}
                    />
                </Drawer>

                {/*itg*/}
                <Popconfirm
                    title="确认要完成集成阶段吗?"
                    placement="bottomLeft"
                    visible={this.state.finishItg}
                    onConfirm={this.advance.bind(this, "itg")}
                    onCancel={this.advanceCancel.bind(this, "itg")}
                    okText="Yes"
                    cancelText="No"
                    style={{width: 100, height:100}}
                />
                <Drawer title="提交MR"
                        placement="right"
                        visible={this.state.submitMRItg}
                        onClose={() => {this.setState({submitMRItg: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} iterBranch={this.iterBranch}
                                  iterationId={this.iterationId} env="itg" autoFill={true} formCloseCallBack={() => {this.setState({submitMRItg: false})}}
                    />
                </Drawer>
                <Drawer title="Jar包管理"
                        placement="right"
                        visible={this.state.jarManageItg}
                        onClose={() => {this.setState({jarManageItg: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} env="itg"
                                  iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({jarManageItg: false})}}
                    />
                </Drawer>
                <Drawer title="触发pipeline"
                        placement="right"
                        visible={this.state.triggerPipelineItg}
                        onClose={() => {this.setState({triggerPipelineItg: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <TriggerDevPipelineForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} iterBranch={this.iterBranch}
                                            iterationId={this.iterationId} iterState={this.iterState} env="itg" autoFill={true} formCloseCallBack={() => {this.setState({triggerPipelineItg: false})}}
                    />
                </Drawer>
                <Popconfirm
                    title="现在同步master代码吗?"
                    placement="bottomLeft"
                    visible={this.state.syncMaster}
                    onConfirm={this.syncMaster}
                    onCancel={this.syncMasterCancel}
                    okText="Yes"
                    cancelText="No"
                    style={{marginLeft:500}}
                />


                {/*pre*/}
                <Popconfirm
                    title="确认要完成预发阶段吗?"
                    placement="bottomLeft"
                    visible={this.state.finishPre}
                    onConfirm={this.advance.bind(this, "pre")}
                    onCancel={this.advanceCancel.bind(this, "pre")}
                    okText="Yes"
                    cancelText="No"
                    style={{width: 100, height:100}}
                />
                <Drawer title="提交MR"
                        placement="right"
                        visible={this.state.submitMRPre}
                        onClose={() => {this.setState({submitMRPre: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} iterBranch={this.iterBranch}
                                  iterationId={this.iterationId} env="pre" autoFill={true} formCloseCallBack={() => {this.setState({submitMRPre: false})}}
                    />
                </Drawer>
                <Drawer title="Jar包管理"
                        placement="right"
                        visible={this.state.jarManagePre}
                        onClose={() => {this.setState({jarManagePre: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <SubmitMRForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} env="pre"
                                  iterationId={this.iterationId} autoFill={true} formCloseCallBack={() => {this.setState({jarManagePre: false})}}
                    />
                </Drawer>
                <Drawer title="触发pipeline"
                        placement="right"
                        visible={this.state.triggerPipelinePre}
                        onClose={() => {this.setState({triggerPipelinePre: false})}}
                        style={
                            {width: "60%"}
                        }
                >
                    <TriggerDevPipelineForm appOwner={this.appOwner} appName={this.appName} iterId={this.iterationId} iterTitle={this.iterTitle} iterBranch="master"
                                            iterationId={this.iterationId} iterState={this.iterState} env="pre" autoFill={true} formCloseCallBack={() => {this.setState({triggerPipelinePre: false})}}
                    />
                </Drawer>

                {/*gary*/}
                <Popconfirm
                    title="确认要完成灰度阶段吗?"
                    placement="bottomLeft"
                    visible={this.state.finishGray}
                    onConfirm={this.advance.bind(this, "gray")}
                    onCancel={this.advanceCancel.bind(this, "gray")}
                    okText="Yes"
                    cancelText="No"
                    style={{width: 100, height:100}}
                />

                <Popconfirm
                    title="确认要继续推进吗?"
                    placement="bottomLeft"
                    visible={this.state.advanceGray}
                    onConfirm={this.advanceGray}
                    onCancel={this.advanceGrayCancel}
                    okText="Yes"
                    cancelText="No"
                    style={{width: 100, height:100}}
                />

                <Popconfirm
                    title="确认要回滚吗?"
                    placement="bottomLeft"
                    visible={this.state.rollBackGray}
                    onConfirm={this.rollBackGray}
                    onCancel={this.rollBackGrayCancel}
                    okText="Yes"
                    cancelText="No"
                    style={{width: 100, height:100}}
                />

                <Popconfirm
                    title="确认完成发布吗?"
                    placement="bottomLeft"
                    visible={this.state.finishProd}
                    onConfirm={this.advance.bind(this, "prod")}
                    onCancel={this.advanceCancel.bind(this, "prod")}
                    okText="Yes"
                    cancelText="No"
                    style={{width: 100, height:100}}
                />


            </div>
        )
    }
}


export default IterAction