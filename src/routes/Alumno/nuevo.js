import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Table, DatePicker, Radio, Icon, Divider, Select, Modal, Form, Input, Alert } from 'antd';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};

const RadioGroup = Radio.Group;

const NuevoCreateForm = Form.create()(
    class extends React.Component{
        render(){
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal 
                    title="Nuevo Alumno"
                    okText="Guardar"
                    onCancel={onCancel}
                    onOk={onCreate}
                    visible={visible}>
                    <Form layout="horizontal">
                        <Form.Item {...formItemLayout} label="DNI">
                            {getFieldDecorator('dni', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Nombres">
                            {getFieldDecorator('nombres', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Apellido Paterno">
                            {getFieldDecorator('apellido_paterno', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Apellido Materno">
                            {getFieldDecorator('apellido_materno', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Fecha Nacimiento">
                            {getFieldDecorator('fecha_nacimiento')(
                                <DatePicker/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Sexo">
                            {getFieldDecorator('sexo')(
                                <RadioGroup>
                                    <Radio value={1}>Masculino</Radio>
                                    <Radio value={0}>Femenito</Radio>
                                </RadioGroup>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Pais">
                            {getFieldDecorator('pais')(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Departamento">
                            {getFieldDecorator('departamento')(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Direccion">
                            {getFieldDecorator('direccion')(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Celular">
                            {getFieldDecorator('celular')(
                                <Input type="number"/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Telefono">
                            {getFieldDecorator('telefono')(
                                <Input type="number"/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Estado Civil">
                            {getFieldDecorator('estado_civil')(
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