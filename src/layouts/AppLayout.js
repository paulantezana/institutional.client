import React, { Component } from "react";
import { Layout, message } from 'antd';
const { Header, Content, Footer } = Layout;
import { connect } from "react-redux";
import decoder from 'jwt-decode';
import { reloadLogin } from '../redux/actions/usuario';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";


import GlobalHeader from '../components/GlobalHeader';
import SiderMenu from '../components/SiderMenu';
import GlobalFooter from '../components/GlobalFooter';

import logo from '../assets/logo.png';
import { PrivateRoute, Logout, GetUser } from '../helpers/auth';
import menu from '../common/menu';

import { ContainerQuery }  from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen, unenquireScreen } from 'enquire-js';

const query = {
    'screen-xs': {
      maxWidth: 575,
    },
    'screen-sm': {
      minWidth: 576,
      maxWidth: 767,
    },
    'screen-md': {
      minWidth: 768,
      maxWidth: 991,
    },
    'screen-lg': {
      minWidth: 992,
      maxWidth: 1199,
    },
    'screen-xl': {
      minWidth: 1200,
      maxWidth: 1599,
    },
    'screen-xxl': {
      minWidth: 1600,
    },
};
let isMobile;
enquireScreen(b => {
  isMobile = b;
});


//////////////////////////////////////////////////////////////////////////////////////////////////
import Dashboard from '../routes/Dashboard';
import Alumno from '../routes/Alumno';
import Profesor from '../routes/Profesor';
import Personal from '../routes/Personal';



//////////////////////////////////////////////////////////////////////////////////////////////////

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
            isMobile,
        };
        this.handleMenuCollapse = this.handleMenuCollapse.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleSideMenuClick = this.handleSideMenuClick.bind(this);
    }

    componentDidMount(){
        this.enquireHandler = enquireScreen(mobile => {
            this.setState({
              isMobile: mobile,
              collapsed: true,
            });
        });
        this.props.reloadLogin();
    }
    
    componentWillUnmount() {
        unenquireScreen(this.enquireHandler);
    }

    handleMenuCollapse(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleSideMenuClick({key}){
        menu & menu.map(m=>{
            if (m.id === key){
                this.props.history.push(m.path);
            }
        });
    }

    handleMenuClick({key}){
        if(key === 'logout'){
            Logout();
            this.props.history.push('/');
        }
    }

    render(){
        const { isMobile: mb } = this.state;
        const { match } = this.props;
        const currentUser = this.props.usuario.data.token ? decoder(this.props.usuario.data.token) : {};
        const layout = (
            <Layout>
                <SiderMenu
                    logo={logo}
                    onMenuClick={this.handleSideMenuClick}
                    // Authorized={Authorized}
                    menuData={menu}
                    collapsed={this.state.collapsed}
                    // location={this.props.usuario}
                    isMobile={mb}
                    onCollapse={this.handleMenuCollapse}
                />
                <Layout>
                    <Header style={{ padding: 0, height: "50px", lineHeight: "50px"}}>
                        <GlobalHeader
                            logo={logo}
                            currentUser={currentUser.usuario}
                            collapsed={this.setState.collapsed}
                            isMobile={mb}
                            onMenuClick={this.handleMenuClick}
                            onCollapse={this.handleMenuCollapse}
                        />
                    </Header>

                    <Content>
                        <Switch>
                            <Route exact path={`${match.url}`} component={Dashboard}/>
                            <Route exact path={`${match.url}profesor`} component={Profesor}/>
                            <Route exact path={`${match.url}alumno`} component={Alumno}/>
                            <Route exact path={`${match.url}personal`} component={Personal}/>
                        </Switch>
                    </Content>

                    <Footer style={{ padding: 0 }}>
                        {/* <GlobalFooter
                            links={[
                                {
                                    key: 'client',
                                    title: [<Icon type="github" />,' Client'],
                                    href: 'https://github.com/paulantezana/facturacion-client',
                                    blankTarget: true,
                                },
                                {
                                    key: 'server',
                                    title: [<Icon type="github"/>,' Server'],
                                    href: 'https://github.com/paulantezana/facturacion-go',
                                    blankTarget: true,
                                },
                                {
                                    key: 'author',
                                    title: [<Icon type="user" />,' Paul Antezana'],
                                    href: 'https://paulantezana.com',
                                    blankTarget: true,
                                },
                            ]}
                        /> */}
                    </Footer>
                </Layout>
                
            </Layout>
        )
        return (
            <ContainerQuery query={query}>
                {params => <div className={classNames(params)}>{layout}</div>}
            </ContainerQuery>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reloadLogin: ()=> dispatch(reloadLogin())
    }
}

const mapStateToProps  = state => {
    return {
        usuario: state.usuario
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);