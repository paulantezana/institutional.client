import React, { Component, Fragment } from "react";
import {  Link }  from 'react-router-dom';

import { Icon } from 'antd';

import DocumentTitle from 'react-document-title';
import styles from './UserLayout.scss';
import logo from '../assets/logo.png';
import GlobalFooter from '../components/GlobalFooter';
import LoginForm from '../components/Login';

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2018 paulantezana.com
    </Fragment>
);

class UserLayout extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <DocumentTitle title="Login">
                <div className={styles.container}>
                    <div className={styles.content}>

                        <div className={styles.top}>
                            <div className={styles.header}>
                                <img alt="logo" className={styles.logo} src={logo} />
                            </div>
                        </div>
                        <LoginForm {...this.props}/>
                    </div>
                    <GlobalFooter copyright={copyright}/>
                </div>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
