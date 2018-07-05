import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import {Provider} from 'react-redux';

// Assets
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './main.scss';

// Client graphql
import client from './client';

// Store redux
import store from './store';

// Router path
import App from './router';

// Render in dom html
ReactDOM.render(
    <ApolloProvider client={client}>
    <Provider store={store}>
        <App/>
    </Provider>
</ApolloProvider>, document.getElementById('root'));