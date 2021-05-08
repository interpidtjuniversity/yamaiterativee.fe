import react from 'react'
import IterationPage from "./IterationPage";
import IterationInitPage from "./IterationInitPage";


class IterationManager extends react.Component{

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
    }

    render() {
        if (this.props.initialized === true) {
            return(
                <IterationPage iterationId={this.iterationId} owner={this.props.owner} application={this.props.application} iterBranch={this.props.iterBranch}/>
            )
        } else if (this.props.initialized === false) {
            return(
                <IterationInitPage iterationId={this.iterationId} owner={this.props.owner} application={this.props.application} iterBranch={this.props.iterBranch}/>
            )
        } else {
            return (
                <div>404</div>
            )
        }
    }
}

export default IterationManager