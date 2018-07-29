import React from "react";

import DrawerMenu from 'rc-drawer';
import { Drawer } from 'antd';

import SiderMenu from './SiderMenu';

const SiderMenuWrapper = props => {
    const { isMobile, collapsed, onCollapse } = props;
    return isMobile ? (
        <DrawerMenu
            getContainer={null}
            level={null}
            handleChild={<i className="drawer-handle-icon" />}
            onHandleClick={onCollapse}
            open={!collapsed}
            onMaskClick={onCollapse}
            >
            <SiderMenu {...props} collapsed={isMobile ? false : collapsed} />
        </DrawerMenu>
    ) : (
        <SiderMenu {...props} />
    );
};

export default SiderMenuWrapper;