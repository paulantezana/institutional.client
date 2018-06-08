import React, { Component } from "react";
import PropTypes from 'prop-types';

import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import { Row, Col } from 'antd';

const HeaderApp = (props)=>(
    <Header style={{ background: '#fff', padding: 0 }}>
        <Row type="flex" justify="space-between">
            <Col>
                <Icon className="trigger" type={props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={props.onToggleSide}/>
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

HeaderApp.prototype = {
    onToggleSide:  PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
}

export default HeaderApp;