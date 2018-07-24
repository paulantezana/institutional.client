import React, { PureComponent, Fragment } from 'react';
import styles from './index.scss';
import { Table, Alert } from 'antd';

class StandardTable extends PureComponent {
    constructor(props){
        super(props)
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    handleTableChange (pagination, filters, sorter) {
        const { onChange } = this.props;
        onChange(pagination, filters, sorter);
    };
    
    render(){
        const {
            dataSource,
            loading,
            columns,
            rowKey,
            rowSelection,
        } = this.props;
        return (
            <div className={styles.standardTable}>
                <div className={styles.tableAlert}>
                    <Alert
                        message = {
                            <Fragment>
                                {/* 已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                                {needTotalList.map(item => (
                                <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                                    {item.title}
                                    总计&nbsp;
                                    <span style={{ fontWeight: 600 }}>
                                    {item.render ? item.render(item.total) : item.total}
                                    </span>
                                </span>
                                ))} */}
                                <a  style={{ marginLeft: 24 }}> vaciado</a>
                            </Fragment>
                        }
                        type="info"
                        showIcon
                    />
                </div>
                <Table
                    loading={loading}
                    rowKey={rowKey || 'key'}
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    // pagination={paginationProps}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

export default StandardTable;