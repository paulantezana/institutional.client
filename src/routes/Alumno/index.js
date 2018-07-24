import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import { Menu, Card, Button, Icon, Divider, Dropdown, Modal, Avatar, Spin, message, Alert } from 'antd';
import { Row, Col } from 'antd';

import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.scss';

//////////////////////////////////////////////////////////
import NuevoForm from './nuevo';
import Datalle from './detalle';
//////////////////////////////////////////////////////////

const GET_ALUMNOS = gql`{
    Alumnos{
        id
        dni
        nombres
        apellido_paterno
        apellido_materno
        sexo
        estado
        celular
    }
}`;

const CREATE_ALUMNO = gql`
    mutation CreateAlumno($dni: String!, $nombres: String!, $apellido_paterno: String!, $apellido_materno: String!, $direccion: String, $celular: String, $pais: String, $sexo: String, $telefono: String, $fecha_nacimiento: DateTime, $departamento: String, $estado_civil: String){
        CreateAlumno(dni: $dni, nombres: $nombres, apellido_paterno: $apellido_paterno, apellido_materno: $apellido_materno, direccion: $direccion, celular: $celular, pais: $pais, sexo: $sexo, telefono: $telefono, fecha_nacimiento: $fecha_nacimiento, departamento: $departamento, estado_civil: $estado_civil){
            id
        }
    }
`;

const DELETE_ALUMNO = gql`
    mutation DeleteAlumno($id: Int!){
        DeleteAlumno(id: $id){
            id
        }
    }
`;

class Alumno extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            visibleModal: false,

            detalleID: 0,
            selectedRowKeys: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.onSelectChange = this.onSelectChange.bind(this);

        this.handleDetalle = this.handleDetalle.bind(this);
    }

    handleCancel(){
        this.setState({ visible: false });
    }

    handleCreate(){
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
      
            // console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    showModal(){
        this.setState({ visible: true });
    }

    hideModal(){
        this.setState({ visible: false });
    }

    handleChange(pagination, filters, sorter){
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    onSelectChange(selectedRowKeys){
        this.setState({ selectedRowKeys });
    }

    handleDetalle(detalleID){
        this.setState({detalleID});
    }

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
                title: 'Apellidos',
                key: 'apellidos',
                render: (a, b)=>{
                    return `${a.apellido_paterno} ${a.apellido_materno}`
                },
                sorter: (a, b) => a.apellido_paterno.length - b.apellido_paterno.length,
                sortOrder: sortedInfo.columnKey === 'apellido_paterno' && sortedInfo.order,
            },
            {
                title: 'Sexo',
                dataIndex: 'sexo',
                filters: [
                    { text: 'Masculino', value: 'M' },
                    { text: 'Femenino', value: 'F' },
                ],
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
            {
                title: 'Accion',
                key: 'accion',
                render: (a, record)=>{
                    const actionMenu = (
                        <Menu className={styles.action__menu}>
                            <Menu.Item key="0">Editar</Menu.Item>
                            <Menu.Item key="1">
                                <Mutation mutation={DELETE_ALUMNO}>
                                    {(DeleteAlumno, { loading, error, data })=>(
                                        <div onClick={()=>{
                                            Modal.confirm({
                                                title: "¿Estás seguro de eliminar este registro?",
                                                content: a.nombres,
                                                okText: "SI",
                                                okType: 'danger',
                                                cancelText: "NO",
                                                onOk(){
                                                    DeleteAlumno({ variables: {id: a.id} });
                                                }
                                            })
                                        }}>Eliminar</div>
                                    )}
                                </Mutation>
                            </Menu.Item>
                            <Menu.Item key="2">Detalles</Menu.Item>
                        </Menu>
                    )
                    return(
                        <Dropdown.Button overlay={actionMenu} onClick={()=>this.handleDetalle(a.id)}>Detalles</Dropdown.Button>
                    )
                }
            },
        ];


        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return(
            <PageHeaderLayout>
                <Card>
                    <Row gutter={16}>
                        <Col span={18}>
                            <div className={styles.tableListOperator}>
                                <Button type="primary" onClick={this.showModal}><Icon type="plus"/>Nuevo</Button>
                                <Button type="primary"><Icon type="idcard"/>Carnet</Button>
                                <Button type="primary"><Icon type="export"/>Exportar</Button>
                                <Button type="primary"><Icon type="folder"/>Importar</Button>
                                <Mutation mutation={CREATE_ALUMNO}>
                                    {(CreateAlumno, { loading, error, data }) => {
                                        if (loading) return <Spin/>;
                                        if (error) return (message.error(error.message));
                                        return (
                                            <NuevoForm
                                                wrappedComponentRef={(formRef) => this.formRef = formRef}
                                                visible={this.state.visible}
                                                loading={loading}
                                                onCancel={this.handleCancel}
                                                onCreate={()=>{
                                                    const form = this.formRef.props.form;
                                                    form.validateFields((err, values) => {
                                                        console.log(values);
                                                        if (err) {
                                                            return;
                                                        }
                                                        CreateAlumno({ variables: values });
                                                        form.resetFields();
                                                        // if(!error){
                                                        //     this.hideModal();
                                                        // }
                                                    });
                                                }
                                            }/>
                                        )
                                    }}
                                </Mutation>
                            </div>
                            <Query query={GET_ALUMNOS}>
                                {({ loading, error, data }) => {
                                    if (error) return <Alert type="error" message={`Error! ${error.message}`} banner />;
                                    return (
                                        <StandardTable
                                            dataSource={data.Alumnos}
                                            columns={columns}
                                            rowSelection={rowSelection}
                                            rowKey={ record => record.id } 
                                            onChange={this.handleChange}
                                            loading={loading}/>
                                    );
                                }}
                            </Query>
                        </Col>
                        <Col span={6}>
                            <Datalle id={this.state.detalleID}/>
                        </Col>
                    </Row>


                </Card>
            </PageHeaderLayout>
        )
    }
}

export default Alumno;