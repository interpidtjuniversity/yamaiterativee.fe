import { List, Icon, Avatar } from '@alifd/next';
import { React, Component } from 'react';
import store from "../../store/config";
import TaskExecutor from "../../axios/task/TaskExecutor";
import APIFetcher from "../../axios/task/APIFetcher";
import IterationChildrenState from "./const";
import axios from "axios";
import qs from "qs";

class Step extends Component {

    state = {
        type: "loading",
        color: "#1F49E0"
    }

    constructor(props) {
        super(props)
        this.index = this.props.index
        this.title = this.props.title
        this.stepId = this.props.stepId
        this.stepImgSrc = this.props.stepImgSrc
        this.stageId = this.props.stageId
        this.actionId = this.props.actionId
        this.iterationId = this.props.iterationId
        this.key = this.stageId+"_"+this.actionId+"_"+this.title
        this.link = this.props.link
        this.appName = this.props.appName
        this.const = new IterationChildrenState()
        this.stepStateRequestUrl = "/api/v1/iteration/"+this.iterationId+"/action/"+this.actionId+"/stage/"+this.stageId+"/step/"+this.stepId+"/state"
        this.stepLogRequestUrl = "/api/v1/iteration/"+this.iterationId+"/action/"+this.actionId+"/stage/"+this.stageId+"/step/"+this.stepId+"/log"
    }

    openStepLog(stageId, actionId, title) {
        const _this = this
        let data = {appName: this.appName}
        axios.post(_this.stepLogRequestUrl, qs.stringify(data))
            .then(function (response){
                let stepLog = store.getState().stepLogReducer.stepLogRef
                stepLog.onOpen(title, response.data, _this.actionId, _this.stageId, _this.stepId)
            })
            .catch(function (error){})
    }

    componentDidMount() {
        // if pipeline is running
        let fetcher = new APIFetcher(this.stepStateRequestUrl, this.parser, this.callback)
        this.e = new TaskExecutor(fetcher, 5000)
    }

    componentWillUnmount() {
        this.e.kill()
    }

    parser = (response) => {
        return response.data
    }

    callback = (result) => {
        console.log(result)
        this.setState({
            type: this.const.StepIconMap.get(result),
            color: this.const.ColorMap.get(result)
        })
        if (result === this.const.StepStateFailure || result === this.const.StepStateFinish || result === this.const.StepStateCanceled) {
            this.e.kill()
        }
    }

    render() {
        return (
            <div style={{height: 60}}>
                <div style={{width: 200, position: "absolute"}}>
                    <List.Item key={this.stepId} title={this.title} media={<Avatar src={this.stepImgSrc}/>}
                               onClick={() => {
                                   if (this.link !== "") {
                                       const w = window.open('about:blank');
                                       w.location.href = this.link
                                   } else {
                                       this.openStepLog(this.stageId, this.actionId, this.title)
                                   }
                               }}
                    />
                </div>
                <div style={{marginLeft: 200}}>
                    <Icon type={this.state.type} style={{color:this.state.color, marginTop:15}}/>
                </div>
            </div>
        )
    }
}

export default Step

