import React from 'react'
//引入路由
import {Route, Switch} from 'react-router-dom'

class HomePageContent extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/home/workbench' component={global.workbench}/>
					<Route exact path='/home/favorites' component={global.favorites}/>
					<Route exact path='/home/work-items' component={global.works}/>
					<Route exact path='/home/iterations' component={global.iterations}/>
					<Route exact path='/home/applications' component={global.applications}/>
					<Route exact path='/home/release' component={global.release}/>
					<Route exact path='/home/servers' component={global.servers}/>
					<Route exact path='/home/flow-center' component={global.flowcenter}/>
					<Route exact path='/home/iterations/:iterId' component={global.iteration}/>

				</Switch>
			</div>
		)
	}
}

export default HomePageContent