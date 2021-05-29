import react from 'react'
import {Box, List} from "@alifd/next";
import {Tag} from "antd";
import AvatarList from "ant-design-pro/lib/AvatarList";
import React from "react";

require("../../../static/css/home/Iterations.css")


class LatestIterationList extends react.Component {
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
                    dataSource={this.props.iterationData}
                    renderItem={item => (
                        <List.Item>
                            <Box direction="row" style={{width:"100%"}}>
                                <Box style={{width: "20%"}}>{item.iterTitle}</Box>
                                <Box style={{width: "30%"}}>
                                    <Tag color="success" onClick={()=>{
                                        this.props.gotoIterationDetails(item.iterId)
                                    }}>
                                        <div style={{textAlign: "center"}}>
                                            {item.iterContent}
                                        </div>
                                    </Tag>
                                </Box>
                                <Box style={{width: "30%"}}>
                                    <div className="iterations-box-wrapper">
                                        <AvatarList size="default" maxLength={3} excessItemsStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }} style={{margin: "0 auto"}}>
                                            {
                                                item.members.map((member, index) => (
                                                    <AvatarList.Item
                                                        tips={member.name}
                                                        src={member.avatar}
                                                    />
                                                ))
                                            }
                                        </AvatarList>
                                    </div>
                                </Box>
                            </Box>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default LatestIterationList