import React from 'react';
import {
    Route,
    Redirect,
} from "react-router-dom";


import decoder from 'jwt-decode';

const Authenticate = ()=> localStorage.getItem("lkti"); 

const Logout = ()=>{
    localStorage.clear();
};

const PrivateRoute = ({ component: Component, rest }) => (
    <Route
      {...rest}
      render={props =>
        Authenticate()
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

const GetUser = ()=>{
    if (!localStorage.getItem('lkti')) return;
    let { usuario } = decoder(localStorage.getItem('lkti'));
    return usuario;
}

export {
    Logout,
    PrivateRoute,
    Authenticate,
    GetUser
};