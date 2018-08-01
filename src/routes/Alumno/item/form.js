import React, { PureComponent } from 'react';
import moment from 'moment';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Table, DatePicker, Radio, InputNumber, Select, Modal, Form, Input, Alert } from 'antd';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};

const RadioGroup = Radio.Group;

const NuevoCreateForm = Form.create()(
    class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                dni: "12",
                args: {},
            }
            this.handleOnChange = this.handleOnChange.bind(this);
        }

        handleOnChange(e){
            let nn = this.state.args;
            // nn[input.name] = input.value;
            // this.setState({
            //     args: nn
            // })
            console.log(e);
        }
    
        render(){
            const { visible, onCancel, onCreate, form, errorMessage, confirmLoading, data = {} } = this.props;
            const { getFieldDecorator } = form;
            console.log(typeof(data.sexo));
            return (
                <Modal 
                    title="Nuevo Alumno"
                    okText="Guardar"
                    confirmLoading={confirmLoading}
                    onCancel={onCancel}
                    onOk={onCreate}
                    visible={visible}>
                    {
                        errorMessage && 
                        <Alert message = {errorMessage} type="error" showIcon/>
                    }
                    <Form layout="horizontal">
                        <Form.Item hasFeedback {...formItemLayout} label="DNI">
                            {getFieldDecorator('dni', {
                                initialValue: data.dni,
                                rules: [{ required: true, message: 'Ingrese un número de DNI válido' }],
                            })(
                                <InputNumber style={{ width: "10rem"}}/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Nombres">
                            {getFieldDecorator('nombres', {
                                initialValue: data.nombres,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Apellido Paterno">
                            {getFieldDecorator('apellido_paterno', {
                                initialValue: data.apellido_paterno,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Apellido Materno">
                            {getFieldDecorator('apellido_materno', {
                                initialValue: data.apellido_materno,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Fecha Nacimiento">
                            {getFieldDecorator('fecha_nacimiento',{
                                initialValue: data.fecha_nacimiento 
                                    ? moment(data.fecha_nacimiento,'YYYY/MM/DD')
                                    : moment(new Date(),'YYYY/MM/DD'),
                            })(
                                <DatePicker/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Sexo">
                            {getFieldDecorator('sexo',{
                                initialValue: parseInt(data.sexo),
                            })(
                                <RadioGroup>
                                    <Radio value={1}>Masculino</Radio>
                                    <Radio value={0}>Femenino</Radio>
                                </RadioGroup>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Pais">
                            {getFieldDecorator('pais',{
                                initialValue: data.pais,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Departamento">
                            {getFieldDecorator('departamento',{
                                initialValue: data.departamento,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Direccion">
                            {getFieldDecorator('direccion',{
                                initialValue: data.direccion,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Celular">
                            {getFieldDecorator('celular',{
                                initialValue: data.celular,
                            })(
                                <InputNumber type="number" style={{ width: "10rem"}}/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Telefono">
                            {getFieldDecorator('telefono',{
                                initialValue: data.telefono,
                            })(
                                <InputNumber  type="number" style={{ width: "10rem"}}/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Estado Civil">
                            {getFieldDecorator('estado_civil',{
                                initialValue: data.estado_civil,
                            })(
                                <Select>
                                    <Select.Option value="casado">Casado</Select.Option>
                                    <Select.Option value="soltero">Soltero</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
)

export default NuevoCreateForm;