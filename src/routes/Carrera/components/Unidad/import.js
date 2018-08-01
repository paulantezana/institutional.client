import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';

class ImportModal extends PureComponent {
    constructor(props){
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel(){
        this.props.onModal(false);
    }

    render() {
        const { visible, onOk } = this.props;
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={visible}
                    // onOk={false}
                    onCancel={this.handleCancel}>
                        <p>Importa la información de las unidades academicas desde un archivo CSV. En el archivo CSV puede constar: nombre, credito, horas </p>
                        <p>Descarga la plantilla	y abre en Excel o documento de texto para ver el formato con todos los campos aceptados.</p>
                        <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}

export default ImportModal;