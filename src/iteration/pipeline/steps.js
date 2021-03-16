import { List, Avatar } from '@alifd/next';
import React, {Component} from "react";
import axios from "axios";

import store from "../../store/config";

class Steps extends Component {

    constructor(props) {
        super(props);
        this.stageId_execId = this.props.stageId_execId;
        this.stageId = this.props.stageId
        this.execId = this.props.execId
        this.baseRequestUrl = "/api/v1/iteration/pipeline/"+this.stageId
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

    openStepLog(stageId, execId, title) {
        const data = "stageId is:" + stageId + " execId is:" + execId + " title is:" + title
        let stepLog = store.getState().stepLogReducer.stepLogRef
        stepLog.onOpen(data,data)
    }

    render() {
        return (
            <div style={{ width: 288 }}>
                <List
                    size="small"
                    dataSource={this.state.data}
                    renderItem={(item, i) => (
                        <List.Item
                            key={i}
                            title={item.title}
                            media={<Avatar src={item.img}
                            onClick={() => this.openStepLog(this.stageId, this.execId, item.title)}
                            />}
                        >
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Steps