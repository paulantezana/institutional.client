import React, {Component} from "react";
import { Form, Icon, Input, Button, notification, message, Tag } from 'antd';
import { Link } from "react-router-dom";

import styles from './User.scss';
import request from '../../helpers/request';
import { Login, GetUser } from '../../helpers/auth';


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loading : false
        }
    }

    componentDidMount(){
        this.props.form.validateFields();
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({ loading: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                request('http://localhost:7070/login', {
                    method: 'POST',
                    body: values
                })
                    .then(data => {
                        if(data.success){
                            Login(data.data.token);
                            this.props.history.push('/');
                            message.success('Bienvenido al sistema ' + GetUser().usuario);
                        }else{
                            notification.error({
                                message: "Iniciar sesión",
                                description: data.errors.map((error,key)=>(
                                    <Tag key={key} color="red">{error}</Tag>
                                ))
                            })
                        }
                    })
            }
            this.setState({loading: false});
        });
    }

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

         // Only show error after a field is touched.
        const usuarioError = isFieldTouched('usuario') && getFieldError('usuario');
        const claveError = isFieldTouched('clave') && getFieldError('clave');

        return(
            <div className={styles.form}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item hasFeedback validateStatus={usuarioError ? 'error' : ''} help={usuarioError || ''}>
                        {
                            getFieldDecorator('usuario', {
                                rules: [{ required: true, message: 'Por favor ingrese su nombre de usuario!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nombre de usuario" />
                            )
                        }
                    </Form.Item>
                    <Form.Item hasFeedback validateStatus={claveError ? 'error' : ''} help={claveError || ''}>
                        {
                            getFieldDecorator('clave', {
                                rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" loading={this.state.loading} htmlType="submit" className={styles.submit} disabled={hasErrors(getFieldsError())}>Iniciar Sesión</Button>
                    </Form.Item>
                </Form>
                <Link to="/user/register" className={styles.toggle}>¡Regístrate ahora!</Link>
                <Link to="/user/recover" className={styles.toggle}>¿Olvidaste tu cuenta?</Link>
            </div>
        )
    }
}

const LoginPage = Form.create()(LoginForm)

export default LoginPage;