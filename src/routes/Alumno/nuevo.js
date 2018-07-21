import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Table, Card, Button, Icon, Divider, Avatar, Modal, Form, Input, Alert } from 'antd';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};

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
                            {getFieldDecorator('fecha_nacimiento', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Sexo">
                            {getFieldDecorator('sexo', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Pais">
                            {getFieldDecorator('pais', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Departamento">
                            {getFieldDecorator('departamento', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Direccion">
                            {getFieldDecorator('direccion', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Description">
                            {getFieldDecorator('description')(<Input type="textarea" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
)

export default NuevoCreateForm;