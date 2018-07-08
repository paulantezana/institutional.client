import React, { Component } from "react";
import { Form, Icon, Input, Button, Alert, Card } from 'antd';
import { Link } from "react-router-dom";

import request from '../../../helpers/request';
import styles from './Forgout.scss';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SearchForm extends Component{
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
                this.setState({loading:true});
                request('/forgout/serach',{
                    method: 'POST',
                    body: values
                })
                    .then(data=> {
                        this.setState({
                            ...data,
                            loading: false
                        });
                        if (this.state.success){
                            this.props.setStep(2,data.data.id);
                        }
                    })
                    .catch(err => {
                        this.setState({loading: false})
                    });
            }
        });
    }

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

         // Only show error after a field is touched.
        const correoError = isFieldTouched('correo') && getFieldError('correo');

        return(
            <Card title="Recupera tu contraseña"  className={styles.container} bordered={false}>
                {
                    (this.state.errors.length == true) && <Alert message={
                        this.state.errors.map((err,key)=><span key={key}>{err}<br/></span>)
                    } type="error" showIcon/>
                }
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Ingresa tu correo electrónico para buscar tu cuenta" hasFeedback validateStatus={correoError ? 'error' : ''} help={correoError || ''}>
                        {
                            getFieldDecorator('correo', {
                                rules: [{ required: true, message: 'Por favor ingrese su Correo electrónico!' }],
                            })(
                                <Input type="correo" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Correo electrónico"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.loading} className={styles.submit} disabled={hasErrors(getFieldsError())}>Buscar</Button>
                    </Form.Item>
                </Form>
                <Link to="/user" className={styles.toggle}>Iniciar Sesión</Link>
            </Card>
        )
    }
}

const Search = Form.create()(SearchForm)

export default Search;