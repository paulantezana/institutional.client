import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import { Table, DatePicker, Radio, Icon, Divider, Select, Modal, Form, Input, Alert } from 'antd';

import ModalForm from './modal';

const CREATE_CARRERA = gql`
    mutation CreateCarrera($nombre: String!, $logo: String, $creacion: Int, $filial_id: Int!){
        CreateCarrera(nombre: $nombre, logo: $logo, creacion: $creacion, filial_id: $filial_id){
            id
        }
    }
`;

class CarreraItem extends PureComponent{
    constructor(props){
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCompleted = this.handleCompleted.bind(this);
    }

    handleCancel(){
        this.props.onModal(false);
    }

    handleCompleted(){
        this.props.refetchTable();
        this.props.onModal(false);
    }

    render(){
        const {visible, modalType, currentID} = this.props;
        return (
            <Mutation mutation={CREATE_CARRERA} onCompleted={this.handleCompleted}>
                {(CreateAlumno, { loading, error, data }) => {
                    return (
                        <ModalForm
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
