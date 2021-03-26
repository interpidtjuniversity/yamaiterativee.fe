import { List, Icon, Avatar } from '@alifd/next';
import { React, Component } from 'react';
import store from "../../store/config";
import TaskExecutor from "../../axios/task/TaskExecutor";
import APIFetcher from "../../axios/task/APIFetcher";

class Step extends Component {

    state = {
        type: "loading",
        color: "#1F49E0"
    }

    constructor(props) {
        super(props);
        this.key = this.props.key
        this.title = this.props.title
        this.stepImgSrc = this.props.stepImgSrc
        this.stageId = this.props.stageId
        this.execId = this.props.execId
    }

    openStepLog(stageId, execId, title) {
        const data = "stageId is:" + stageId + " execId is:" + execId + " title is:" + title
        let stepLog = store.getState().stepLogReducer.stepLogRef
        stepLog.onOpen(data,data)
    }

    componentDidMount() {
        // if pipeline is running
        let fetcher = new APIFetcher("/api/v1/iteration/ping", this.parser, this.callback)
        this.e = new TaskExecutor(fetcher, 5000)
    }

    componentWillUnmount() {
        this.e.kill()
    }

    parser = (response) => {
        return response.data
    }

    callback = (result) => {
        this.setState({
            type: result.type,
            color: result.color
        })
        // if pipeline is done
        // if (result.pipelineStatus == "done") {
        //     this.e.kill()
        // }
    }

    render() {
        return (
            <div style={{height: 60}}>
                <div style={{width: 200, position: "absolute"}}>
                    <List.Item key={this.key} title={this.title} media={<Avatar src={this.stepImgSrc}/>}
                               onClick={() => {
                                   this.openStepLog(this.stageId, this.execId, this.title)
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

