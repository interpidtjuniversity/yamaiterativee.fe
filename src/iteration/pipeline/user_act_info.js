import { Avatar } from '@alifd/next';
import React, { Component } from 'react'
import "../../static/css/iteration/pipeline/user_act_info.css"

class UserActInfo extends Component {

    constructor(props) {
        super(props);
        this.avatarSrc = this.props.avatarSrc
        this.actionInfo = this.props.actionInfo
        this.extInfo = this.props.extInfo
    }

    render() {
        return (
            <div className="user-act-info-container">
                <div className="user-avatar">
                    <Avatar src={this.avatarSrc} shape="circle" size="medium"/>
                </div>
                <div className="user-action">{this.actionInfo}</div>
                {/*<div className="user-action">{this.extInfo}</div>*/}
            </div>
        )
    }
}

export default UserActInfo