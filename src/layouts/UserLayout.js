import React, { PureComponent, Fragment } from "react";
import { Layout, Icon } from 'antd';


import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";

import styles from './UserLayout.scss';
import logo from '../assets/logo.png';
import GlobalFooter from '../components/GlobalFooter';
// // import LoginForm from '../components/Login';


// //////////////////////////////////////////////////////////////
import Login from '../routes/User/Login';
import Register from '../routes/User/Register';
import Recover from '../routes/User/Recover';
import RecoverConfirm from '../routes/User/RecoverConfirm';

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
        console.log(match.url);
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <img alt="logo" className={styles.logo} src={logo} />
                        </div>
                    </div>
                    {/* <h2>Topics</h2>
                    <ul>
                    <li>
                        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/components`}>Components</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                    </li>
                    </ul>
                
                    <Route       path={`${match.url}/:topicId`} component={Topic} /> */}
                    {/* <Switch> */}
                        <Route exact path={match.url} component={Login}/>
                        <Route exact path={`${match.url}/:cc`} component={Topic}/>
                        <Route exact path={`${match.url}/recover`} component={Recover}/>
                        <Route exact path={`${match.url}/recover/:id`} component={RecoverConfirm}/>
                    {/* </Switch> */}
                    <GlobalFooter copyright={copyright}/>
                </div>
            </div>
        )
    }
}

const Topic = ({ match }) => (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );

export default UserLayout;
