import React, { Component } from "react";
import {Box, Collapse, Drawer, Tag, List, Avatar, Table, Shell} from '@alifd/next';
import { DonutChart } from 'bizcharts';
import ReactDOM from "react-dom";
import axios from "axios";
import qs from "qs";

import '../../static/css/iteration/pipeline/step_log.css'
import JavaPackage from '../../static/img/iteration/pipeline/java_package.png'
import Java from '../../static/img/iteration/pipeline/java.png'
import '../../static/js/iteration/pipeline/prettify'

const { Group: TagGroup } = Tag;

class StepLog extends Component {
    state = {
        visible: false,
        title: "",
        log: {},
        width : "80%",
    };

    constructor(props) {
        super(props);
        this.appName = this.props.appName;
    }

    onOpen = (t, l, actionId, stageId, stepId) => {
        this.setState({
            title: t,
            log: l,
            visible: true,
            actionId: actionId,
            stageId: stageId,
            stepId: stepId,
        });
    };

    onClose = (reason, e) => {
        this.setState({
            visible: false,
            title: "",
            log:{},
        });
    }

    componentDidMount() {
        this.props.onRef(this)
    }


    render() {
        return (
            <div>
                <Drawer
                    title={this.state.title}
                    placement="right"
                    visible={this.state.visible}
                    onClose={this.onClose}
                    width={this.state.width}>
                    {
                        this.state.log["type"] === 1 && (
                            <SimpleLog log={this.state.log["data"]}/>
                        )
                    }
                    {
                        this.state.log["type"] === 0 && (
                            <LogCollapse log={this.state.log["data"]}/>
                        )
                    }
                    {
                        this.state.log["type"] === 2 && (
                            <JacocoTestReport report={this.state.log["data"]} actionId={this.state.actionId} stageId={this.state.stageId} stepId={this.state.stepId}/>
                        )
                    }
                </Drawer>
            </div>
        );
    }
}

class JacocoTestReport extends Component {
    constructor(props) {
        super(props);
        this.report = new Map(Object.entries(this.props.report))
        this.packageMenu = [];
        this.actionId = this.props.actionId
        this.stageId = this.props.stageId
        this.stepId = this.props.stepId
        this.JacocoTestCodeCoveredAPI = "/api/v1/iteration/undefined/action/"+this.actionId+"/stage/"+this.stageId+"/step/"+this.stepId+"/test/codeCovered"
    }

    toPercent(point){
        let str=Number(point*100).toFixed(2);
        str+="%";
        return str;
    }

    queryCoveredFile = (record, index ,e) => {
        const _this = this
        let data = {
            appName: record.group,
            package: record.package,
            fileName: record.fileName
        }
        axios.post(_this.JacocoTestCodeCoveredAPI, qs.stringify(data))
            .then(function (data){
                let fileData = <CodeCoveredPane fileData={data.data} appName={record.appName} package={record.package} fileName={record.fileName}/>
                let fileDataDiv = document.getElementById("packageDetail")
                ReactDOM.unmountComponentAtNode(fileDataDiv)
                ReactDOM.render(fileData, fileDataDiv)
            })
            .catch(function (error){})
    }

    packageDetail = (pkg) => {
        debugger
        let packageData = this.report.get(pkg)
        let dataSource = []
        for (let i=0; i < packageData.length; i++) {
            dataSource.push({
                group: packageData[i].group,
                package:  packageData[i].package,
                fileName: packageData[i].class,
                branchMissed: packageData[i].branchMissed,
                branchCovered: packageData[i].branchCovered,
                branchRatio: this.toPercent(packageData[i].branchCovered/(packageData[i].branchCovered + packageData[i].branchMissed)),
                lineMissed: packageData[i].lineMissed,
                lineCovered: packageData[i].lineCovered,
                lineRatio: this.toPercent(packageData[i].lineCovered/(packageData[i].lineCovered + packageData[i].lineMissed)),
                methodMissed: packageData[i].methodMissed,
                methodCovered: packageData[i].methodCovered,
                methodRatio: this.toPercent(packageData[i].methodCovered/(packageData[i].methodMissed + packageData[i].methodCovered)),
            })
        }

        let pkgTable = <Table dataSource={dataSource} onRowClick={this.queryCoveredFile}>
            <Table.Column title="fileName" dataIndex="fileName"/>
            <Table.Column title="branchMissed" dataIndex="branchMissed"/>
            <Table.Column title="branchCovered" dataIndex="branchCovered"/>
            <Table.Column title="branchRatio" dataIndex="branchRatio"/>
            <Table.Column title="lineMissed" dataIndex="lineMissed"/>
            <Table.Column title="lineCovered" dataIndex="lineCovered"/>
            <Table.Column title="lineRatio" dataIndex="lineRatio"/>
            <Table.Column title="methodMissed" dataIndex="methodMissed"/>
            <Table.Column title="methodCovered" dataIndex="methodCovered"/>
            <Table.Column title="methodRatio" dataIndex="methodRatio"/>
        </Table>

        let packageDetailDiv = document.getElementById("packageDetail")
        ReactDOM.unmountComponentAtNode(packageDetailDiv)
        ReactDOM.render(pkgTable, packageDetailDiv)


    }

