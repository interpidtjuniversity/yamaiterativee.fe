import react from 'react'
import {Box, List} from "@alifd/next";


class ExecMergeRequestList extends react.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <List
                    size="medium"
                    emptyContent={
                        <div>
                            <img
                                style={{ width: "50%" }}
                                src="https://unpkg.com/@icedesign/empty-content-block@3.0.1/build/assets/dea7e80386f12f4cf023018d9b0c7515.png"
                            />
                            <br />
                            暂无内容
                        </div>
                    }
                    dataSource={this.props.mergeRequestData}
                    renderItem={item => (
                        <List.Item>
                            <Box direction="row" style={{width:"100%"}}>
                                <Box style={{width: "20%"}}>{item.result}</Box>
                                <Box style={{width: "25%"}}>{item.userName}</Box>
                                <Box style={{width: "5%"}}>创建于</Box>
                                <Box style={{width: "25%"}}>{item.time}</Box>
                                <Box style={{width: "25%"}}>{item.actionInfo}</Box>
                            </Box>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default ExecMergeRequestList