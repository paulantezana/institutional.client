import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import ModalForm from './modal';

const CREATE_SEMESTRE = gql`
    mutation CreateCarrera($nombre: String!, $logo: String, $creacion: Int, $filial_id: Int!){
        CreateCarrera(nombre: $nombre, logo: $logo, creacion: $creacion, filial_id: $filial_id){
            id
        }
    }
`;

const UPDATE_SEMESTRE = gql`
    mutation UpdateCarrera($id: Int!, $nombre: String!, $logo: String, $creacion: Int, $filial_id: Int!){
        UpdateCarrera(id: $id, nombre: $nombre, logo: $logo, creacion: $creacion, filial_id: $filial_id){
            id
        }
    }
`;

const GET_SEMESTREID = gql`
    query SemestreID($id: Int!){
        SemestreID(id: $id){
            id
            nombre
            year
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
                <Mutation mutation={CREATE_SEMESTRE} onCompleted={this.handleCompleted}>
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
                <Query query={GET_SEMESTREID} variables={{id: currentID}} onError={error=>message.error(error.message)}>
                    {({ loading, error, data: {CarreraID} }) => (
                        <Mutation mutation={UPDATE_SEMESTRE} onCompleted={this.handleCompleted}>
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