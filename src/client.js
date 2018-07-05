import React from 'react';

import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {setContext} from 'apollo-link-context';

const client = new ApolloClient({
    link: new createHttpLink({uri: 'http://localhost:7070/graphql'}),
    cache: new InMemoryCache()
});

export default client;