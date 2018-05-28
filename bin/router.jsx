import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";

import { authenticate } from './helpers/authenticate.js';

// Import page components
import Home from './components/core/app.jsx';
import Login from './components/core/login.jsx';
import NotFound from './components/core/404.jsx';

function RouterConfig() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;

const PrivateRoute = ({ component: Component, rest }) => (
    <Route
      {...rest}
      render={props =>
        authenticate()
            ? ( <Component {...props} /> )
            : ( <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
);