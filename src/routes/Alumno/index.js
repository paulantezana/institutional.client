import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import { Menu, Card, Button, Icon, Divider, Dropdown, Modal, Avatar, Input, message, Alert } from 'antd';
import { Row, Col } from 'antd';

const Search = Input.Search;

import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.scss';

//////////////////////////////////////////////////////////
import DataItem from './item';
import Datalle from './detalle';
//////////////////////////////////////////////////////////

const GET_ALUMNOS = gql`
    query Alumnos($dni: String) {
        Alumnos(dni: $dni) {
            id
            dni
            nombres
            apellido_paterno
            apellido_materno
            sexo
            estado
            celular
        }
    }
`;
const GET_ALUMNOIDALL = gql`
    query AlumnoID($id: Int!) {
        AlumnoID(id: $id) {
            id
            dni
            nombres
            apellido_paterno
            apellido_materno
            sexo
            estado
            celular
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
            filteredInfo: null, // Filters
            sortedInfo: null, // Sorted
            search: "", // Search
            
            visibleModal: false,
            detalleID: 0,
            selectedRowKeys: [],

            currentValues: {},
        }
        this.clearFilters = this.clearFilters.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleDetalle = this.handleDetalle.bind(this);
        this.handleOnModal = this.handleOnModal.bind(this);
        this.handleFindEdit = this.handleFindEdit.bind(this);
    }

    clearFilters(){
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
            search: "",
        })
    }

    handleFindEdit(data){
        this.setState({currentValues: data})
    }

    handleSearch(search){
        this.setState({search});
    }

    handleOnModal(visibleModal){
        this.setState({visibleModal})
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
                filters: [
                    { text: 'Masculino', value: '1' },
                    { text: 'Femenino', value: '0' },
                ],
                filteredValue: filteredInfo.sexo || null,
                onFilter: (value, record) => record.sexo.includes(value),
                key: 'sexo',
                render: (a, b)=>{
                    if(a.sexo == "") return "";
                    return (a.sexo == "0") ? "Femenino" : "Masculino";
                },
            },
            {
                title: 'Celular',
                dataIndex: 'celular',
                key: 'celular',
            },
            {
                title: 'Accion',
                key: 'accion',
                render: (a, record)=>{
                    const actionMenu = (
                        <Menu className={styles.action__menu}>
                            <Menu.Item key="0">
                                <Query query={GET_ALUMNOS} variables={{id: a.id}}>
                                    {({ loading, error, data }) => {
                                        if (error) message.error(error.message);
                                        handleFindEdit(data);
                                        return (
                                            <div>
                                                <Icon type="edit" className={styles.icon}/>,
                                                <span>Editar</span>
                                            </div>
                                        );
                                    }}
                                </Query>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <Mutation mutation={DELETE_ALUMNO}>
                                    {(DeleteAlumno, { loading, error, data })=>{
                                        if (error) message.error(error.message);
                                        if (data) message.success(`El registro con el ID: ${data.DeleteAlumno.id} Fue eliminado exitosamente`);
                                        return (
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
                                            }}>
                                                <Icon type="delete" className={styles.icon}/>
                                                <span>Eliminar</span>
                                            </div>
                                        )
                                    }}
                                </Mutation>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={()=>this.handleDetalle(a.id)}>
                                <Icon type="appstore-o" className={styles.icon}/>
                                <span>Detalles</span>
                            </Menu.Item>
                        </Menu>
                    )
                    return(
                        <Dropdown.Button trigger={['click']} overlay={actionMenu} onClick={()=>this.handleDetalle(a.id)}>Detalles</Dropdown.Button>
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
                <Card bordered={false}>
                    <Row gutter={16}>
                        <Col span={18}>
                            <Row gutter={16} className={styles.row}>
                                <Col span={12} className={styles.left}>
                                    <Button type="primary" onClick={()=>this.handleOnModal(true)}>Nuevo</Button>
                                    {/* <Button type="primary">Carnet</Button> */}
                                    <DataItem visible={this.state.visibleModal} onModal={this.handleOnModal}/>
                                </Col>
                                <Col span={12} className={styles.right}>
                                    <Button onClick={this.clearFilters}>Borrar filtros</Button>
                                </Col>
                            </Row>
                            <Row gutter={16} className={styles.row}>
                                <Col span={24}>
                                    <Search placeholder="Buscar por DNI" onSearch={value => this.handleSearch(value)}/>
                                </Col>
                            </Row>
                            <Query query={GET_ALUMNOS} variables={{dni: this.state.search}}>
                                {({ loading, error, data }) => {
                                    if (error) message.error(error.message);
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