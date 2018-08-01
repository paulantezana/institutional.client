import React from 'react';

import { InputNumber, Select, Checkbox, Modal, Form, Input, Alert } from 'antd';

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
                                rules: [{ required: true, message: '¡Ingrese un nombre válido!' }],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Credito">
                            {getFieldDecorator('credito',{
                                initialValue: data.credito,
                                rules: [{ required: true, type: 'number', message: '¡Ingrese un credito válido!' }],
                            })(
                                <InputNumber style={{ width: "10rem"}}/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Horas">
                            {getFieldDecorator('horas',{
                                initialValue: data.horas,
                                rules: [{ required: true, type: 'number', message: '¡Ingrese una hora válido!' }],
                            })(
                                <InputNumber style={{ width: "10rem"}}/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Modulo">
                            {getFieldDecorator('modulo_id',{
                                initialValue: data.modulo_id,
                                rules: [{  required: true, type: 'number', message: '¡Ingrese un ID válido!' }],
                            })(
                                <InputNumber style={{ width: "10rem"}}/>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Estado">
                            {getFieldDecorator('estado',{
                                initialValue: data.estado,
                            })(
                                <Checkbox/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
)

export default ModalForm;