import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import Aside from './dashboard/aside.jsx';
import HeaderApp from './dashboard/header.jsx';

const App = (props) => (
    <Layout>

        <Sider trigger={null} collapsible collapsed={props.collapsed} style={{ background: '#fff' }}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={['1']} mode="vertical" style={{ height: '100%' }}>
                <Menu.Item key="1">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                </Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="database" /><span>Institucional</span></span>}>
                    <Menu.Item key="2">Carreras</Menu.Item>
                    <Menu.Item key="3">Semestres</Menu.Item>
                    <Menu.Item key="4">Modulos</Menu.Item>
                    <Menu.Item key="5">Alumnos</Menu.Item>
                    <Menu.Item key="6">Profesores</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="rocket" /><span>Matriculas</span></span>} >
                    <Menu.Item key="7">Ratificacion</Menu.Item>
                    <Menu.Item key="8">Ingresante</Menu.Item>
                    <Menu.Item key="9">Reinicio</Menu.Item>
                    <Menu.Item key="10">Traslado</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="api" /><span>Certificacion</span></span>} >
                    <Menu.Item key="11">Team 1</Menu.Item>
                    <Menu.Item key="12">Team 2</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="book" /><span>Notas</span></span>} >
                    <Menu.Item key="13">Constancia de notas</Menu.Item>
                    <Menu.Item key="14">Ficha de seguimiento</Menu.Item>
                    <Menu.Item key="15">Certificacion</Menu.Item>
                    <Menu.Item key="16">Constancia de estudios</Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" title={<span><Icon type="bulb" /><span>Practicas</span></span>} >
                    <Menu.Item key="17">Team 1</Menu.Item>
                    <Menu.Item key="18">Team 2</Menu.Item>
                </SubMenu>
                <SubMenu key="sub6" title={<span><Icon type="qrcode" /><span>Administracion</span></span>} >
                    <Menu.Item key="19">Team 1</Menu.Item>
                    <Menu.Item key="20">Team 2</Menu.Item>
                </SubMenu>
                <SubMenu key="sub7" title={<span><Icon type="setting" /><span>Unidad</span></span>} >
                    <Menu.Item key="21">Team 1</Menu.Item> 
                    <Menu.Item key="22">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="23">
                    <Icon type="file" />
                    <span>File</span>
                </Menu.Item>
            </Menu>
        </Sider>

        <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
                <Row type="flex" justify="space-between">
                    <Col>
                        <Icon className="trigger" type={props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={props.toggle(props.collapsed)}/>
                    </Col>
                    <Col>
                        {/* <Badge count={8} dot>
                            <Icon type="bell" />
                        </Badge>
                        <Badge count={1} dot>
                            <Icon type="wechat"/>
                        </Badge>
                        <Badge count={5} dot>
                            <Icon type="global" />
                        </Badge> */}
                        <Menu mode="horizontal">
                            <SubMenu key="sub1" title={<span><Icon type="book" /><span>Institucional</span></span>}>
                                <Menu.Item key="3">Carreras</Menu.Item>
                                <Menu.Item key="4">Semestres</Menu.Item>
                                <Menu.Item key="5">Modulos</Menu.Item>
                                <Menu.Item key="5">Alumnos</Menu.Item>
                                <Menu.Item key="5">Profesores</Menu.Item>
                            </SubMenu>
                        </Menu>

                        <Icon type="menu-unfold"/>
                    </Col>
                </Row>
                

            </Header>
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    Bill is a cat.
                </div>
            </Content>
        </Layout>
        
    </Layout>
)

const mapStateToProps = state => ({
    // collapsed: state.collapsed
});

const mapDispatchToProps = dispatch => ({
    toggle(collapsed){
        dispatch({
            type: "TOGGLE_SIDE",
            collapsed: !collapsed
        })
    }
});

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);