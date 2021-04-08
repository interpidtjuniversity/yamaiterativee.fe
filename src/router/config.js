//Loadable插件需使用Loading
import Loadable from 'react-loadable'
import Loading from './Loading'


global.workbench = Loadable({
	loader: () => import('../page/contents/WorkBench'),
	loading: Loading,
});

global.favorites = Loadable({
	loader: () => import('../page/contents/Favorites'),
	loading: Loading,
});

global.works = Loadable({
	loader: () => import('../page/contents/WorkItems'),
	loading: Loading,
});

global.iterations= Loadable({
	loader: () => import('../page/contents/Iterations'),
	loading: Loading,
});

global.applications= Loadable({
	loader: () => import('../page/contents/Applications'),
	loading: Loading,
});

global.release= Loadable({
	loader: () => import('../page/contents/Releases'),
	loading: Loading,
});


global.servers= Loadable({
	loader: () => import('../page/contents/Servers'),
	loading: Loading,
});


global.flowcenter= Loadable({
	loader: () => import('../page/contents/FlowCenter'),
	loading: Loading,
});