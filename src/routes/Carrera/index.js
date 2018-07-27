import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { message, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert, Row, Col } from 'antd';

import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.scss';

const GET_CARRERAS = gql`{
    Carreras{
        id
        nombre
        creacion
    }
}`;

const GET_SEMESTRES = gql`{
    Semestres{
        id
        nombre
        year
    }
}`;

//////////////////////////////////////////////////////////
import CarreraItem from './Item/CarreraItem';
//////////////////////////////////////////////////////////

class Carrera extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            filteredInfo: null,
            sortedInfo: null,

            modalCarrera: false,
        }

        this.handleOnModalCarrera = this.handleOnModalCarrera.bind(this);
        // this.showModal = this.showModal.bind(this);
    }

    handleOnModalCarrera(visible){
        this.setState({modalCarrera: visible})
    }

    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columnsCarrera = [
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
            },
            {
                title: 'Creacion',
                dataIndex: 'creacion',
                key: 'creacion',
            },
        ];

        const columnsSemestre = [
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
            },
            {
                title: 'Año',
                dataIndex: 'year',
                key: 'year',
            },
        ];

        return(
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className={styles.row}>
                                <Button icon="plus" size="small" onClick={()=>this.handleOnModalCarrera(true)}/>
                                <CarreraItem visible={this.state.modalCarrera} onModal={this.handleOnModalCarrera}/>
                            </div>
                            <div className={styles.row}>
                                <Query query={GET_CARRERAS}>
                                    {({ loading, error, data }) => {
                                        if (error) message.error(error.message);
                                        return (
                                            <StandardTable
                                                dataSource={data.Carreras}
                                                columns={columnsCarrera}
                                                pagination={false}
                                                // rowSelection={rowSelection}
                                                rowKey={ record => record.id } 
                                                loading={loading}/>
                                            );
                                        }}
                                </Query>
                            </div>
                            <Divider/>
                            <div className={styles.row}>
                                <Button.Group>
                                    <Button icon="plus" onClick={()=>this.handleOnModalCarrera(true)}/>
                                    <Button icon="database" onClick={()=>this.handleOnModalCarrera(true)}/>
                                    <Button icon="filter" onClick={()=>this.handleOnModalCarrera(true)}/>
                                </Button.Group>
                                <CarreraItem visible={this.state.modalCarrera} onModal={this.handleOnModalCarrera}/>
                            </div>
                            <div className={styles.row}>
                                <Query query={GET_SEMESTRES}>
                                    {({ loading, error, data }) => {
                                        if (error) message.error(error.message);
                                        return (
                                            <StandardTable
                                                dataSource={data.Semestres}
                                                columns={columnsSemestre}
                                                pagination={false}
                                                // rowSelection={rowSelection}
                                                rowKey={ record => record.id } 
                                                loading={loading}/>
                                            );
                                        }}
                                </Query>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={16} lg={18}>
                            vbvs vjssdhbvjv jsdvhbsdjd hvbsj dhvb  jsdh bvhbsdv vbisd bvsdh bvj vvbjsdb sdhvjd jsdvhbsdjd hvbsj dhvb  jsdh bvhbsdv vbisd bvsdh bvj vvbjsdb sdhvjd jsdvhbsdjd hvbsj dhvb  jsdh bvhbsdv vbisd bvsdh bvj vvbjsdb sdhvjd
                        </Col>
                    </Row>
                </Card>
            </PageHeaderLayout>
        )
    }
}

export default Carrera;