import react from 'react'

import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import AvatarList from 'ant-design-pro/lib/AvatarList';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import {Card} from 'antd'
import User from "../../data/user";
import axios from "axios";
import {Box, Pagination} from "@alifd/next";


require("../../static/css/home/Iterations.css")

const { TweenOneGroup } = TweenOne;

class Iterations extends react.Component{

    constructor(props) {
        super(props);
        this.state = {
            hoverNum: null,
            isMobile: false,
            iterations: [],
            iterationsShow: [],
        };
        this.pointPos = [
            { x: -30, y: -10 },
            { x: 20, y: -20 },
            { x: -65, y: 15 },
            { x: -45, y: 80 },
            { x: 35, y: 5 },
            { x: 50, y: 50, opacity: 0.2 },
        ];
        this.GetAllUserIterationsAPI = "/api/v1/home/iterations/user/"+User.userName+"/all"
    }
    onMouseOver = (i) => {
        this.setState({
            hoverNum: i,
        });
    }
    onMouseOut = () => {
        this.setState({
            hoverNum: null,
        });
    }
    getEnter = (e) => {
        const i = e.index;
        const r = (Math.random() * 2) - 1;
        const y = (Math.random() * 10) + 5;
        const delay = Math.round(Math.random() * (i * 50));
        return [
            {
                delay, opacity: 0.4, ...this.pointPos[e.index], ease: 'easeOutBack', duration: 300,
            },
            {
                y: r > 0 ? `+=${y}` : `-=${y}`,
                duration: (Math.random() * 1000) + 2000,
                yoyo: true,
                repeat: -1,
            }];
    }

    gotoIterationDetails = (id) => {
        this.props.history.push({pathname:"/home/iterations/"+id})
    }

    nextIterationPage = (value) => {
        this.setState({
            iterationsShow: this.state.iterations.slice((value-1)*8, value*8)
        })
    }

    componentDidMount() {
        const _this = this
        axios.get(this.GetAllUserIterationsAPI).then(function (response) {
            let show = response.data.slice(0, 8)
            _this.setState({
                iterations: response.data,
                iterationsShow: show,
            })
        }).catch(function (error){})
    }

    render() {
        const { hoverNum } = this.state;
        let children = [[], [], []];
        this.state.iterationsShow.forEach((item, i) => {
            const isHover = hoverNum === i;
            const pointChild = [
                'point-0 left', 'point-0 right',
                'point-ring', 'point-1', 'point-2', 'point-3',
            ].map(className => (
                <TweenOne
                    component="i"
                    className={className}
                    key={className}
                    style={{
                        background: item.color,
                        borderColor: item.color,
                    }}
                />
            ));
            const child = (
                <li key={i.toString()} >
                    <Card
                        className="iterations-box"
                        onMouseEnter={() => { this.onMouseOver(i); }}
                        onMouseLeave={this.onMouseOut}
                        hoverable={true}
                        onClick={this.gotoIterationDetails.bind(this, item.id)}
                    >
                        <TweenOneGroup
                            className="iterations-point-wrapper"
                            enter={this.getEnter}
                            leave={{
                                x: 0, y: 30, opacity: 0, duration: 300, ease: 'easeInBack',
                            }}
                        >
                            {(this.state.isMobile || isHover) && pointChild}
                        </TweenOneGroup>
                        <div
                            className="iterations-image"
                            style={{
                                boxShadow: `${isHover ? '0 12px 24px' :
                                    '0 6px 12px'} ${'rgba(245,34,45,.12)'}`,
                            }}
                        >
                            <img src={item.src} alt="img" style={i === 4 ? { marginLeft: -15 } : {}} />
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <p>??????: {item.owner}.{item.application}</p>
                        <p>??????: {item.state}</p>
                        <div className="iterations-box-wrapper">
                            <AvatarList size="default" maxLength={3} excessItemsStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }} style={{margin: "0 auto"}}>
                                {
                                    item.members.map((member, index) => (
                                        <AvatarList.Item
                                            tips={member.name}
                                            src={member.url}
                                        />
                                    ))
                                }
                            </AvatarList>
                        </div>
                    </Card>
                </li>
            );
            children[Math.floor(i / 4)].push(child);
        });

        children = children.map((item, i) => (
            <QueueAnim
                className="iterations-box-wrapper"
                key={i.toString()}
                type="bottom"
                leaveReverse
                delay={[i * 100, (children.length - 1 - i) * 100]}
                component="ul"
            >
                {item}
            </QueueAnim>
        ));
        return (
            <div className="iterations" >
                <div className="home-page-wrapper" id="iterations-wrapper">
                    <div className="title-line-wrapper iterations-line">
                        <div className="title-line" />
                    </div>
                    <OverPack>
                        {children}
                    </OverPack>
                </div>
                <div>
                    <Pagination size={"large"} pageSize={8} total={this.state.iterations.length} defaultCurrent={1} onChange={this.nextIterationPage} style={{position:'fixed', marginLeft:"59%", top:"82%"}}/>
                </div>
            </div>
        );
    }
}

export default Iterations