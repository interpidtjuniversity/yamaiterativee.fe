import React, { Component } from "react";
import { Button, Drawer } from '@alifd/next';



class StepLog extends Component {
    state = {
        visible: false,
        title: "",
        log: "",
    };

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
            log:"",
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
                    onClose={this.onClose}>
                    {this.state.log}
                </Drawer>
            </div>
        );
    }
}

export default StepLog
