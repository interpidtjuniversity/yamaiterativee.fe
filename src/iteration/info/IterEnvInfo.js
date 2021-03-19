import { Component } from "react";
import "semantic-ui-css/components/label.css"
import "semantic-ui-css/components/icon.css"


class IterEnvInfo extends Component{

    constructor(props) {
        super(props);
        this.iterEnvInfo = this.props.iterEnvInfo
    }

    render() {
        return (
            <div>
                {/*left*/}
                <div style={{position:"absolute", width:900, marginLeft:300}}>
                    <div style={{width: 500}}>
                        <a className={"ui teal medium image label"} one-link-mark={"yes"}>
                            <img src="https://semantic-ui.com/images/avatar/small/joe.jpg"/>
                            目标分支:
                            {/*<div className="detail">E202103179999999</div>*/}
                            <div className="detail">{this.iterEnvInfo.targetBranch}</div>
                        </a>
                    </div>

                    <div style={{width: 500, marginTop:50}}>
                        <a className={"ui teal medium image label"} one-link-mark={"yes"}>
                            <img src="https://semantic-ui.com/images/avatar/small/joe.jpg"/>
                            张启帆 于 1小时前提交
                            {/*<a href={"www.baidu.com"}>ce594s</a>*/}
                            {/*<div className="detail">提交模式MR</div>*/}
                            {/*<div className="detail">服务变更：小</div>*/}
                            <a href={"www.baidu.com"}>{this.iterEnvInfo.latestCommit}</a>
                            <div className="detail">提交模式: {this.iterEnvInfo.latestMode}</div>
                            <div className="detail">服务变更：{this.iterEnvInfo.serviceChange}</div>
                        </a>
                    </div>
                </div>

                {/*right*/}
                <div style={{marginLeft:900, width:600, marginTop:50}}>
                    <div style={{width: 200, position: "absolute", height:100}}>
                        <div>
                            <div>
                                <div style={{position:"absolute", width:50, height:50, marginTop:10}}>
                                    <i className="big red rocket icon"/>
                                </div>
                                <a className={"ui teal medium image label"} one-link-mark={"yes"} style={{marginLeft:30, marginTop:10}}>
                                    <div className="detail">PullRequest</div>
                                </a>
                            </div>
                            <div>
                                <div style={{position:"absolute", width:50, height:50, marginTop:10}}>
                                    <i className="big green check icon"/>
                                </div>
                                <a className={"ui teal medium image label"} one-link-mark={"yes"} style={{marginLeft:30, marginTop:10}}>
                                    {/*<div className="detail">全部完成: 100</div>*/}
                                    <div className="detail">全部完成: {this.iterEnvInfo.PRCount}</div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div style={{width: 200, position: "absolute", height:100, marginLeft:200}}>
                        <i className={"big green sync icon"} style={{marginTop: 30, position: "absolute"}}/>
                        <a className={"ui teal large image label"} one-link-mark={"yes"} style={{marginLeft:40, marginTop:25}}>
                            <div className="detail">质量分: {this.iterEnvInfo.qualityScore}</div>
                        </a>
                    </div>
                    <div style={{width: 300, height:100, marginLeft: 400}}>
                        <i className={"big green sync icon"} style={{marginTop: 30, position: "absolute"}}/>
                        <a className={"ui teal large image label"} one-link-mark={"yes"} style={{marginLeft:40, marginTop:25}}>
                            <div className="detail">变更行覆盖率: {this.iterEnvInfo.changeLineCoverage}</div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};



export default IterEnvInfo;