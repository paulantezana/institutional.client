import React from 'react';
import ReactDOM from 'react-dom';

// Global Stylesheets
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.scss';

// App components
import Home from './core/home.jsx';

// Render UI
ReactDOM.render(
    <Home/>,
    document.getElementById('root')
);
