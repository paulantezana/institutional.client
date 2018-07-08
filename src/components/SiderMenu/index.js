import React from "react";

import DrawerMenu from 'rc-drawer';

import SiderMenu from './SiderMenu';

const SiderMenuWrapper = props => {
    const { isMobile, collapsed } = props;
    return isMobile ? (
        <DrawerMenu 
            // onChange={this.onChange}
            open={!collapsed}
            // handler={false}
            level={null}

            getContainer={null}
            // level={null}
            // handler={false}
            // open={!collapsed}
            onMaskClick={() => {
                props.onCollapse();
          }}
          >
            <SiderMenu {...props} collapsed={isMobile ? false : collapsed}/>
        </DrawerMenu>
    ) : (
        <SiderMenu {...props}/>
    );
};

export default SiderMenuWrapper;