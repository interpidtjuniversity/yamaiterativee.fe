import { Component } from "react";
import "semantic-ui-css/components/label.css"


class IterEnvInfo extends Component{

    constructor(props) {
        super(props);
        this.iterEnvInfo = this.props.iterEnvInfo
        //this.iterEnvInfo.targetBranch = "E202103179999999"
    }

    render() {
        return (
            <div>
                {/*left*/}
                <div style={{position:"absolute", width:600, marginLeft:300}}>
                    <div style={{width: 500}}>
                        <a className={"ui teal large image label"} one-link-mark={"yes"}>
                            <img src="https://semantic-ui.com/images/avatar/small/joe.jpg"/>
                            目标分支:
                            <div className="detail">E202103179999999</div>
                        </a>
                    </div>

                    <div style={{width: 500, marginTop:50}}>
                        <a className={"ui teal large image label"} one-link-mark={"yes"}>
                            <img src="https://semantic-ui.com/images/avatar/small/joe.jpg"/>
                            张启帆 于 1小时前提交
                            <a href={"www.baidu.com"}>ce594s</a>
                            <div className="detail">提交模式MR</div>
                            <div className="detail">服务变更：小</div>
                        </a>
                    </div>
                </div>

                {/*right*/}
                <div style={{marginLeft:900, width:600, marginTop:50}}>
                    <div style={{width: 500}}>
                        <a className={"ui teal large image label"} one-link-mark={"yes"}>
                            <img src="https://semantic-ui.com/images/avatar/small/joe.jpg"/>
                            目标分支:
                            <div className="detail">E202103179999999</div>
                        </a>
                    </div>

                    <div style={{width: 500, marginTop:50}}>
                        <a className={"ui teal large image label"} one-link-mark={"yes"}>
                            <img src="https://semantic-ui.com/images/avatar/small/joe.jpg"/>
                            张启帆 于 1小时前提交
                            <a href={"www.baidu.com"}>ce594s</a>
                            <div className="detail">提交模式MR</div>
                            <div className="detail">服务变更：小</div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};



export default IterEnvInfo;