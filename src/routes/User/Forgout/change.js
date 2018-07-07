import React, { Component } from "react";
import { Form, Icon, Input, Button, Alert, Card } from 'antd';

import styles from './Forgout.scss';
import request from "./../../../helpers/request";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ChangeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {},
            errors: [],
            loading: false,
            success: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);
    }

    componentDidMount(){
        this.props.form.validateFields();
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                request('/forgout/change',{
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
                        if (this.state.success){
                            // action in success
                        }
                    })
                    .catch(err => {
                        this.setState({loading: false});
                    })
            }
        });
    }


    compareToFirstPassword(rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('clave')) {
            callback('¡Las contraseñas no noinciden!');
        } else {
            callback();
        }
    }
    
    validateToNextPassword(rule, value, callback){
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmar_clave'], { force: true });
        }
        callback();
    }

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

         // Only show error after a field is touched.
        const claveError = isFieldTouched('clave') && getFieldError('clave');
        const confirmarClaveError = isFieldTouched('confirmar_clave') && getFieldError('confirmar_clave');

        return(
            <Card title="Cambiar contraseña">
                {
                    (this.state.errors.length == true) && <Alert message={
                        this.state.errors.map((err,key)=><span key={key}>{err}<br/></span>)
                    } type="error" showIcon/>
                }
                <Form onSubmit={this.handleSubmit} className={styles.login}>
                    <Form.Item hasFeedback validateStatus={claveError ? 'error' : ''} help={claveError || ''}>
                        {
                            getFieldDecorator('clave', {
                                rules: [
                                    { required: true, message: 'Por favor ingrese su contraseña!' },
                                    { validator: this.validateToNextPassword}],
                            })(
                                <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Contraseña"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item hasFeedback validateStatus={confirmarClaveError ? 'error' : ''} help={confirmarClaveError || ''}>
                        {
                            getFieldDecorator('confirmar_clave', {
                                rules: [
                                    { required: true, message: '¡Por favor, confirme su contraseña!' },
                                    { validator: this.compareToFirstPassword}],
                            })(
                                <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Repetir Contraseña"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.loading} className={styles.submit} disabled={hasErrors(getFieldsError())}> Recuperar contraseña </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

const Change = Form.create()(ChangeForm)

export default Change;