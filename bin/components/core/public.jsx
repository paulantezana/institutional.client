import React, { Component } from "react";
import { Button } from 'antd';
import { connect } from 'dva';

class Public extends Component{
    constructor(props){
        super(props);
        this.handleApp = this.handleApp.bind(this);
    }

    handleApp(){
        this.props.history.push("/app");
    }
    
    render(){
        return (
            <div className="basic-layout">
                <div className="basic-layout__header"></div>
                <Button type="primary" onClick={this.handleApp}>Ingresar</Button>
                <div className="basic-layout__footer">
                    <p>Copyright © 2018 paulantezana.com</p>
                </div>
            </div>
        )
    }
}

Public.propTypes = {};

export default connect()(Public);