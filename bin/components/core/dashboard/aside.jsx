import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { Layout, Menu,  Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const Aside = (props)=>(
    <Sider trigger={null} collapsible collapsed={props.collapsed} style={{ background: '#fff' }} collapsedWidth="0">
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="vertical" style={{ height: '100%' }}>
            <Menu.Item key="1">
                <Icon type="desktop" />
                <span>Option 2</span>
            </Menu.Item>
            <SubMenu key="sub1" title={<span><Icon type="database" /><span>Institucional</span></span>}>
                <Menu.Item key="2"><Link to="/carreras">Carreras</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/semestres">Semestres</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/modulos">Modulos</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/alumnos">Alumnos</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/profesores">Profesores</Link></Menu.Item>
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
            <SubMenu key="sub8" title={<span><Icon type="setting" /><span>Configuracion</span></span>} >
                <Menu.Item key="23"><Link to="instituto">Instituto</Link></Menu.Item> 
                <Menu.Item key="24"><Link to="general">General</Link></Menu.Item>
            </SubMenu>
        </Menu>
    </Sider>
);

Aside.prototype = {
    collapsed: PropTypes.bool.isRequired
}

export default Aside;