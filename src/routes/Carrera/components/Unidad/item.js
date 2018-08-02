import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import {message} from 'antd';

import ModalForm from './modal';

const CREATE_UNIDAD = gql`
    mutation CreateUnidad($nombre: String!,  $credito: Float!, $horas: Int!, $modulo_id: Int!, $estado: Boolean){
        CreateUnidad(nombre: $nombre, credito: $credito, horas: $horas, modulo_id: $modulo_id, estado: $estado){
            id
        }
    }
`;

const UPDATE_UNIDAD = gql`
    mutation UpdateUnidad($id: Int!, $nombre: String!,  $credito: Float!, $horas: Int!, $modulo_id: Int!, $estado: Boolean){
        UpdateUnidad(id: $id, nombre: $nombre, credito: $credito, horas: $horas, modulo_id: $modulo_id, estado: $estado){
            id
        }
    }
`;

const GET_UNIDADID = gql`
    query UnidadID($id: Int!){
        UnidadID(id: $id){
            id
            nombre
            credito
            horas
            modulo_id
            estado
        }
    }
`;

class UnidadItem extends PureComponent{
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
        console.log(currentID);
        return (
            (modalType === 'create') ? (
                <Mutation mutation={CREATE_UNIDAD} onCompleted={this.handleCompleted}>
                    {(CreateUnidad, { loading, error, data }) => {
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
                                        CreateUnidad({ variables: values });
                                        form.resetFields();
                                    });
                                }
                            }/>
                        )
                    }}
                </Mutation>
            ) : (
                <Query query={GET_UNIDADID} variables={{id: currentID}} onError={error=>message.error(error.message)}>
                    {({ loading, error, data: {UnidadID} }) => (
                        <Mutation mutation={UPDATE_UNIDAD} onCompleted={this.handleCompleted}>
                            {(UpdateUnidad, { loading, error, data }) => {
                                return (
                                    <ModalForm
                                        wrappedComponentRef={(formRef) => this.formRef = formRef}
                                        visible={visible}
                                        confirmLoading={loading}
                                        onCancel={this.handleCancel}
                                        data={UnidadID}
                                        errorMessage={(error) ? error.message : false}
                                        onCreate={()=>{
                                            const form = this.formRef.props.form;
                                            form.validateFields((err, values) => {
                                                if (err) {
                                                    return;
                                                }
                                                console.log(values);
                                                UpdateUnidad({ variables: {...values, id: currentID} });
                                                form.resetFields();
                                            });
                                        }
                                    }/>
                                )
                            }}
                        </Mutation>
                    )}
                </Query>
            )
        )
    }
}

export default UnidadItem;