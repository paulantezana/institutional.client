import React from 'react';

import { InputNumber, Select, Modal, Form, Input, Alert } from 'antd';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};

const ModalForm = Form.create()(
    class extends React.Component{
        render(){
            const { visible, onCancel, onCreate, form, errorMessage, confirmLoading, data = {} } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal 
                    title="Unidad"
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
                        <Form.Item hasFeedback {...formItemLayout} label="Nombre">
                            {getFieldDecorator('nombre', {
                                initialValue: data.nombre,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Creacion">
                            {getFieldDecorator('creacion',{
                                initialValue: data.creacion,
                                rules: [{ type: 'number', message: '¡Ingrese un año válido!' }],
                            })(
                                <InputNumber style={{ width: "10rem"}}/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Logo">
                            {getFieldDecorator('logo',{
                                initialValue: data.logo,
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Filial">
                            {getFieldDecorator('filial_id',{
                                initialValue: data.filial_id,
                                rules: [{ type: 'number', message: '¡Ingrese un ID válido!' }],
                            })(
                                <InputNumber style={{ width: "10rem"}}/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
)

export default ModalForm;