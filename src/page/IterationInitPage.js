import react from 'react'

import { ResponsiveGrid } from '@alifd/next';
const { Cell } = ResponsiveGrid;

class IterationInitPage extends react.Component{

    constructor(props) {
        super(props);
        this.iterationId = this.props.iterationId
    }

    render() {
        return(
            <ResponsiveGrid gap={20}>

                <Cell colSpan={12} rowSpan={1}>
                    <div>4654646</div>
                </Cell>

                <Cell colSpan={3}>
                    <div>4654646</div>
                </Cell>

                <Cell colSpan={3}>
                    <div>4654646</div>
                </Cell>

                <Cell colSpan={3}>
                    <div>4654646</div>
                </Cell>

                <Cell colSpan={3}>
                    <div>4654646</div>
                </Cell>

                <Cell colSpan={12}>
                    <div>4654646</div>
                </Cell>
            </ResponsiveGrid>
        )
    }
}

export default IterationInitPage