import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { message, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert, Row, Col } from 'antd';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.scss';

// alert("Hola");

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
import Carrera from './components/Carrera';
import Semestre from './components/Semestre';
import Modulo from './components/Modulo';
import Unidad from './components/Unidad';
//////////////////////////////////////////////////////////

class CarreraPage extends PureComponent{
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
                        <Col xs={24} sm={12} md={8}>
                            <div className={styles.row}>
                                <Carrera/>
                            </div>
                            <Divider/>
                            <div className={styles.row}>
                                <Semestre/>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <div className={styles.row}>
                                <Modulo/>
                            </div>
                            <Divider/>
                            <div className={styles.row}>
                                <Unidad/>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderLayout>
        )
    }
}

export default CarreraPage;