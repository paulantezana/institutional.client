import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import styles from './index.scss';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RecoverForm extends Component{
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
                this.props.onSubmit(values);
            }
        });
    }

    render(){
        const { showLogin } = this.props;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

         // Only show error after a field is touched.
        const emailError = isFieldTouched('email') && getFieldError('email');

        return(
            <div className={styles.login}>
                <Form onSubmit={this.handleSubmit} className={styles.login}>
                    <Form.Item hasFeedback validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                        {
                            getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Por favor ingrese su Correo electrónico!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Correo electrónico"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.submit} disabled={hasErrors(getFieldsError())}> Recuperar contraseña </Button>
                    </Form.Item>
                </Form>
                <a className={styles.toggle} href="" onClick={showLogin}>Iniciar Sesión</a>
            </div>
        )
    }
}

const Recover = Form.create()(RecoverForm)

export default Recover;