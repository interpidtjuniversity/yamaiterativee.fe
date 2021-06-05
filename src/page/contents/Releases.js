import react from 'react'
import {Table, Tag, Select} from 'antd';
import {Box, Button, Message} from "@alifd/next";
import axios from "axios";
import {GithubOutlined} from "@ant-design/icons";
import qs from "qs";

const DeployHistoryReleaseAPI = "/api/v1/home/release/deploy"

const columns = [
    {
        title: '发布标识',
        dataIndex: 'id',
        key: 'id',
        render: (text) => {
            return (
                <span>{text}</span>
            )
        }
    },
    {
        title: '迭代标识',
        dataIndex: 'iterationId',
        key: 'iterationId',
        render: (text) => {
            let url = "/home/iterations/"+text
            return (
                <a href={url}>{text}</a>
            )
        }
    },
    {
        title: '仓库所有者',
        dataIndex: 'ownerName',
        key: 'ownerName',
    },
    {
        title: '仓库名称',
        dataIndex: 'repoName',
        key: 'repoName',
    },
    {
        title: '发布时间',
        key: 'time',
        dataIndex: 'time',
        render: text => <a>{text}</a>,
    },
    {
        title: '发布时间',
        key: 'commitId',
        dataIndex: 'commitId',
        render: (commitId, record) => {
            let prefix = commitId.substring(0,5)
            return(
                <Tag color="green" onClick={() => {
                    window.open(record.commitLink)
                }}>版本标识: {prefix}</Tag>
            )
        }
    },
    {
        title: "部署状态",
        key: "url",
        dataIndex: 'url',
        render: url => {
            return(
                <Tag color="green" onClick={() => {
                    window.open(url)
                }}>就绪</Tag>
            )
        }
    },
    {
        title: "操作",
        render: (record) => {
            return(
                <Button type={"normal"} warning onClick={deploy.bind(this, record.ownerName, record.repoName, record.id)}>部署该版本</Button>
            )
        }
    }
];

function deploy(appOwner, appName, id) {
    let data = {
        ownerName: appOwner,
        repoName: appName,
        releaseId: id,
    }
    axios.post(DeployHistoryReleaseAPI, qs.stringify(data))
        .then(function (response){
            if (response.data === "success") {
                Message.success("部署成功!")
            } else {
                Message.error("部署失败!")
            }
        })
        .catch(function (error){})
    Message.notice("部署任务已提交😀")
}

class Releases extends react.Component{

    state = {
        selectOwnerName: "",
        selectRepoName: "",
        ownerNames: [],
        repoNames: [],
        releaseRecords: [],
    };

    constructor(props) {
        super(props);
        this.GetApplicationReleaseHistoryAPI = "/api/v1/home/release/history"
        this.GetAllRepoOwnersAPI = "/api/v1/home/workbench/newiteration/allusers"
        this.GetOwnerAllReposAPI = "/api/v1/home/workbench/newiteration/ownerrepos/"
    }

    handleOwnerNameChange = selectedItem => {
        this.setState({ selectOwnerName: selectedItem }, ()=>{
            const _this = this
            axios.get(_this.GetOwnerAllReposAPI+selectedItem)
                .then(function (response) {
                    _this.setState({
                        repoNames: response.data
                    })
                })
                .catch(function (error){})
        });
    };
    handleRepoNameChange = selectedItem => {
        this.setState({ selectRepoName: selectedItem }, ()=>{
            const _this = this
            let data = {
                ownerName: _this.state.selectOwnerName,
                repoName: _this.state.selectRepoName,
            }
            axios.post(_this.GetApplicationReleaseHistoryAPI, qs.stringify(data))
                .then(function (response){
                    _this.setState({
                        releaseRecords: response.data
                    })
                })
                .catch(function (error){})
        });
    };

    componentDidMount() {
        const _this = this
        axios.get(_this.GetAllRepoOwnersAPI)
            .then(function (response) {
                _this.setState({
                    ownerNames: response.data
                })
            })
            .catch(function (error) {})
    }

    render() {

        return(
            <div>
                <Box direction="row">
                    <Box>
                        <Tag icon={<GithubOutlined style={{fontSize: 20, marginTop: 5}}/>} color="#3b5999" style={{height: "100%"}}>选择应用</Tag>
                    </Box>
                    <Box>
                        <Select
                            placeholder="用户名"
                            onChange={this.handleOwnerNameChange}
                            style={{ width: '200px' }}
                        >
                            {this.state.ownerNames.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <Select
                            placeholder="仓库名"
                            onChange={this.handleRepoNameChange}
                            style={{ width: '200px' }}
                        >
                            {this.state.repoNames.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Box>
                </Box>
                <Table columns={columns} dataSource={this.state.releaseRecords} />
            </div>
        )
    }
}

export default Releases