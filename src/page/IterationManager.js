import react from 'react'
import IterationPage from "./IterationPage";
import IterationInitPage from "./IterationInitPage";


class IterationManager extends react.Component{

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
        this.application = this.props.application
        this.owner = this.props.owner
    }

    render() {
        if (this.props.initialized === true) {
            return(
                <IterationPage iterationId={this.iterationId} owner={this.owner} application={this.application}/>
            )
        } else if (this.props.initialized === false) {
            return(
                <IterationInitPage iterationId={this.iterationId} owner={this.owner} application={this.application}/>
            )
        } else {
            return (
                <div>404</div>
            )
        }
    }
}

export default IterationManager