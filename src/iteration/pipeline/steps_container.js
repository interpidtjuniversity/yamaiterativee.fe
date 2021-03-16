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
        this.stageId_execId = this.props.stageId_execId;
        this.parent = document.getElementById(this.stageId_execId);
        this.stageId = this.props.stageId
        this.execId = this.props.execId
    }

    onClose = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById(this.stageId_execId));
    }

    render() {
        return (
            <Overlay visible={this.state.visible}
                     target={this.parent}
                     safeNode={this.parent}
                     onRequestClose={this.onClose}>
                    <span className="steps-overlay">
                        <Steps stageId_execId={this.stageId_execId} stageId={this.stageId} execId={this.execId}/>
                    </span>
            </Overlay>
        );
    }
}

export default StepsContainer