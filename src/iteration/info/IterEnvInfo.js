import { Component } from "react";
import "semantic-ui-css/components/label.css"
import "semantic-ui-css/components/icon.css"
import {Progress, Spin} from "antd";
import {Box, Button} from "@alifd/next";
import APIFetcher from "../../axios/task/APIFetcher";
import TaskExecutor from "../../axios/task/TaskExecutor";


class IterEnvInfo extends Component{

    state = {
        advanceGrayState: false,
        rollBackGrayState: false,
        grayPercent: ""
    }

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
        this.iterEnvInfo = this.props.iterEnvInfo
        debugger
        this.imageAlt = "null"

        this.GetIterationAdvanceGrayStateAPI = "/api/v1/home/iterations/gray/state/advance/"+this.iterationId
        this.GetIterationRollBackGrayStateAPI = "/api/v1/home/iterations/gray/state/rollback/"+this.iterationId
    }

    componentDidMount() {
        if (this.iterEnvInfo.type === "grayscale") {
            this.setState({
                advanceGrayState: this.iterEnvInfo.advanceGrayState,
                rollBackGrayState: this.iterEnvInfo.rollBackGrayState,
                grayPercent: this.iterEnvInfo.grayPercent,
            })
            if (this.iterEnvInfo.advanceGrayState === true) {
                let advanceFetcher = new APIFetcher(this.GetIterationAdvanceGrayStateAPI, this.serverDataParser, this.advanceCallBack)
                this.advanceE = new TaskExecutor(advanceFetcher, 5000)
            }
            if (this.iterEnvInfo.rollBackGrayState === true) {
                let rollBackFetcher = new APIFetcher(this.GetIterationRollBackGrayStateAPI, this.serverDataParser, this.rollBackCallBack)
                this.rollBackE = new TaskExecutor(rollBackFetcher, 5000)
            }
        }
    }

    serverDataParser = (response) => {
        return response.data;
    }

    advanceCallBack =(result) => {
        if (result.state === false) {
            this.advanceE.kill()
            this.setState({
                advanceGrayState: false,
                grayPercent:result.percent
            })
        }
    }
    rollBackCallBack =(result) => {
        if (result.state === false) {
            this.rollBackE.kill()
            this.setState({
                rollBackGrayState: false,
                grayPercent:result.percent
            })
        }
    }

    render() {
        debugger
        if (this.iterEnvInfo.type === "dev" || this.iterEnvInfo.type === "itg" || this.iterEnvInfo.type === "pre") {
            return (
                <div>
                    {/*left*/}
                    <div style={{position: "absolute", width: 900, marginLeft: 300}}>
                        <div style={{width: 500}}>
                            <div className={"ui teal medium image label"}>
                                <img src="https://semantic-ui.com/images/avatar/small/joe.jpg" alt={this.imageAlt}/>
                                目标分支:
                                {/*<div className="detail">E202103179999999</div>*/}
                                <div className="detail">{this.iterEnvInfo.targetBranch}</div>
                            </div>
                        </div>

                        <div style={{width: 500, marginTop: 50}}>
                            <div className={"ui teal medium image label"}>
                                <img src="https://semantic-ui.com/images/avatar/small/joe.jpg" alt={this.imageAlt}/>
                                张启帆 于 1小时前提交
                                {/*<a href={"www.baidu.com"}>ce594s</a>*/}
                                {/*<div className="detail">提交模式MR</div>*/}
                                {/*<div className="detail">服务变更：小</div>*/}
                                <a href={this.iterEnvInfo.latestCommitLink}
                                   rel={"noopener noreferrer external"}>{this.iterEnvInfo.latestCommit}</a>
                                <div className="detail">提交模式: {this.iterEnvInfo.latestMode}</div>
                                <div className="detail">服务变更：{this.iterEnvInfo.serviceChange}</div>
                            </div>
                        </div>
                    </div>

                    {/*right*/}
                    <div style={{marginLeft: 900, width: 600, marginTop: 50}}>
                        <div style={{width: 200, position: "absolute", height: 100}}>
                            <div>
                                <div>
                                    <div style={{position: "absolute", width: 50, height: 50, marginTop: 10}}>
                                        <i className="big red rocket icon"/>
                                    </div>
                                    <div className={"ui teal medium image label"}
                                         style={{marginLeft: 30, marginTop: 10}}>
                                        <div className="detail">PullRequest</div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{position: "absolute", width: 50, height: 50, marginTop: 10}}>
                                        <i className="big green check icon"/>
                                    </div>
                                    <div className={"ui teal medium image label"}
                                         style={{marginLeft: 30, marginTop: 10}}>
                                        {/*<div className="detail">全部完成: 100</div>*/}
                                        <div className="detail">全部完成: {this.iterEnvInfo.PRCount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{width: 200, position: "absolute", height: 100, marginLeft: 200}}>
                            <i className={"big green sync icon"} style={{marginTop: 30, position: "absolute"}}/>
                            <div className={"ui teal large image label"} style={{marginLeft: 40, marginTop: 25}}>
                                <div className="detail">质量分: {this.iterEnvInfo.qualityScore}</div>
                            </div>
                        </div>
                        <div style={{width: 300, height: 100, marginLeft: 400}}>
                            <i className={"big green sync icon"} style={{marginTop: 30, position: "absolute"}}/>
                            <div className={"ui teal large image label"} style={{marginLeft: 40, marginTop: 25}}>
                                <div className="detail">变更行覆盖率: {this.iterEnvInfo.changeLineCoverage}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.iterEnvInfo.type === "grayscale") {

            return (
                <Box direction="row" spacing={100} style={{marginLeft:"40%"}}>
                    <Box style={{marginTop:"20%"}}>
                        <div>
                            <Progress
                                strokeColor={{
                                    '0%': '#e92910',
                                    '100%': '#87d068',
                                }}
                                status="active"
                                type="dashboard" percent={this.state.grayPercent} format={percent => {
                                    if (this.state.advanceGrayState === true) {
                                        return <Spin>灰度执行中</Spin>
                                    } else if (this.state.rollBackGrayState === true) {
                                        return <Spin>回滚执行中</Spin>
                                    } else {
                                        return `${percent}%`
                                    }
                            }}/>
                        </div>
                    </Box>
                </Box>
            )
        } else if (this.iterEnvInfo.type === "prod") {

        }
        return <div/>
    }
};



export default IterEnvInfo;