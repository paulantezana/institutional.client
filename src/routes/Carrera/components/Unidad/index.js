import React, { PureComponent, Fragment } from 'react';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import { message, Button, Input, Tooltip, Modal } from 'antd';
const Search = Input.Search;
// const confirm = Modal.confirm;

import StandardTable from 'components/StandardTable';

import styles from './index.scss';
import UnidadItem from './item';
import ImporModal from './import';

const GET_UNIDADES = gql`{
    Unidades{
        id
        nombre
        horas
        credito
        estado
    }
}`;

const DELETE_UNIDAD = gql`
    mutation DeleteUnidad($id: Int!){
        DeleteUnidad(id: $id){
            id
        }
    }
`;

class Unidad extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            modalImportVisible: false,
            modalType: 'create',
            currentID: 0,
        };
        this.handleOnModal = this.handleOnModal.bind(this);
        this.handleOnEdit = this.handleOnEdit.bind(this);
        this.handleOnImport = this.handleOnImport.bind(this);
    }

    handleOnImport(visible){
        this.setState({
            modalImportVisible: visible
        })
    }

    handleOnModal(visible){
        this.setState({
            modalVisible: visible,
            modalType: 'create',
        })
    }
    
    handleOnEdit(id){
        this.setState({
            modalVisible: true,
            modalType: 'update',
            currentID: id
        })
    }

    render(){
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
            },
            {
                title: 'Horas',
                dataIndex: 'horas',
                key: 'horas',
            },
            {
                title: 'Credito',
                dataIndex: 'credito',
                key: 'credito',
            },
            {
                title: 'Accion',
                key: 'accion',
                width: '150px',
                render: (a, record)=>{
                    return (
                        <div className={styles.actions}>
                            <Tooltip title="Editar">
                                <Button shape="circle" icon="edit" onClick={()=>this.handleOnEdit(a.id)}/>
                            </Tooltip>
                            <Tooltip title="Deshavilitar">
                                <Button shape="circle" icon="close"/>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                                <Mutation mutation={DELETE_UNIDAD} 
                                    onError={error=>message.error(error.message)} 
                                    onCompleted={data =>message.success(`El registro con el ID: ${data.DeleteUnidad.id} Fue eliminado exitosamente`)}>
                                    {(DeleteUnidad, { loading, error, data })=>{
                                        return (
                                            <Button shape="circle" icon="delete" type="danger" onClick={()=>{
                                                Modal.confirm({
                                                    title: "¿Estás seguro de eliminar este registro?",
                                                    content: a.nombre,
                                                    okText: "SI",
                                                    okType: 'danger',
                                                    cancelText: "NO",
                                                    onOk(){
                                                        DeleteUnidad({ variables: {id: a.id} });
                                                    }
                                                })
                                            }}/>
                                        )
                                    }}
                                </Mutation>
                            </Tooltip>
                        </div>
                    )
                }
            }
        ];
        return(
            <Query query={GET_UNIDADES} 
                fetchPolicy="cache-and-network"
                onError={error=>message.error(error.message)}>
                {({ loading, error, refetch, data }) => {
                    return (
                        <Fragment>
                            <div className={styles.header}>
                                <div className={styles.group}>
                                    <Button icon="plus" type="primary" onClick={()=>this.handleOnModal(true)}>Nueva Unidad</Button>
                                    <Button icon="reload" onClick={()=>refetch()}>Actualizar</Button>  
                                    <Button icon="database" onClick={()=>this.handleOnImport(true)}>Importar</Button>
                                    <Search placeholder="Buscar unidad" onSearch={value => console.log(value)} style={{ width: 200 }}/>
                                </div>
                                <ImporModal visible={this.state.modalImportVisible} onModal={this.handleOnImport}/>
                                <UnidadItem visible={this.state.modalVisible} onModal={this.handleOnModal} refetchTable={refetch} currentID={this.state.currentID} modalType={this.state.modalType}/>
                                <span>Unidades</span>
                            </div>
                            <StandardTable
                                dataSource={data.Unidades}
                                columns={columns}
                                pagination={false}
                                // rowSelection={rowSelection}
                                rowKey={ record => record.id } 
                                loading={loading}/>
                        </Fragment>
                    );
                }}
            </Query>
       ) 
    }
}

export default Unidad;