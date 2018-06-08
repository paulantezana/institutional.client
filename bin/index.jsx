import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

// Style sheets
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.scss';

import App  from "./router.jsx"

const client = new ApolloClient({
    uri: "http://localhost:7070/graphql"
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);
