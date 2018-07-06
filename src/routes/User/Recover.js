import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import styles from './User.scss';

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
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

         // Only show error after a field is touched.
        const emailError = isFieldTouched('email') && getFieldError('email');

        return(
            <div className={styles.form}>
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
                <Link to="/user" className={styles.toggle}>Iniciar Sesión</Link>
            </div>
        )
    }
}

const Recover = Form.create()(RecoverForm)

export default Recover;