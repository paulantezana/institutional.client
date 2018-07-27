import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import { Table, DatePicker, Radio, Icon, Divider, Select, Modal, Form, Input, Alert } from 'antd';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};

const CREATE_CARRERA = gql`
    mutation CreateCarrera($nombre: String!, $logo: String, $descripcion: String, $creacion: Int, $filial_id: Int!){
        CreateCarrera(nombre: $nombre, logo: $logo, descripcion: $descripcion, creacion: $creacion, filial_id: $filial_id){
            id
        }
    }
`;

const CreateForm = Form.create()(
    class extends React.Component{
        render(){
            const { visible, onCancel, onCreate, form, errorMessage, confirmLoading } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal 
                    title="Nueva Carrera"
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
                        <Form.Item {...formItemLayout} label="Nombre">
                            {getFieldDecorator('nombre', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Creacion">
                            {getFieldDecorator('creacion')(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Logo">
                            {getFieldDecorator('logo')(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Filial">
                            {getFieldDecorator('filial_id')(
                                <Input/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
)

class CarreraItem extends PureComponent{
    constructor(props){
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel(){
        this.props.onModal(false);
    }

    render(){
        const {visible, values} = this.props;
        return (
            <Mutation mutation={CREATE_CARRERA}>
                {(CreateAlumno, { loading, error, data }) => {
                    return (
                        <CreateForm
                            wrappedComponentRef={(formRef) => this.formRef = formRef}
                            visible={visible}
                            confirmLoading={loading}
                            onCancel={this.handleCancel}
                            errorMessage={(error) ? error.message : false}
                            onCreate={()=>{
                                const form = this.formRef.props.form;
                                form.validateFields((err, values) => {
                                    if (err) {
                                        return;
                                    }
                                    CreateAlumno({ variables: values });
                                    form.resetFields();
                                    // if(!error && !loading){
                                        // this.props.onModal(false);
                                    // }
                                });
                            }
                        }/>
                    )
                }}
            </Mutation>
        )
    }
}

export default CarreraItem;