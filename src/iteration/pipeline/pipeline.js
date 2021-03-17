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
    pipelineDataCanvasId;

    constructor(props) {
        super(props);
        this.pipelineData = props.pipelineData
        for (let i = 0; i < this.pipelineData['nodes'].length; i++) {
            this.pipelineData['nodes'][i].Class = Stage;
        }
        for (let i = 0; i < this.pipelineData['edges'].length; i++) {
            this.pipelineData['edges'][i].Class = BaseEdge;
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
        this.canvas.draw(this.pipelineData);
        this.canvas.on('events', (event) => {
            if (event['type'] === "node:click") {
                debugger
                const stageId_execId = event['node']['options']['stageId_execId'];
                const stageId = event['node']['options']['stageId'];
                const execId = event['node']['options']['execId'];
                // this div look { @stage.js line40 }
                const div = document.getElementById(stageId_execId);
                ReactDOM.render(<StepsContainer stageId_execId={stageId_execId} stageId={stageId} execId={execId}/>
                    , div);
            }
        });
    }



    render() {
        debugger
        return (
            <div className='schedule'>
                <UserActInfo avatarSrc={this.props.pipelineData.avatarSrc} size="medium" actionInfo={this.props.pipelineData.actionInfo} extInfo={this.props.pipelineData.extInfo}/>
                <div className="schedule-canvas" id={this.props.pipelineDataCanvasId}>
                </div>
            </div>
        )
    }
}
export default Pipeline

