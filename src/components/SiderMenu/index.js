import React from "react";

import DrawerMenu from 'rc-drawer';
import { Drawer } from 'antd';

import SiderMenu from './SiderMenu';

const SiderMenuWrapper = props => {
    const { isMobile, collapsed, onCollapse } = props;
    return isMobile ? (
        <Drawer
          placement="left"
          closable={true}
          onClose={onCollapse}
          visible={collapsed}>
          <SiderMenu {...props} collapsed={isMobile ? false : collapsed}/>
        </Drawer>
    ) : (
        <SiderMenu {...props}/>
    );
};

export default SiderMenuWrapper;