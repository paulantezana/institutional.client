import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;


import { Row, Col } from 'antd';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    
    render(){
        return (
            <Layout>

                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ background: '#fff' }}>
                    <div className="logo" />
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="vertical" style={{ height: '100%' }}>
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="book" /><span>Institucional</span></span>}>
                            <Menu.Item key="3">Carreras</Menu.Item>
                            <Menu.Item key="4">Semestres</Menu.Item>
                            <Menu.Item key="5">Modulos</Menu.Item>
                            <Menu.Item key="5">Alumnos</Menu.Item>
                            <Menu.Item key="5">Profesores</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="book" /><span>Matriculas</span></span>} >
                            <Menu.Item key="6">Ratificacion</Menu.Item>
                            <Menu.Item key="8">Ingresante</Menu.Item>
                            <Menu.Item key="8">Reinicio</Menu.Item>
                            <Menu.Item key="8">Traslado</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="book" /><span>Certificacion</span></span>} >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="book" /><span>Notas</span></span>} >
                            <Menu.Item key="6">Constancia de notas</Menu.Item>
                            <Menu.Item key="8">Ficha de seguimiento</Menu.Item>
                            <Menu.Item key="8">Certificacion</Menu.Item>
                            <Menu.Item key="8">Constancia de estudios</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" title={<span><Icon type="book" /><span>Practicas</span></span>} >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6" title={<span><Icon type="book" /><span>Administracion</span></span>} >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub7" title={<span><Icon type="book" /><span>Unidad</span></span>} >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>


                        <Row type="flex" justify="space-between">
                            <Col>
                                <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
                            </Col>
                            <Col>
                                <Badge count={8} dot>
                                    <Icon type="bell" />
                                </Badge>
                                <Badge count={1} dot>
                                    <Icon type="wechat"/>
                                </Badge>
                                <Badge count={5} dot>
                                    <Icon type="global" />
                                </Badge>
                                <Menu title={<span><Icon type="book" /><span>Notas</span></span>}>
                                    <Menu.Item key="2">
                                        <Icon type="desktop" />
                                        <span>Option 2</span>
                                    </Menu.Item>
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
    }
}


export default Home;