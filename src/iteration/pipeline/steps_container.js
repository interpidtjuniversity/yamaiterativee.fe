import React, {Component} from "react";
import ReactDOM from 'react-dom'
import { Overlay } from '@alifd/next'
import '@alifd/next/dist/next.css';
import '../../static/css/iteration/pipeline/steps_container.css'
import Steps from "./steps";


class StepsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
        this.iterationId = this.props.iterationId
        this.actionId_stageId = this.props.actionId_stageId;
        this.parent = document.getElementById(this.actionId_stageId);
        this.stageId = this.props.stageId
        this.actionId = this.props.actionId
        this.appName = this.props.appName
    }

    onClose = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById(this.actionId_stageId));
    }

    render() {
        return (
            <Overlay visible={this.state.visible}
                     target={this.parent}
                     safeNode={this.parent}
                     onRequestClose={this.onClose}>
                    <span className="steps-overlay">
                        <Steps iterationId={this.iterationId} actionId_stageId={this.actionId_stageId} stageId={this.stageId} actionId={this.actionId} appName={this.appName}/>
                    </span>
            </Overlay>
        );
    }
}

export default StepsContainer