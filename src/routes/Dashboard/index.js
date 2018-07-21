import React, { PureComponent } from 'react';
import { Table, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

class Dashboard extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <h1>Estamos en Dashboard</h1>
        )
    }
}

export default Dashboard;