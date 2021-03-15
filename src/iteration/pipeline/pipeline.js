import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import { Canvas } from 'butterfly-dag';
import '../../static/css/iteration/pipeline/pipeline.css';
import 'butterfly-dag/dist/index.css';
import Stage from './stage';
import BaseEdge from "./edge";
import UserActInfo from "./user_act_info";
import StepsContainer from "./steps_container";


class Pipeline extends Component {
    pipelineData;
    pipelineDataCanvasId;

    constructor(props) {
        super(props);
        for (let i = 0; i < props.pipelineData['nodes'].length; i++) {
            props.pipelineData['nodes'][i].Class = Stage;
        }
        for (let i = 0; i < props.pipelineData['edges'].length; i++) {
            props.pipelineData['edges'][i].Class = BaseEdge;
        }
    }
    componentDidMount() {
        let root = document.getElementById(this.props.pipelineDataCanvasId);
        this.canvas = new Canvas({
            root: root,
            disLinkable: false, // 可删除连线
            linkable: false,    // 可连线
            draggable: false,   // 可拖动
            zoomable: false,    // 可放大
            moveable: false,    // 可平移
            theme: {
                edge: {
                    type: 'AdvancedBezier',
                }
            }
        });
        this.canvas.draw(this.props.pipelineData);
        this.canvas.on('events', (event) => {
            if (event['type'] === "node:click") {
                debugger
                const stageId_execId = event['node']['options']['stageId_execId'];
                const stageId = event['node']['options']['stageId'];
                const execId = event['node']['options']['execId'];
                const div = document.getElementById(stageId_execId);
                ReactDOM.render(<StepsContainer stageId_execId={stageId_execId} stageId={stageId} execId={execId}/>
                    , div);
            }
        });
    }



    render() {
        return (
            <div className='schedule'>
                <UserActInfo avatarSrc="https://img.alicdn.com/tfs/TB1QS.4l4z1gK0jSZSgXXavwpXa-1024-1024.png" size="medium" actionInfo="张启帆 给MR：#999999 的源分支提交代码触发了Pipeline #10000000"/>
                <div className="schedule-canvas" id={this.props.pipelineDataCanvasId}>
                </div>
            </div>
        )
    }
}
export default Pipeline