    componentDidMount() {
        if (this.packageMenu.length > 0) {
            this.packageDetail(this.packageMenu[0].title)
        }
        let totalBranchMissed = 0;
        let totalBranchCovered = 0;
        let totalLineMissed = 0;
        let totalLineCovered = 0;
        let totalMethodMissed = 0;
        let totalMethodCovered = 0;

        this.report.forEach(function (value, key) {
            for (let i = 0; i<value.length; i++) {
                totalBranchCovered += value[i].branchCovered
                totalBranchMissed += value[i].branchMissed
                totalLineCovered += value[i].lineCovered
                totalLineMissed += value[i].lineMissed
                totalMethodCovered += value[i].methodCovered
                totalMethodMissed += value[i].methodMissed
            }
        })
        let totalBranchRatio = this.toPercent(totalBranchCovered/(totalBranchMissed + totalBranchCovered))
        let totalLineRatio = this.toPercent(totalLineCovered/(totalLineMissed + totalLineCovered))
        let totalMethodRatio = this.toPercent(totalMethodCovered/(totalMethodMissed + totalMethodCovered))
        let testReport = <TestReport totalBranchMissed={totalBranchMissed} totalBranchCovered={totalBranchCovered} totalBranchRatio={totalBranchRatio}
                                     totalLineMissed={totalLineMissed} totalLineCovered={totalLineCovered} totalLineRatio={totalLineRatio}
                                     totalMethodMissed={totalMethodMissed} totalMethodCovered={totalMethodCovered} totalMethodRatio={totalMethodRatio}
        />
        let testReportDiv = document.getElementById("testReport")
        ReactDOM.unmountComponentAtNode(testReportDiv)
        ReactDOM.render(testReport, testReportDiv)

    }

    render() {
        const _this = this
        this.report.forEach(function (value, key) {
            _this.packageMenu.push({
                title: key,
                img: JavaPackage,
            })
        })

        return (
            <Box style={{width: "100%", height: "100%"}} direction='column'>
                <Box style={{height:200, overflow:"auto"}}>
                    <div id="testReport"/>
                </Box>
                <Box style={{height:"80%"}} direction='row'>
                    <Box style={{width:"25%", overflow:"auto"}}>
                        <List size="small" header={<div>Package</div>} dataSource={this.packageMenu} renderItem={(item, i) => (
                            <List.Item key={i} title={item.title} media={<Avatar src={item.img}/>} onClick={() => {
                                this.packageDetail(item.title)
                            }}>
                            </List.Item>
                        )}>
                        </List>
                    </Box>
                    <Box style={{width:"75%", overflow:"auto"}}>
                        <div id="packageDetail"/>
                    </Box>
                </Box>
            </Box>
        )
    }
}


class CodeCoveredPane extends  Component {
    constructor(props) {
        super(props);
        this.fileData = this.props.fileData
        this.appName = this.props.appName
        this.package = this.props.package
        this.fileName = this.props.fileName
    }

    render() {
        return (
            <div>
                <Shell className={"iframe-hack"} style={{ border: "1px solid #eee" }}>
                    <Shell.Branding>
                        <img
                            src={JavaPackage}
                            className="avatar"
                            alt="java_package"
                        />
                        <span style={{ marginLeft: 10 }}>package: {this.package}</span>
                    </Shell.Branding>
                    <Shell.Action>
                        <img
                            src={Java}
                            className="avatar"
                            alt="java"
                        />
                        <span style={{ marginLeft: 10 }}>{this.fileName}.java</span>
                    </Shell.Action>

                    <Shell.Content>
                        <div style={{ minHeight: 1200, background: "#fff" }}>
                            <pre className="source lang-java linenums">
                            {
                                this.fileData.length >0 && (this.fileData.map((value, index) => {
                                    return (
                                        <div key={index} dangerouslySetInnerHTML={{__html:value.content}}/>
                                        )
                                })
                                )
                            }
                            </pre>
                        </div>
                    </Shell.Content>

                    <Shell.Footer>
                        <span>{this.appName}</span>
                        <span>{this.package}</span>
                        <span>{this.fileName}</span>
                    </Shell.Footer>
                </Shell>
            </div>
        );
    }
}

class LogCollapse extends Component {

    constructor(props) {
        super(props);
        // this.log = this.props.log
        this.log = new Map(Object.entries(this.props.log))
        this.dataSource = new Map([]);
        this.colorMap=new Map([["warning","orange"],["error","red"]]);
    }

