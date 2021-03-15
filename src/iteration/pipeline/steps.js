import { List, Avatar } from '@alifd/next';
import React, {Component} from "react";
import axios from "axios";

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
        debugger
        const _this = this
        axios.get(this.baseRequestUrl)
            .then(function (response) {
                //_this.data = response.data
                _this.setState({
                    data: response.data
                })
                debugger
            })
            .catch(function (error){
            })
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
                            media={<Avatar src={item.img} />}
                        >
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Steps