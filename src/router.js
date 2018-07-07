import React from "react";
import PropTypes  from 'prop-types';

import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from "react-router-dom";

import {PrivateRoute} from './helpers/auth';
import UserLayout from "./layouts/UserLayout";
import AppLayout from "./layouts/AppLayout";

const App = ({history})=>(
    <ConnectedRouter history={history}>
        <Switch>
            <Route path="/user" component={UserLayout}/>
            <PrivateRoute path="/" component={AppLayout}/>
        </Switch>
    </ConnectedRouter>
);

App.propTypes = {
    history: PropTypes.object,
}

export default App;