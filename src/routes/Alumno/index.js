import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Table, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert } from 'antd';

import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.scss';

//////////////////////////////////////////////////////////
import NuevoForm from './nuevo';
//////////////////////////////////////////////////////////

const GET_ALUMNOS = gql`{
    Alumnos{
        apellido_materno
        apellido_paterno
        celular
        dni
        estado
        id
        nombres
        sexo
    }
}`;

class Alumno extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            visibleModal: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel(){
        this.setState({ visible: false });
    }

    handleCreate(){
        // const form = this.formRef.props.form;
        // form.validateFields((err, values) => {
        //     console.log('Received values of form: ', values);
        // });
    }

    showModal(){
        this.setState({ visible: true });
    }

    handleChange(pagination, filters, sorter){
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    // saveFormRef(formRef){
    //     this.formRef = formRef;
    // }

    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [
            {
                title: 'DNI',
                dataIndex: 'dni',
                key: 'dni',
                sorter: (a, b) => a.dni.length - b.dni.length,
                sortOrder: sortedInfo.columnKey === 'dni' && sortedInfo.order,
            },
            {
                title: 'Nombres',
                dataIndex: 'nombres',
                key: 'nombres',
                sorter: (a, b) => a.nombres.length - b.nombres.length,
                sortOrder: sortedInfo.columnKey === 'nombres' && sortedInfo.order,
            },
            {
                title: 'Apellido Paterno',
                dataIndex: 'apellido_paterno',
                key: 'apellido_paterno',
                sorter: (a, b) => a.apellido_paterno.length - b.apellido_paterno.length,
                sortOrder: sortedInfo.columnKey === 'apellido_paterno' && sortedInfo.order,
            },
            {
                title: 'Apellido Materno',
                dataIndex: 'apellido_materno',
                key: 'apellido_materno',
                sorter: (a, b) => a.apellido_materno.length - b.apellido_materno.length,
                sortOrder: sortedInfo.columnKey === 'apellido_materno' && sortedInfo.order,
            },
            {
                title: 'Sexo',
                dataIndex: 'sexo',
                key: 'sexo',
                sorter: (a, b) => a.sexo.length - b.sexo.length,
                sortOrder: sortedInfo.columnKey === 'sexo' && sortedInfo.order,
            },
            {
                title: 'Celular',
                dataIndex: 'celular',
                key: 'celular',
                sorter: (a, b) => a.celular.length - b.celular.length,
                sortOrder: sortedInfo.columnKey === 'celular' && sortedInfo.order,
            },
        ];

        return(
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableListOperator}>
                        <Button type="primary" onClick={this.showModal}><Icon type="plus"/>Nuevo</Button>
                        <Button type="primary"><Icon type="idcard"/>Carnet</Button>
                        <Button type="primary"><Icon type="export"/>Exportar</Button>
                        <Button type="primary"><Icon type="folder"/>Importar</Button>
                        <NuevoForm 
                            // wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}/>
                    </div>
                    <Query query={GET_ALUMNOS}>
                        {({ loading, error, data }) => {
                            console.log(data);
                            if (loading) return <Spin/>;
                            if (error) return <Alert type="error" message={`Error! ${error.message}`} banner />;
                            return (
                                <StandardTable
                                    dataSource={data.Alumnos} 
                                    columns={columns}
                                    rowKey={ record => record.id } 
                                    onChange={this.handleChange}
                                    loading={loading}/>
                            );
                        }}
                    </Query>
                </Card>
            </PageHeaderLayout>
        )
    }
}

export default Alumno;