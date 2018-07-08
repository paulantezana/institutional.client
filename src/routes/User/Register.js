import React from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import styles from './User.scss';

const RegisterForm = (props)=>{
    const { onSubmit, showLogin } = props;
    const { getFieldDecorator } = props.form;
    return (
        <div className={styles.form}>
            <Form onSubmit={onSubmit} className={styles.login}>
                <Form.Item>
                    {
                        getFieldDecorator('usuario', {
                            rules: [{ required: true, message: 'Por favor ingrese su nombre de usuario!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nombre de usuario" />
                        )
                    }
                </Form.Item>

                <Form.Item>
                    {
                        getFieldDecorator('correo', {
                            rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña"/>
                        )
                    }
                </Form.Item>

                <Form.Item>
                    {
                        getFieldDecorator('clave', {
                            rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña"/>
                        )
                    }
                </Form.Item>
                
                <Form.Item>
                    {
                        getFieldDecorator('clave_confirmar', {
                            rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña"/>
                        )
                    }
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.submit}>Registrarse</Button>
                </Form.Item>
            </Form>
            <Link to="/user" className={styles.toggle}>Iniciar Sesión</Link>
        </div>
    )
}

const Register = Form.create()(RegisterForm)

export default Register;