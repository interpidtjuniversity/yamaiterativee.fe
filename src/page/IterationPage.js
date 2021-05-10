import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse } from '@alifd/next'
import '../static/css/iteration/IterationPage.css';

import IterationEnv from "../iteration/env/env"
import IterAction from "../iteration/action/IterAction";
import Pipeline from "../iteration/pipeline/pipeline";
import StepLog from "../iteration/pipeline/step_log";
import IterEnvInfo from "../iteration/info/IterEnvInfo";


import 'antd/dist/antd.css';
import '@alifd/next/dist/next.css';
import '../static/css/iteration/pipeline/iconfont.css';
import '../static/css/iteration/pipeline/newIconfont.css';

import store from "../store/config";
import {SetStepLogRef} from "../store/constants/steplog_const"

import watch from 'redux-watch'

const Panel = Collapse.Panel

class IterationPage extends Component {

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
        this.owner = this.props.owner
        this.application = this.props.application
        this.iterBranch = this.props.iterBranch
        this.iterTitle = this.props.iterTitle
        this.iterState = this.props.iterState
        this.serverType = this.props.serverType
    }


    stepLogOnRef = (ref) => {
        store.dispatch({
            type: SetStepLogRef,
            stepRef: ref,
        })
    }

    componentDidMount() {
        let iterEnvPipelineInfoWatcher = watch(store.getState, 'iterEnvPipelineInfoReducer.iterEnvPipelineInfo')
        store.subscribe(iterEnvPipelineInfoWatcher((newVal, oldVal, objectPath) => {
            console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
            let iterEnvPipelineInfoMountDiv = document.getElementById("iterEnvPipelineInfoMountDiv")
            ReactDOM.unmountComponentAtNode(iterEnvPipelineInfoMountDiv)
            let pipelines = newVal.map((item, index) => {
                return (
                    <Collapse style={{marginLeft:100, width:1400, background: "#F8F8F8"}}>
                        <Panel title={item.actionInfo}>
                            <Pipeline iterationId={this.iterationId} pipelineData={item} stepLogRef={this.stepLogRef} pipelineDataCanvasId={index}/>
                        </Panel>
                    </Collapse>
                    )
            })
            ReactDOM.render(pipelines, iterEnvPipelineInfoMountDiv)
        }))

        let iterEnvActionInfoWatcher = watch(store.getState, 'iterEnvActionInfoReducer.iterEnvActionInfo')
        store.subscribe(iterEnvActionInfoWatcher((newVal, oldVal, objectPath) => {
            console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
            let iterEnvActionInfoMountDiv = document.getElementById("iterEnvActionInfoMountDiv")
            ReactDOM.unmountComponentAtNode(iterEnvActionInfoMountDiv)
            let actions = <IterAction actionData={newVal}/>
            ReactDOM.render(actions, iterEnvActionInfoMountDiv)
        }))

        let iterEnvBaseInfoWatcher = watch(store.getState, 'iterEnvBaseInfoReducer.iterEnvBaseInfo')
        store.subscribe(iterEnvBaseInfoWatcher((newVal, oldVal, objectPath) => {
            console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
            let iterEnvBaseInfoMountDiv = document.getElementById("iterEnvBaseInfoMountDiv")
            ReactDOM.unmountComponentAtNode(iterEnvBaseInfoMountDiv)
            let info = <IterEnvInfo iterEnvInfo={newVal} iterationId={this.iterationId}/>
            ReactDOM.render(info, iterEnvBaseInfoMountDiv)
        }))
    }

    render() {
        return (
            <div>
                <IterationEnv iterationId={this.iterationId}/>
                <StepLog onRef={this.stepLogOnRef}/>

                {/*挂载操作按钮*/}
                <div id={"iterEnvActionInfoMountDiv"}/>

                {/*挂载迭代信息(请求量, 质量)*/}
                <div id={"iterEnvBaseInfoMountDiv"}/>

                {/*挂载环境下触发的pipeline信息*/}
                <div id="iterEnvPipelineInfoMountDiv" style={{marginTop:20}}/>
            </div>
        )
    }
}

export default IterationPage


// ReactDOM.render(
//     <React.StrictMode>
//         <IterationEnv/>
//         <StepLog/>
//         {/*<Pipeline pipelineData={server_apply_Data} pipelineDataCanvasId="1"/>*/}
//         <Pipeline pipelineData={classic_mr_Data} pipelineDataCanvasId="2"/>
//
//     </React.StrictMode>,
//     document.getElementById('root')
// );

