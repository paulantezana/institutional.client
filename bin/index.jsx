import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

// Style sheets
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.scss';


import App  from "./router.jsx"
import store from "./reducers/index.js";

ReactDOM.render(
    <Provider store={ store }>
        <App/>
    </Provider>,
    document.getElementById('root')
);