    changePmd = (key) => {
        let pmdDiv = document.getElementById("pmd")
        ReactDOM.unmountComponentAtNode(pmdDiv)
        ReactDOM.render(this.dataSource.get(key), pmdDiv)
    }

    render() {
        let typeMap = [];
        const _this = this;
        this.log.forEach(function(value, key){
            typeMap.push(<Tag key={key} color={_this.colorMap.get(value[0].type)} type="normal" onClick={_this.changePmd.bind(this, key)}>{key}</Tag>)
            let list = [];
            for(let i=0; i<value.length; i++) {
                list.push({title:value[i].file+":"+value[i].line+"("+value[i].info+")",content:value[i].code})
            }
            _this.dataSource.set(key, <Collapse dataSource={list}/>)
        })

        return (
            <div>
                <div id="tags">
                    <TagGroup>
                    {typeMap}
                    </TagGroup>
                </div>
                <div id="pmd"/>
            </div>
        )
    }
}

class TestReport extends Component {
    constructor(props) {
        super(props);

        this.totalBranchMissed = this.props.totalBranchMissed
        this.totalBranchCovered = this.props.totalBranchCovered
        this.totalBranchRatio = this.props.totalBranchRatio
        this.totalLineMissed = this.props.totalLineMissed
        this.totalLineCovered = this.props.totalLineCovered
        this.totalLineRatio = this.props.totalLineRatio
        this.totalMethodMissed = this.props.totalMethodMissed
        this.totalMethodCovered = this.props.totalMethodCovered
        this.totalMethodRatio = this.props.totalMethodRatio
    }

    render () {
        let branchData = [{type: "覆盖", value: this.totalBranchCovered},{type: "未覆盖", value: this.totalBranchMissed}]
        let lineData = [{type: "覆盖", value: this.totalLineCovered},{type: "未覆盖", value: this.totalLineMissed}]
        let methodData = [{type: "覆盖", value: this.totalMethodCovered},{type: "未覆盖", value: this.totalMethodMissed}]
        return (
            <Box direction="row">
                <Box style={{width:"33%"}}>
                    <DonutChart
                        data={branchData}
                        autoFit
                        height={200}
                        radius={0.8}
                        padding='auto'
                        angleField='value'
                        colorField='type'
                        color={['greenyellow','tomato']}
                        legend={{visible: false}}
                        statistic={{
                            title:{
                                customHtml:()=>{
                                    let all = this.totalBranchMissed+this.totalBranchCovered;
                                    let allRatio = this.totalBranchRatio
                                    return '<div style="font-size:16px; font-family: Georgia, serif"><div>分支数:'+all+'</div>'+'<div>覆盖率:'+allRatio +'</div>' + '</div>'
                                }
                            },
                            content:false
                        }}
                    />
                </Box>
                <Box style={{width:"33%"}}>
                    <DonutChart
                        data={lineData}
                        autoFit
                        height={200}
                        radius={0.8}
                        padding='auto'
                        angleField='value'
                        colorField='type'
                        color={['greenyellow','tomato']}
                        legend={{visible: false}}
                        statistic={{
                            title:{
                                customHtml:()=> {
                                    let all = this.totalLineMissed+this.totalLineCovered;
                                    let allRatio = this.totalLineRatio
                                    return '<div style="font-size:16px; font-family: Georgia, serif"><div>代码行:'+all+'</div>'+'<div>覆盖率:'+allRatio +'</div>' + '</div>'
                                }
                            },
                            content: false
                        }}
                    />
                </Box>
                <Box style={{width:"33%"}}>
                    <DonutChart
                        data={methodData}
                        autoFit
                        height={200}
                        radius={0.8}
                        padding='auto'
                        angleField='value'
                        colorField='type'
                        color={['greenyellow','tomato']}
                        legend={{visible: false}}
                        statistic={{
                            title:{
                                customHtml:()=>{
                                    let all = this.totalMethodMissed+this.totalMethodCovered;
                                    let allRatio = this.totalMethodRatio
                                    return '<div style="font-size:16px; font-family: Georgia, serif"><div>方法数:'+all+'</div>'+'<div>覆盖率:'+allRatio +'</div>' + '</div>'
                                }
                            },
                            content: false
                        }}
                    />
                </Box>
            </Box>

        );
    }
}

class SimpleLog extends Component {
    constructor(props) {
        super(props);
        this.log = this.props.log
    }

    render() {
        return (
            <div>
                <Shell className={"iframe-hack"} style={{ border: "1px solid #eee" }}>
                    <Shell.Content>
                        <div style={{ minHeight: 1200, background: "#fff" }}>
                            <pre>
                                {
                                    this.log !== null && this.log.length > 0 && (
                                        this.log.map((value, index) => {
                                            return (<div key={index}><span>{value.line}</span><br/></div>)
                                        })
                                    )
                                }
                            </pre>
                        </div>
                    </Shell.Content>

                </Shell>
            </div>
        );
    }
}

export default StepLog
