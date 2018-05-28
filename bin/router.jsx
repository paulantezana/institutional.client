import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';

const { ConnectedRouter } = routerRedux;

// Import page components
import Home from './components/core/home.jsx';
import Login from './components/core/user/login.jsx';
import NotFound from './components/core/404.jsx';
import Public from './components/core/public.jsx';

function RouterConfig({ history }) {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" exact component={Public}/>
                <Route exact path="/app" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </ConnectedRouter>
    );
}

export default RouterConfig;

// const PrivateRoute = ({ component: Component, rest }) => (
//     <Route
//       {...rest}
//       render={props =>
//         authenticate()
//             ? ( <Component {...props} /> )
//             : ( <Redirect to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
// );