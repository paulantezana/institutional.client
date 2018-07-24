import React from 'react';
import styles from './PageHeaderLayout.scss';

export default ({ children, wrapperClassName, top, props }) => (
    <div className={wrapperClassName}>
        {/* <div>Header</div> */}
        {children ? <div className={styles.content}>{children}</div> : null}
    </div>
)