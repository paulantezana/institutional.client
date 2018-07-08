import React,{Component} from "react";
import { Form, Icon, Input, Button, Alert, Card, Divider } from 'antd';
import { Link } from "react-router-dom";

import styles from './User.scss';
import request from '../../helpers/request';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RegisterPage extends Component{
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

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading:true});
                request('/register',{
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
        const usuarioError = isFieldTouched('usuario') && getFieldError('usuario');
        const claveError = isFieldTouched('clave') && getFieldError('clave');
        const confirmarClaveError = isFieldTouched('confirmar_clave') && getFieldError('confirmar_clave');

        if(this.state.success){
            return (
                <Card title="Felicidades" className={styles.container} bordered={false}>
                    <Alert message={`Felicidades ${this.state.data.usuario} se registro exitosamente` }  type="success" showIcon/>
                    <Divider/>
                    <Link to="/user" className={styles.toggle}>Iniciar Sesión</Link>
                </Card>
            )
        }else{
            return (
                <Card title="Crea una cuenta"  className={styles.container} bordered={false}>
                    <p>Es gratis y lo será siempre.</p>
                    {
                        (this.state.errors.length == true) && <Alert message={
                            this.state.errors.map((err,key)=><span key={key}>{err}<br/></span>)
                        } type="error" showIcon/>
                    }
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
    
                        <Form.Item hasFeedback validateStatus={correoError ? 'error' : ''} help={correoError || ''}>
                            {
                                getFieldDecorator('correo', {
                                    rules: [{ required: true, message: 'Por favor ingrese su correo!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Correo" />
                                )
                            }
                        </Form.Item>
    
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
                        <Button type="primary" loading={this.state.loading} htmlType="submit" className={styles.submit} disabled={hasErrors(getFieldsError())}>Iniciar Sesión</Button>
                        </Form.Item>
                    </Form>
                    <Link to="/user" className={styles.toggle}>Iniciar Sesión</Link>
                </Card>
            )
        }
    }
}
 
const Register = Form.create()(RegisterPage)

export default Register;