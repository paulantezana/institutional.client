import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import styles from './index.scss';

import { Layout, Menu,  Icon } from 'antd';

const { Sider } = Layout;
        
const Aside = ({collapsed, onCollapse, onMenuClick, menuData, logo})=>(
    <Sider 
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        // width={256}
        className={styles.sider}>
        <div className={styles.logo} key="logo">
            <Link to="/">
                <img src={logo} alt="logo" />
                <h1>Vilcanota</h1>
            </Link>
        </div>
        <Menu 
            theme="dark" 
            defaultSelectedKeys={['dashboard']} 
            mode="inline"
            onClick={onMenuClick}>
            {
                menuData && menuData.map(menu=>(
                    <Menu.Item key={menu.id}>
                        <Icon type={menu.icon}/>
                        <span>{ menu.name }</span>
                    </Menu.Item>
                ))
            }
        </Menu>
    </Sider>
);

Aside.prototype = {
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    onMenuClick: PropTypes.func,
    menuData: PropTypes.array,
}

export default Aside;