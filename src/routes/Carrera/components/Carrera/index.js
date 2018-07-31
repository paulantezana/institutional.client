import React, { PureComponent, Fragment } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { message, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert, Row, Col } from 'antd';

import StandardTable from 'components/StandardTable';

import styles from './index.scss';
import CarreraItem from './item';

const GET_CARRERAS = gql`{
    Carreras{
        id
        nombre
    }
}`;

class Carrera extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            modalType: 'create',
            currentID: 0,
        }
        this.handleOnModal = this.handleOnModal.bind(this);
        this.handleOnEdit = this.handleOnEdit.bind(this);
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
                title: 'Accion',
                key: 'accion',
                render: (a, record)=>{
                    return (
                        <Button.Group size="small">
                            <Button icon="edit" onClick={()=>this.handleOnEdit(a.id)}/>
                            <Button icon="user"/>  
                        </Button.Group>
                    )
                }
            }
        ];
        return(
            <Query query={GET_CARRERAS} 
                fetchPolicy="cache-and-network"
                onError={error=>message.error(error.message)}>
                {({ loading, error, refetch, data }) => {
                    return (
                        <Fragment>
                            <div className={styles.header}>
                                <Button.Group>
                                    <Button icon="plus" onClick={()=>this.handleOnModal(true)}/>
                                    <Button icon="reload" onClick={()=>refetch()}/>  
                                </Button.Group>
                                <CarreraItem visible={this.state.modalVisible} onModal={this.handleOnModal} refetchTable={refetch} currentID={this.state.currentID} modalType={this.state.modalType}/>
                                <span>Programas de estudio</span>
                            </div>
                            <StandardTable
                                dataSource={data.Carreras}
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

export default Carrera;