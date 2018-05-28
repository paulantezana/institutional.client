import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";

// Import page components
import Home from './home.jsx';
import Login from './login/index.jsx';
import NotFound from './404.jsx';
import Public from './public.jsx';
import BasicLayout from './../layout/BasicLayout.jsx';

const dsdsds = ()=>{
    return (
        <BasicLayout><h1>Hola</h1></BasicLayout>
    );
};

// App Core Component
class App extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    componentWillMount(){

    }

    render(){
        return(
            // <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Public} />
                        <Route exact path="/app" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            // </Provider>
        )
    }
}


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


export default App