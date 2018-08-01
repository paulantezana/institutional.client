import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import ModalForm from './modal';

const CREATE_MODULO = gql`
    mutation CreateCarrera($nombre: String!, $logo: String, $creacion: Int, $filial_id: Int!){
        CreateCarrera(nombre: $nombre, logo: $logo, creacion: $creacion, filial_id: $filial_id){
            id
        }
    }
`;

const UPDATE_MODULO = gql`
    mutation UpdateCarrera($id: Int!, $nombre: String!, $logo: String, $creacion: Int, $filial_id: Int!){
        UpdateCarrera(id: $id, nombre: $nombre, logo: $logo, creacion: $creacion, filial_id: $filial_id){
            id
        }
    }
`;

const GET_MODULOID = gql`
    query ModuloID($id: Int!){
        ModuloID(id: $id){
            id
            nombre
            tipo
            descripcion
            estado
        }
    }
`;


class Item extends PureComponent{
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
            (modalType === 'create') ? (
                <Mutation mutation={CREATE_MODULO} onCompleted={this.handleCompleted}>
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
                <Query query={GET_MODULOID} variables={{id: currentID}} onError={error=>message.error(error.message)}>
                    {({ loading, error, data: {CarreraID} }) => (
                        <Mutation mutation={UPDATE_MODULO} onCompleted={this.handleCompleted}>
                            {(UpdateUnidad, { loading, error, data }) => {
                                return (
                                    <ModalForm
                                        wrappedComponentRef={(formRef) => this.formRef = formRef}
                                        visible={visible}
                                        confirmLoading={loading}
                                        onCancel={this.handleCancel}
                                        data={CarreraID}
                                        errorMessage={(error) ? error.message : false}
                                        onCreate={()=>{
                                            const form = this.formRef.props.form;
                                            form.validateFields((err, values) => {
                                                if (err) {
                                                    return;
                                                }
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

export default Item;