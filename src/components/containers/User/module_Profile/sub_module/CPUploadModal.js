import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

export class CPUploadModal extends Component {
    render() {
        const { show, toggleModal } = this.props
        return (
            <>
             <Modal
                size="sm"
                show={show}
                onHide={toggleModal}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Small Modal
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
            </Modal> 
            </>
        )
    }
}

export default CPUploadModal
