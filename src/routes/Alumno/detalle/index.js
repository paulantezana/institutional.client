import { Tabs, Icon, Alert } from 'antd';
import React, { PureComponent } from 'react';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const TabPane = Tabs.TabPane;

const GET_ALUMNOID = gql`
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

class Detalle extends PureComponent{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){
        console.log("change");
    }

    render(){
        const { id } = this.props;
        return (
            <div>
                <Query query={GET_ALUMNOID} variables={{ id }}>
                    {({ loading, error, data }) => {
                        if (error) return <Alert type="error" message={`Error! ${error.message}`} banner />;
                        return (

                            <div>
                                {
                                    data.AlumnoID &&
                                    <div>
                                        <img src={data.AlumnoID.avatar} alt="avatar"/> 
                                        <ul>
                                            <li>Nombres: {data.AlumnoID.nombres}</li>
                                            <li>Apellidos: {`${data.AlumnoID.apellido_paterno} ${data.AlumnoID.apellido_materno}`}</li>
                                            <li>Edad: {data.AlumnoID.fecha_nacimiento}</li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        );
                    }}
                </Query>
                <Tabs defaultActiveKey="1" onChange={this.handleChange}>
                    <TabPane tab={<span><Icon type="android" />Tab 1</span>} key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">Content of Tab Pane 2</TabPane>
                    {/* <TabPane tab={<span><Icon type="android" />Tab 3</span>} key="3">Content of Tab Pane 3</TabPane> */}
                </Tabs>
            </div>
        )
    }
}

export default Detalle;