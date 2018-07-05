import React, { Component, Fragment } from "react";
import {  Link }  from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { message } from 'antd';

import styles from './index.scss';
import Login from './login';
import Recover from './recover';
import Register from './register';


class LoginPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            showRegister: false,
            showRecover: false,
            showLogin: true,
            remember: false,
        }

        this.handleShowRegister = this.handleShowRegister.bind(this);
        this.handleShowRecover = this.handleShowRecover.bind(this);
        this.handleShowLogin = this.handleShowLogin.bind(this);

        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.handleSubmitRecover = this.handleSubmitRecover.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    handleShowRegister(e){
        e.preventDefault();
        this.setState({
            showRegister: true,
            showRecover: false,
            showLogin: false,
        });
    }

    handleShowRecover(e){
        e.preventDefault();
        this.setState({
            showRegister: false,
            showRecover: true,
            showLogin: false,
        })
    }

    handleShowLogin(e){
        e.preventDefault();
        this.setState({
            showRegister: false,
            showRecover: false,
            showLogin: true,
        })
    }

    handleSubmitRecover(values){

    }

    handleSubmitRegister(values){
        
    }

    handleSubmitLogin(values){
        
    }


    // handleSubmit(e){
    //     e.preventDefault();
    //     this.props.form.validateFields((err, { usuario, clave }) => {
    //         if (!err) {
    //             fetch("http://localhost:7070/login",{
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //                 },
    //                 method: "POST",
    //                 body: JSON.stringify({usuario,clave})
    //             })
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data.type != undefined){
    //                     if (data.type == "error") {
    //                         message.error(data.message);
    //                         return;
    //                     }
    //                 }
                    
    //                 if(data.token == undefined){
    //                     message.error("Error Token de seguridad");
    //                     return;
    //                 }
    //                 message.success("Bienvenido al sistema de facturacion");
    //                 localStorage.setItem('lkti',data.token);
    //                 this.props.history.push("/"); // Redireccionando
    //             })
    //             .catch(err => {
    //                 message.error("Error fatal");
    //             });
    //         }
    //     });
    // }
    render() {
        const { showLogin, showRecover, showRegister } = this.state;
        return (
            <div>
                { showLogin && <Login onSubmit={this.handleSubmitLogin} showRegister={this.handleShowRegister} showRecover={this.handleShowRecover}/> }
                { showRecover && <Recover onSubmit={this.handleSubmitRecover} showLogin={this.handleShowLogin}/> }
                { showRegister && <Register onSubmit={this.handleSubmitRegister} showLogin={this.handleShowLogin}/> }
            </div>
        )
    }
}

export default LoginPage;