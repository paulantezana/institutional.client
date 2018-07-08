import React, { Component } from "react";
import { Form, Icon, Input, Button, Alert, Card } from 'antd';
import { Link } from "react-router-dom";

import styles from './Forgout.scss';
import request from "./../../../helpers/request";


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ValidateForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {},
            errors: [],
            loading: false,
            success: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.form.validateFields();
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                request('/forgout/validate',{
                    method: 'POST',
                    body: {
                        ...values,
                        id: this.props.id
                    }
                })
                    .then(data => {
                        this.setState({
                            ...data,
                            loading: false
                        });
                        console.log(data);
                        if (this.state.success){
                            this.props.setStep(3,data.data.id);
                        }
                    })
                    .catch(err => {
                        this.setState({loading: false});
                    })
            }
        });
    }

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

         // Only show error after a field is touched.
        const claveRecuperarError = isFieldTouched('clave_recuperar') && getFieldError('clave_recuperar');

        return(
            <Card title="Ingresa el código de seguridad" className={styles.container} bordered={false}>
                <p>Comprueba si recibiste un correo electrónico con tu código, que debe tener siete dígitos.</p>
                {
                    (this.state.errors.length == true) && <Alert message={
                        this.state.errors.map((err,key)=><span key={key}>{err}<br/></span>)
                    } type="error" showIcon/>
                }
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Código de seguridad" hasFeedback validateStatus={claveRecuperarError ? 'error' : ''} help={claveRecuperarError || ''}>
                        {
                            getFieldDecorator('clave_recuperar', {
                                rules: [{ required: true, message: 'Por favor ingrese la clave de recuperación!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="#######"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.loading} className={styles.submit} disabled={hasErrors(getFieldsError())}>Continuar</Button>
                    </Form.Item>
                </Form>
                <Link to="/user" className={styles.toggle}>Iniciar Sesión</Link>
            </Card>
        )
    }
}

const Validate = Form.create()(ValidateForm)

export default Validate;