import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import IterationEnv from "./iteration/env/env"
import Pipeline from "./iteration/pipeline/pipeline";
import Steps from "./iteration/pipeline/steps_container";

import 'antd/dist/antd.css';
import './static/css/iteration/pipeline/iconfont.css';
import './static/css/iteration/pipeline/newIconfont.css';

import classic_mr_Data from './data/iteration/pipeline/classic_mr';
import server_apply_Data from "./data/iteration/pipeline/server_apply";

ReactDOM.render(
  <React.StrictMode>
      <IterationEnv/>
      {/*<Pipeline pipelineData={server_apply_Data} pipelineDataCanvasId="1"/>*/}
      <Pipeline pipelineData={classic_mr_Data} pipelineDataCanvasId="2"/>
  </React.StrictMode>,
  document.getElementById('root')
);


