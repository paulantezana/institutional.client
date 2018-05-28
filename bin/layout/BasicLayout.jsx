import React, { Component } from "react";
import './BasicLayout.scss';

const BasicLayout = (props)=>(
    <div className="basic-layout">
        <div className="basic-layout__header">
        </div>
        {props.children}
        <div className="basic-layout__footer">
            <p>Copyright © 2018 paulantezana.com</p>
        </div>
    </div>
);

export default BasicLayout;