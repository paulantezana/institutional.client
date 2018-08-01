import React, { PureComponent, Fragment } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { message, Button } from 'antd';

import StandardTable from 'components/StandardTable';

import styles from './index.scss';
import SemestreItem from './item';

const GET_SEMESTRES = gql`{
    Semestres{
        id
        nombre
        year
        estado
    }
}`;

class Semestre extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            modalType: 'create',
            currentID: 0,
        };
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
            <Query query={GET_SEMESTRES} 
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
                            <SemestreItem visible={this.state.modalVisible} onModal={this.handleOnModal} refetchTable={refetch} currentID={this.state.currentID} modalType={this.state.modalType}/>
                            <span>Semestres</span>
                        </div>
                        <StandardTable
                            dataSource={data.Semestres}
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

export default Semestre;