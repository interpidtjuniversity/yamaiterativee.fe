import { Step } from '@alifd/next';
import React, {Component} from "react";
import '@alifd/next/dist/next.css';
import data from "../../data/iteration/env/iteration_env"

class IterationEnv extends Component{
    steps = data.map((item, index) => <Step.Item aria-current={index === 1 ? 'step' : null} key={index} title={item[0]} content={item[1]}/>);

    render() {
        return (
            <div>
                <Step current={1} shape="arrow">
                    {this.steps}
                </Step>
            </div>
        )
    }
}

export default IterationEnv
