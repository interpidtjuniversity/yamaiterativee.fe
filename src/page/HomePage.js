import React, {Component} from 'react';
//全局文件
import './HomePageConfig';
//路由
import {BrowserRouter} from 'react-router-dom';

//布局组件
import HomePageMenu from "./HomePageMenu";//导航
import HomePageContent from './HomePageContent'

//UI-antd-按需引入
import 'antd/dist/antd.css';
import {Layout } from 'antd';

const {
    Sider, Content,
} = Layout;

let screenHeight= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

class HomePage extends Component {
    render() {
        return (
            <div className="App" >
                <BrowserRouter>
                    <Layout>
                        <Sider className="App-customMenu" style={{height:screenHeight}}>
                            <HomePageMenu/>
                        </Sider>
                        <Layout>
                            {/*<Header>Header</Header>*/}
                            <Content className="App-contentMain" style={{height:screenHeight}}>
                                <HomePageContent/>
                            </Content>
                            {/*<Footer>Footer</Footer>*/}
                        </Layout>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}
export default HomePage;
