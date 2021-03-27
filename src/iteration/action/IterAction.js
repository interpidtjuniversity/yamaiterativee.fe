import React, { Component } from 'react';
import { Button, Box } from '@alifd/next';


class IterAction extends Component {

    constructor(props) {
        super(props);
        this.actionData = this.props.actionData
    }

    render() {
        this.actions = this.actionData.map((item, index) => {
            return <Button type={"primary"} key={index}>{item.buttonShowWords}</Button>
        })

        return (
            <div>
                <Box direction={"row"} spacing={20}>
                    {this.actions}
                </Box>
            </div>
        )
    }
}


export default IterAction