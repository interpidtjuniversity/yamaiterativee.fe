import react from 'react'

import User from "../../data/user";

class WorkBench extends react.Component{

    constructor(props) {
        super(props)
        this.helloWords = User.userName+" 下午好， 又是忙碌的一天"
    }

    render() {
        return(
            <div>{this.helloWords}</div>
        )
    }
}

export default WorkBench