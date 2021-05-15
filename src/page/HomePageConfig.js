//全局样式
import '../static/css/home/HomePage.css';
//全局路由文件
export * from '../router/config'
//临时变量
global.menus = [
    {
        title: '工作台',
        icon: 'page',
        key: '/home/workbench'
    },
    // {
    //     title: '我的收藏',
    //     icon: 'favorites',
    //     key: '/home/favorites',
    // },
    // {
    //     title: '我的工作项',
    //     icon: 'works',
    //     key: '/home/work-items',
    // },
    {
        title: '迭代',
        icon: 'iterations',
        key: '/home/iterations',
    },
    {
        title: '应用',
        icon: 'applications',
        key: '/home/applications'
    },
    {
        title: '发布',
        icon: 'release',
        key: '/home/release'
    },
    {
        title: '服务器',
        icon: 'servers',
        key: '/home/servers'
    },
    // {
    //     title: '流程中心',
    //     icon: 'flow-center',
    //     key: '/home/flow-center'
    // }
]