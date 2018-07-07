import React from 'react';

import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {setContext} from 'apollo-link-context';

import config from './helpers/config';

const client = new ApolloClient({
    link: new createHttpLink({uri: config.GRAPHQL_PATH}),
    cache: new InMemoryCache()
});

export default client;