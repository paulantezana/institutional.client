import React, { PureComponent, Fragment } from 'react';
import { Tooltip as TooltipANTD, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert, Row, Col } from 'antd';
import {Chart, Axis, Tooltip, Geom, Legend, Coord, Label} from "bizcharts";

///////////////////////////////////////////////////////////////////////
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.scss';
import ChartCard from './../../components/ChartCard';
///////////////////////////////////////////////////////////////////////

const data = [
    { sex: 'M', sold: 0.45 },
    { sex: 'F', sold: 0.55 }
];
const COLORS = [ '#1890ff', '#f04864' ];

const cols = {
    sold: { alias: '销售量' },
    genre: { alias: '游戏种类' }
};

class Dashboard extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: { marginBottom: 24 },
        };
        return(
            <Fragment>
                <Row gutter={16}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Gráfico estadistico"
                            // loading={loading}
                            action={
                                <TooltipANTD title="Descripcion corta de ayuda">
                                    <Icon type="info-circle-o" />
                                </TooltipANTD>
                            }
                            // total={() => <Yuan>126560</Yuan>}
                            footer={<span>span content</span>}
                            contentHeight={100}
                            >
                            <Chart height={100} data={data} padding={[0, 0, 0, 0]} forceFit>
                                <Coord type="theta" radius={0.8} />
                                <Tooltip showTitle={false} />
                                <Geom type='intervalStack' position="sold" color={['sex', COLORS]} shape='radiusPie'/>
                            </Chart>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Gráfico estadistico"
                            // loading={loading}
                            action={
                                <TooltipANTD title="Descripcion corta de ayuda">
                                    <Icon type="info-circle-o" />
                                </TooltipANTD>
                            }
                            // total={() => <Yuan>126560</Yuan>}
                            footer={<span>span content</span>}
                            contentHeight={100}
                            >
                            <Chart height={100} data={data} padding={[0, 0, 0, 0]} forceFit>
                                <Coord type="theta" radius={0.8} />
                                <Tooltip showTitle={false} />
                                <Geom type='intervalStack' position="sold" color={['sex', COLORS]} shape='radiusPie'/>
                            </Chart>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Gráfico estadistico"
                            // loading={loading}
                            action={
                                <TooltipANTD title="Descripcion corta de ayuda">
                                    <Icon type="info-circle-o" />
                                </TooltipANTD>
                            }
                            // total={() => <Yuan>126560</Yuan>}
                            footer={<span>span content</span>}
                            contentHeight={100}
                            >
                            <Chart height={100} data={data} padding={[0, 0, 0, 0]} forceFit>
                                <Coord type="theta" radius={0.8} />
                                <Tooltip showTitle={false} />
                                <Geom type='intervalStack' position="sold" color={['sex', COLORS]} shape='radiusPie'/>
                            </Chart>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Gráfico estadistico"
                            // loading={loading}
                            action={
                                <TooltipANTD title="Descripcion corta de ayuda">
                                    <Icon type="info-circle-o" />
                                </TooltipANTD>
                            }
                            // total={() => <Yuan>126560</Yuan>}
                            footer={<span>span content</span>}
                            contentHeight={100}>
                            <Chart height={100} data={data} padding={[0, 0, 0, 0]} forceFit>
                                <Coord type="theta" radius={0.8} />
                                <Tooltip showTitle={false} />
                                <Geom type='intervalStack' position="sold" color={['sex', COLORS]} shape='radiusPie'/>
                            </Chart>
                        </ChartCard>
                    </Col>
                </Row>
                <Card>
                </Card>
            </Fragment>
        )
    }
}

export default Dashboard;