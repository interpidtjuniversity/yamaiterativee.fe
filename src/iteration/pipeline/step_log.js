import React, { Component } from "react";
import {Box, Collapse, Drawer, Tag, List, Avatar, Table} from '@alifd/next';
import ReactDOM from "react-dom";

import '../../static/css/iteration/pipeline/step_log.css'
import JavaPackage from '../../static/img/iteration/pipeline/java_package.png'

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

    onOpen = (t, l) => {
        this.setState({
            title: t,
            log: l,
            visible: true,
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
                            this.state.log["data"]
                            // <pre>
                            //     <span className="nc" id="L40" style={{background:"#ffaaaa"}}>HelloReply reply = HelloReply.newBuilder().setMessage(&quot;Hello ==&gt; &quot; + req.getName() + port.toString()).build();</span>
                            //     <br/>
                            //     <span className="nc" id="L40">HelloReply reply = HelloReply.newBuilder().setMessage(&quot;Hello ==&gt; &quot; + req.getName() + port.toString()).build();</span>
                            //     <br/>
                            // </pre>
                        )
                    }
                    {
                        this.state.log["type"] === 0 && (
                            <LogCollapse log={this.state.log["data"]}/>
                        )
                    }
                    {
                        this.state.log["type"] === 2 && (
                            <JacocoTestReport report={this.state.log["data"]}/>
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
    }

    toPercent(point){
        let str=Number(point*100).toFixed(2);
        str+="%";
        return str;
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

        let pkgTable = <Table dataSource={dataSource}>
            <Table.Column title="fileName" dataIndex="fileName" onClick={()=>{alert("hh")}}/>
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
        ReactDOM.render(pkgTable, packageDetailDiv)


    }

    componentDidMount() {
        if (this.packageMenu.length > 0) {
            this.packageDetail(this.packageMenu[0].title)
        }
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
                    123456789
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

export default StepLog
