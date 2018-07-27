import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { message, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert, Row, Col } from 'antd';

import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const GET_CARRERAS = gql`{
    Carreras{
        id
        nombre
        creacion
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

        const columns = [
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

        return(
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Row gutter={16}>
                        <Col xs={12} sm={8} md={6} lg={4}>
                            <Button icon="plus" onClick={()=>this.handleOnModalCarrera(true)}/>
                            <CarreraItem visible={this.state.modalCarrera} onModal={this.handleOnModalCarrera}/>
                            <Query query={GET_CARRERAS}>
                                {({ loading, error, data }) => {
                                    if (error) message.error(error.message);
                                    return (
                                        <StandardTable
                                            dataSource={data.Carreras}
                                            columns={columns}
                                            pagination={false}
                                            // rowSelection={rowSelection}
                                            rowKey={ record => record.id } 
                                            loading={loading}/>
                                    );
                                }}
                            </Query>
                        </Col>
                        <Col xs={12} sm={16} md={18} lg={20}>
                            vbvs vjssdhbvjv jsdvhbsdjd hvbsj dhvb  jsdh bvhbsdv vbisd bvsdh bvj vvbjsdb sdhvjd jsdvhbsdjd hvbsj dhvb  jsdh bvhbsdv vbisd bvsdh bvj vvbjsdb sdhvjd jsdvhbsdjd hvbsj dhvb  jsdh bvhbsdv vbisd bvsdh bvj vvbjsdb sdhvjd
                        </Col>
                    </Row>
                </Card>
            </PageHeaderLayout>
        )
    }
}

export default Carrera;