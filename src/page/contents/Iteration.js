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
        this.owner = this.props.location.query.owner
        this.application = this.props.location.query.application
        this.iterationStateAPI = "/api/v1/iteration/"+this.iterationId+"/info"
    }

    componentDidMount() {
        const _this = this
        axios.get(this.iterationStateAPI).then(function (data) {
            if (data.data[0][2] === "wait") {
                _this.setState({
                    initialized: false
                })
            } else {
                _this.setState({
                    initialized: true
                })
            }
        }).catch(function (error){})
    }

    render() {
        console.log("tigger")
        return(
            <IterationManager initialized={this.state.initialized} iterationId={this.iterationId}
                              application={this.application} owner={this.owner}
            />
        )
    }
}

export default Iteration