import react from 'react'
import {Box, List} from "@alifd/next";


class DefaultList extends react.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <List
                    size="small"
                    emptyContent={
                        <div>
                            <img
                                style={{ width: "10%" }}
                                src="https://unpkg.com/@icedesign/empty-content-block@3.0.1/build/assets/dea7e80386f12f4cf023018d9b0c7515.png"
                            />
                            <br />
                            暂无内容
                        </div>
                    }
                    dataSource={this.props.data}
                />
            </div>
        )
    }
}

export default DefaultList