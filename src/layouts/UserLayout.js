import React, { PureComponent, Fragment } from "react";
import { Icon } from 'antd';
import { Route, Switch, Link } from "react-router-dom";

import styles from './UserLayout.scss';
import logo from '../assets/logo.png';
import GlobalFooter from '../components/GlobalFooter';

// //////////////////////////////////////////////////////////////
import Login from '../routes/User/Login';
import Register from '../routes/User/Register';
import Recover from '../routes/User/Recover';
import RecoverConfirm from '../routes/User/RecoverConfirm';
import NotFound from '../routes/Exception/404';
// //////////////////////////////////////////////////////////////

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2018 paulantezana.com
    </Fragment>
);

class UserLayout extends PureComponent{
    constructor(props){
        super(props);
    }
    
    render() {
        const { match } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                                <span className={styles.title}>Sistema INT</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>Sistema Institucional</div>
                    </div>
                    <Switch>
                        <Route exact path={match.url} component={Login}/>
                        <Route exact path={`${match.url}/register`} component={Register}/>
                        <Route exact path={`${match.url}/recover`} component={Recover}/>
                        <Route exact path={`${match.url}/recover/confirm/:id`} component={RecoverConfirm}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <GlobalFooter copyright={copyright}/>
            </div>
        )
    }
}

export default UserLayout;
