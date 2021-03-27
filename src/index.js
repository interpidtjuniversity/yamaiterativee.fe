import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import IterationEnv from "./iteration/env/env"
import IterAction from "./iteration/action/IterAction";
import Pipeline from "./iteration/pipeline/pipeline";
import StepLog from "./iteration/pipeline/step_log";
import IterEnvInfo from "./iteration/info/IterEnvInfo";


import 'antd/dist/antd.css';
import '@alifd/next/dist/next.css';
import './static/css/iteration/pipeline/iconfont.css';
import './static/css/iteration/pipeline/newIconfont.css';

import store from "./store/config";
import {SetStepLogRef} from "./store/constants/steplog_const"

import watch from 'redux-watch'

class IterationPage extends Component {

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
        this.iterationId = 1
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
                return (<Pipeline pipelineData={item} stepLogRef={this.stepLogRef} pipelineDataCanvasId={index}/>)
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
            let info = <IterEnvInfo iterEnvInfo={newVal}/>
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
                <div id="iterEnvPipelineInfoMountDiv"/>
            </div>
        )
    }
}

ReactDOM.render(
    <IterationPage/>,
  document.getElementById('root')
);


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

