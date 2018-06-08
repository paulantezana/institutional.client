import React, { Component } from "react";
import PropTypes from 'prop-types';

import App from '../core/app.jsx';

class Carrera extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <App>
                <h1>Carrera</h1>
            </App>
        )
    }
}

// Carrera.prototype = {
    
// }

export default Carrera;