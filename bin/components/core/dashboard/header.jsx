import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import { Row, Col } from 'antd';

const HeaderApp = (props)=>(
    <Header style={{ background: '#fff', padding: 0 }}>
        <Row type="flex" justify="space-between">
            <Col>
                {/* <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/> */}
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

                {/* <Icon type="menu-unfold"/> */}
            </Col>
        </Row>
        

    </Header>
);

export default HeaderApp;