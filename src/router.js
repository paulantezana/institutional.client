import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";

import { PrivateRoute } from './helpers/auth';

import UserLayout from "./layouts/UserLayout";
import AppLayout from "./layouts/AppLayout";

const RouterConfig = ()=>(
    <Router>
        <Switch>
            <Route path="/user" component={UserLayout}/>
            <PrivateRoute path="/" component={AppLayout}/>
        </Switch>
    </Router>
);

export default RouterConfig;