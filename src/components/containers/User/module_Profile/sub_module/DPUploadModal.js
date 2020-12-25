import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa'
export class DPUploadModal extends Component {

    state = {
        showDPModal: false
    }

    setShowModal = () => {
        this.setState({
            showDPModal : !this.state.showDPModal
        })
    }    


    render() {
        const { showDPModal } = this.state
        return (
            <>
                <div className="image-upload" onClick={() => this.setShowModal()}>
                    <label htmlFor="file-input">
                        <FaCamera/>
                    </label>
                </div>
                <Modal
                    size="sm"
                    show={showDPModal}
                    onHide={() => this.setShowModal()}
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

export default DPUploadModal
