import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Menu, Icon, Spin, Dropdown, Avatar, Divider, Badge } from 'antd';
import styles from './index.scss';

class GlobalHeader extends PureComponent {
    constructor(props){
        super(props);
    }
    render(){
        const {
            currentUser = {},
            collapsed,
            isMobile,
            logo,
            onCollapse,
            onMenuClick,
        } = this.props;

        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item key="profile" >
                    <Icon type="user" className={styles.icon}/>
                    <span>Perfil</span>
                </Menu.Item>
                <Menu.Item key="setting">
                    <Icon type="setting" className={styles.icon}/>
                    <span>Configuracion</span>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout">
                    <Icon type="logout" className={styles.icon}/>
                    <span>Cerrar Session</span>
                </Menu.Item>
            </Menu>
        )

        return (
            <header className={styles.header}>
                {isMobile && [
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>,
                    <Divider type="vertical" key="line" />,
                ]}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={onCollapse}/>
                <div className={styles.right}>
                    <span className={styles.action}>
                        <Badge count={15} dot>
                            <Icon type="notification" />
                        </Badge>
                    </span>
                    <span className={styles.action}>
                        <Badge count={10} dot>
                            <Icon type="bell" />
                        </Badge>
                    </span>
                    { currentUser.username ? (
                        <Dropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                                <span className={styles.name}>{currentUser.username}</span>
                            </span>
                        </Dropdown>
                    ) : (
                        <Spin size="small" style={{ marginLeft: 8 }} />
                    )}
                </div>
            </header>
        );
    }
}

export default GlobalHeader;