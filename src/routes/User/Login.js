import React, {Component} from "react";
import { Form, Icon, Input, Button } from 'antd';

import styles from './User.scss';

import { Link } from "react-router-dom";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.form.validateFields();
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                
            }
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
                        <Button type="primary" htmlType="submit" className={styles.submit} disabled={hasErrors(getFieldsError())}>Iniciar Sesión</Button>
                    </Form.Item>
                </Form>
                <Link to="/user/register" className={styles.toggle}>¡Regístrate ahora!</Link>
                <Link to="/user/recover" className={styles.toggle}>¿Olvidaste tu cuenta?</Link>
            </div>
        )
    }
}

const Login = Form.create()(LoginPage)

export default Login;