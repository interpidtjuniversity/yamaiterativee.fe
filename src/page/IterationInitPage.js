import react from 'react'
import IterationPage from "./IterationPage";


class IterationInitPage extends react.Component{

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
    }

    render() {
        return(
            <div>{this.iterationId}</div>
        )
    }
}

export default IterationInitPage