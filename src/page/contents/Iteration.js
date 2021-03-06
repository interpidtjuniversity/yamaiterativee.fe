import react from 'react'
import axios from "axios";
import IterationManager from "../IterationManager";


class Iteration extends react.Component{

    state={
        initialized: undefined
    }

    constructor(props) {
        super(props);
        this.iterationId = this.props.match.params.iterId
        this.iterationStateAPI = "/api/v1/iteration/" + this.iterationId + "/info"
    }

    componentDidMount() {
        const _this = this
        axios.get(this.iterationStateAPI).then(function (response) {
            if (response.data.stateArray[0][2] === "wait") {
                _this.setState({
                    initialized: false,
                    owner: response.data.owner,
                    application: response.data.application,
                    iterBranch: response.data.iterBranch,
                    iterTitle: response.data.iterTitle,
                    iterState: response.data.iterState,
                    serverType: response.data.serverType,
                })
            } else {
                _this.setState({
                    initialized: true,
                    owner: response.data.owner,
                    application: response.data.application,
                    iterBranch: response.data.iterBranch,
                    iterTitle: response.data.iterTitle,
                    iterState: response.data.iterState,
                    serverType: response.data.serverType,
                })
            }
        }).catch(function (error){})
    }

    render() {
        debugger
        return(
            <IterationManager initialized={this.state.initialized} iterationId={this.iterationId}
                              application={this.state.application} owner={this.state.owner} iterBranch={this.state.iterBranch}
                              iterTitle={this.state.iterTitle} iterState={this.state.iterState} serverType={this.state.serverType}
            />
        )
    }
}

export default Iteration