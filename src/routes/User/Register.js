import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import styles from './Register.scss';

const RegisterForm = (props)=>{
    const { onSubmit, showLogin } = props;
    const { getFieldDecorator } = props.form;
    return (
        <div className={styles.login}>
            <Form onSubmit={onSubmit} className={styles.login}>
                {/* <Form.Item>
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
                        getFieldDecorator('clave', {
                            rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña"/>
                        )
                    }
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.submit}>Registrarse</Button>
                </Form.Item>
            </Form>
            <a className={styles.toggle} href="" onClick={showLogin}>Iniciar Sesión</a>
        </div>
    )
}

const Register = Form.create()(RegisterForm)

export default Register;