import React from 'react';
import styles from './PageHeaderLayout.scss';

export default ({ children, wrapperClassName, top, props }) => (
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
        {/* <div>Header</div> */}
        {children ? <div className={styles.content}>{children}</div> : null}
    </div>
)