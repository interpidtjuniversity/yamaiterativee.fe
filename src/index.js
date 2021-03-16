import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import IterationEnv from "./iteration/env/env"
import Pipeline from "./iteration/pipeline/pipeline";
import StepLog from "./iteration/pipeline/step_log";


import 'antd/dist/antd.css';
import './static/css/iteration/pipeline/iconfont.css';
import './static/css/iteration/pipeline/newIconfont.css';

import store from "./store/config";
import {SetStepLogRef} from "./store/constants/steplog_const"

import watch from 'redux-watch'

import classic_mr_Data from './data/iteration/pipeline/classic_mr';
import server_apply_Data from "./data/iteration/pipeline/server_apply";

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
        let w = watch(store.getState, 'iterEnvPipelineInfoReducer.iterEnvPipelineInfo')
        store.subscribe(w((newVal, oldVal, objectPath) => {
            console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
            let iterEnvPipelineInfoMountDiv = document.getElementById("iterEnvPipelineInfoMountDiv")
            ReactDOM.unmountComponentAtNode(iterEnvPipelineInfoMountDiv)
            let pipelines = newVal.map((item, index) => {
                return (<Pipeline pipelineData={item} stepLogRef={this.stepLogRef} pipelineDataCanvasId={index}/>)
            })
            ReactDOM.render(pipelines, iterEnvPipelineInfoMountDiv)
        }))
    }

    render() {
        return (
            <div>
                <IterationEnv iterationId={this.iterationId}/>
                <StepLog onRef={this.stepLogOnRef}/>
                <div id="iterEnvPipelineInfoMountDiv"/>
                {/*<Pipeline pipelineData={server_apply_Data} stepLogRef={this.stepLogRef} pipelineDataCanvasId={1}/>*/}
                {/*<Pipeline pipelineData={classic_mr_Data} stepLogRef={this.stepLogRef} pipelineDataCanvasId={2}/>*/}

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

