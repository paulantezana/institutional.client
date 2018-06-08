import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import Aside from './dashboard/aside.jsx';
import HeaderApp from './dashboard/header.jsx';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: false
        };
        this.onToggleSide = this.onToggleSide.bind(this);
    }

    onToggleSide(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(){
        return (
            <Layout>
                <Aside collapsed={this.state.collapsed}/>
                <Layout>
                    <HeaderApp onToggleSide={this.onToggleSide} collapsed={this.state.collapsed}/>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            { this.props.children }
                        </div>
                    </Content>
                </Layout>
                
            </Layout>
        )
    }
}

export default App;