import { List } from '@alifd/next';
import React, {Component} from "react";
import axios from "axios";

import store from "../../store/config";

import Step from "./step"

class Steps extends Component {

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
        this.actionState = this.props.actionState
        this.actionId_stageId = this.props.actionId_stageId;
        this.stageId = this.props.stageId
        this.actionId = this.props.actionId
        this.appName = this.props.appName
        this.baseRequestUrl = "/api/v1/iteration/"+this.iterationId+"/action/"+this.actionId+"/stage/"+this.stageId
        this.state = {
            data : []
        }
    }

    componentDidMount() {
        const _this = this
        axios.get(this.baseRequestUrl)
            .then(function (response) {
                //_this.data = response.data
                _this.setState({
                    data: response.data
                })
            })
            .catch(function (error){
            })
    }

    openStepLog(stageId, actionId, title) {
        const data = "stageId is:" + stageId + " actionId is:" + actionId + " title is:" + title
        let stepLog = store.getState().stepLogReducer.stepLogRef
        stepLog.onOpen(data,data)
    }

    render() {
        // this where render twice because state.data will be update by axios, so we optimize it when no data and wait axios complete
        if (this.state.data.length === 0) {
            return (<div/>)
        }
        return (
            <div style={{ width: 250 }}>
                <List
                    size="small"
                    dataSource={this.state.data}
                    renderItem={(item, i) => (
                        <Step index={item.index} stepId={item.stepId} title={item.title} stepImgSrc={item.image} stageId={this.stageId} actionId={this.actionId} iterationId={this.iterationId} link={item.link} appName={this.appName}/>
                    )}
                />
            </div>
        )
    }
}

export default Steps

/**
 * <Icon type="loading" />
 * */