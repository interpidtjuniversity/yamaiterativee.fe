import { Step } from '@alifd/next';
import React, {Component} from "react";
import '@alifd/next/dist/next.css';
import axios from "axios";
import store from "../../store/config";
import {SetIterEnvPipelineInfo} from "../../store/constants/iter_env_pipelineinfo_const";
import {SetIterEnvActionInfo} from "../../store/constants/iter_env_action_const";

const envMap = new Map([[0, 'dev'], [1, 'itg'], [2, 'pre'], [3, 'grayscale'], [4, 'release']]);

class IterationEnv extends Component{

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
        this.baseRequestUrl = "/api/v1/iteration/"+this.iterationId+"/info"
        this.pipelineRequestUrl = "/api/v1/iteration/"+this.iterationId+"/"
        this.actionRequestUrl = "api/v1/iteration/action/"
    }

    state = {
        current: 0,         // dev environment
        steps:undefined
    };

    componentDidMount() {
        const _this = this
        const _envMap = envMap
        axios.get(this.baseRequestUrl)
            .then(function (response) {
                let cur = 0
                for(let index=0; index < response.data.length; index++) {
                    if (response.data[index][2] === 'process') {
                        cur = index
                        break
                    }
                }
                _this.setState({
                    steps: response.data.map((item, index) => <Step.Item key={index} title={item[0]} content={item[1]} onClick={(i,s) => _this.switchStep(index, item[2])}/>),
                    current: cur
                })

                //get env action
                axios.get(_this.actionRequestUrl+_envMap.get(cur))
                    .then(function (envActionInfo){
                        store.dispatch({
                            type: SetIterEnvActionInfo,
                            iterEnvActionInfo: envActionInfo.data,
                        })
                    })
                    .catch(function (error){})

                // get env base


                // get env pipeline
                axios.get(_this.pipelineRequestUrl+_envMap.get(cur))
                    .then(function (envPipelineInfo){
                        store.dispatch({
                            type: SetIterEnvPipelineInfo,
                            iterEnvPipelineInfo: envPipelineInfo.data,
                        })
                    })
                    .catch(function (error){})

            })
            .catch(function (error){
            })
    }

    switchStep(index, status) {
        if(index === this.state.current) {
            return
        }
        if (status!=='wait') {
            const _this = this
            const _envMap = envMap

            //get env action
            axios.get(_this.actionRequestUrl+_envMap.get(index))
                .then(function (envActionInfo){
                    store.dispatch({
                        type: SetIterEnvActionInfo,
                        iterEnvActionInfo: envActionInfo.data,
                    })
                })
                .catch(function (error){})

            // get env pipeline
            axios.get(_this.pipelineRequestUrl+_envMap.get(index))
                .then(function (envPipelineInfo){
                    store.dispatch({
                        type: SetIterEnvPipelineInfo,
                        iterEnvPipelineInfo: envPipelineInfo.data,
                    })
                })
                .catch(function (error){})

            this.setState({
                current: index
            })
        }
    }

    render() {
        return (
            <div>
                <Step current={this.state.current} shape="arrow">
                    {this.state.steps}
                </Step>
            </div>
        )
    }
}

export default IterationEnv
