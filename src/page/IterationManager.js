import react from 'react'g
import IterationPage from "./IterationPage";
import IterationInitPage from "./IterationInitPage";


class IterationManager extends react.Component{

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
    }

    render() {
        debugger
        if (this.props.initialized === true) {
            return(
                <IterationPage iterationId={this.iterationId}/>
            )
        } else if (this.props.initialized === false) {
            return(
                <IterationInitPage iterationId={this.iterationId}/>
            )
        } else {
            return (
                <div>404</div>
            )
        }
    }
}

export default IterationManager