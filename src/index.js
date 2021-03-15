import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import IterationEnv from "./iteration/env/env"
import Pipeline from "./iteration/pipeline/pipeline";
import StepLog from "./iteration/pipeline/step_log";


import 'antd/dist/antd.css';
import './static/css/iteration/pipeline/iconfont.css';
import './static/css/iteration/pipeline/newIconfont.css';

import { Provider } from '@tarojs/redux'

import store from "./store/config";
import {Set} from "./store/constants/steplog_const"

import classic_mr_Data from './data/iteration/pipeline/classic_mr';
import server_apply_Data from "./data/iteration/pipeline/server_apply";

class IterationPage extends Component {

    stepLogOnRef = (ref) => {
        store.dispatch({
            type: Set,
            stepRef: ref,
        })
    }

    render() {
        return (
            <React.StrictMode>
                <IterationEnv/>
                <StepLog onRef={this.stepLogOnRef}/>
                {/*<Pipeline pipelineData={server_apply_Data} pipelineDataCanvasId="1"/>*/}
                <Pipeline pipelineData={classic_mr_Data} pipelineDataCanvasId="2" stepLogRef={this.stepLogRef}/>

            </React.StrictMode>
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

