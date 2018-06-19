import React, { Component } from "react";
import PropTypes from 'prop-types';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import App from '../core/app.jsx';

class Instituto extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <App>
                <Query
                    query={gql`
                    {
                        Usuarios {
                            usuario
                            clave
                        }
                    }
                    `}
                    >
                    {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return data.Usuarios.map(({ usuario, clave }) => (
                        <div key={usuario}>
                        <p>{`${usuario}: ${clave}`}</p>
                        </div>
                    ));
                    }}
                </Query>
            </App>
        )
    }
}

export default Instituto;
