import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import NuevoForm from './form';

const CREATE_ALUMNO = gql`
    mutation CreateAlumno($dni: String!, $nombres: String!, $apellido_paterno: String!, $apellido_materno: String!, $direccion: String, $celular: String, $pais: String, $sexo: String, $telefono: String, $fecha_nacimiento: DateTime, $departamento: String, $estado_civil: String){
        CreateAlumno(dni: $dni, nombres: $nombres, apellido_paterno: $apellido_paterno, apellido_materno: $apellido_materno, direccion: $direccion, celular: $celular, pais: $pais, sexo: $sexo, telefono: $telefono, fecha_nacimiento: $fecha_nacimiento, departamento: $departamento, estado_civil: $estado_civil){
            id
        }
    }
`;

class DataItem extends PureComponent{
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
            <Mutation mutation={CREATE_ALUMNO}>
                {(CreateAlumno, { loading, error, data }) => {
                    return (
                        <NuevoForm
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

export default DataItem;