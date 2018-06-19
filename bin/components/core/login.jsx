import React, { Component } from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { login } from './../../helpers/authenticate.js';
import './login.scss';

import Logo from './../../assets/logo.png';

const GET_LOGIN = gql`
query Login($usuario: String!, $clave: String!) {
    Login(usuario: $usuario, clave: $clave) {
        token
    }
}`;

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, { userName, password }) => {
            if (!err) {
                <Query query={GET_LOGIN} variables={{ userName, password }}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return `Error!: ${error}`;

                        return (
                            <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
                        );
                    }}
                </Query>
                console.log('Received values of form: ', userName);
                // login(values.userName,values.password);
                // this.props.history.push("/");
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="basic-layout">
                <div className="basic-layout__header">
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {
                            getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Por favor ingrese su nombre de usuario!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nombre de usuario" />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(
                                <Checkbox>Recuérdame</Checkbox>
                            )
                        }
                        <a className="login-form-forgot" href="">¿Olvidaste tu cuenta?</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                        O <a href="">¡Regístrate ahora!</a>
                    </Form.Item>
                </Form>
                <div className="basic-layout__footer">
                    <p>Copyright © 2018 paulantezana.com</p>
                </div>
            </div>
        );
    }
}

const Login = Form.create()(LoginForm);

export default Login;
