import React, { Component } from "react";

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.scss';

import Logo from './../../../assets/logo.png';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.history.push("/app");
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
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
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
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
        );
    }
}

const Login = Form.create()(LoginForm);

export default Login;