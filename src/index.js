import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import {AppContainer} from 'react-hot-loader';
import {ApolloProvider} from 'react-apollo';
import {createStore, applyMiddleware} from 'redux';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import {routerMiddleware, connectRouter} from 'connected-react-router';

import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './redux/reducers';
import registerServiceWorker from './helpers/registerServiceWorker';

// Assets
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './main.scss';

// Client graphql
import client from './client';

// Router path
import App from './router';
const history = createBrowserHistory();

// Store redux and connected-react-router
const store = createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
)

// Render in dom html
ReactDOM.render(
    <AppContainer>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App history={ history }/>
            </Provider>
        </ApolloProvider>
    </AppContainer>,
    document.getElementById('root'));

// Export store
export default store;

// Hot reloading
if (module.hot) {
    // Reload components
    module.hot.accept('./router', () => {
        render()
    })
  
    // Reload reducers
    module.hot.accept('./redux/reducers', () => {
        store.replaceReducer(connectRouter(history)(rootReducer))
    })
}

// Service Worker
registerServiceWorker();