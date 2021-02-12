import React, { Component } from 'react'
// components
import { Modal, Button } from 'react-bootstrap';
import ImageUpload from '../../../../common/ProfilCoverUpload';
// utilities
import { FaCamera, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// notification
import { toast } from 'react-toastify';
import SuccessToast from '../../../../common/toastSuccess';
import ErrorToast from '../../../../common/toastError';

toast.configure();

// profil pic
const avatar ="https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg"
const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};

export class CPUploadModal extends Component {
    
    state = {
        _id: '',
        showCPModal: false,
        allowUpload: false,
        coverPhoto: '',
        image : {
            name: [],
            formData: []
        },
        coverPhotoImageURL: []
    }

    async componentDidMount() {
        const decode = jwt_decode(token);
        const profile = await axios.get(`/api/user/profile/read/${decode._id}`, config);
        this.setState({
            _id: profile.data.data._id,
            coverPhoto: profile.data.data.backGroundPicture
        })
    }

    // toast notification
    // pre loaded function for toast notification
    ErrorToast = (ERROR_MSG) => {
        toast(<ErrorToast ERROR_MSG={ERROR_MSG}/>,{
            className: "stack-toast-error",
            position: "bottom-left",
            autoClose: 8000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true
        });
    };
    
    SuccessToast = (SUCCESS_MSG) => {
        toast(<SuccessToast SUCCESS_MSG={SUCCESS_MSG}/>,{
            className: "stack-toast",
            position: "bottom-left",
            autoClose: 8000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true
        });
    };

    setShowModal = () => {
        this.setState({
            showCPModal : !this.state.showCPModal
        })
    }  

    getImageFromUploads = (data, formData) => {
        const processName = []
        // process file name
        for(var i in data) {
            const extn = data[i].split('.').pop()
            const processFile = "xs.prcs." + data[i].split(' ').join('.').split('.').join('_') + "." + extn 
            processName.push(processFile)   
        } 
        this.setState({
            ...this.state,
            image: {
                name: data,
                formData: formData
            },
            coverPhotoImageURL: processName,
            allowUpload: true
        })
    }

    discard = () => {
        // revert to original state
        this.setState({
            showCPModal: false,
            image : {
                name: [],
                formData: []
            },
            profileImageURL: [],
            allowUpload: false
        })
    }

    uploadCoverPhoto = async () => {
        const { image, _id } = this.state
        this.setState({
            status: true
        })   
        try {
            const upload =  await axios.put(`/api/uploads/cover-photo/${_id}`, JSON.stringify({ data: image.formData }), config);
            this.setState({
                showCPModal: false,
                allowUpload: false,
                coverPhoto: upload.data.data.imageResponse.url,
                status: null
            })
            this.SuccessToast(upload.data.data.message)
        }
        catch (err) {
            this.setState({
                status: false
            })   
            this.ErrorToast(err.response)
        }
    }

    render() {
        const { showCPModal, coverPhoto, allowUpload, status } = this.state
        return (
            <>
                <img 
                    className="cover-photo" 
                    src={coverPhoto !== "" ? coverPhoto : avatar} 
                    alt="CP" 
                />
                <button className="btn btn-primary transparent-btn" onClick={()=> this.setShowModal()}>
                    <FaCamera/> {' '}
                    Edit Cover Photo
                </button>
                <Modal
                    show={showCPModal}
                    onHide={() => this.setShowModal()}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-modal-sizes-title-sm"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="example-modal-sizes-title-sm">
                                Update Cover Photo
                        </Modal.Title>
                        <Button className="modal-close-button" variant="secondary" size="lg" onClick={() => this.setShowModal()}>
                            <FaTimes/>
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <ImageUpload getImageFromUploads={this.getImageFromUploads}/>
                        <Button variant="secondary" onClick={e => this.discard()}>Discard</Button>
                        <Button 
                            variant="primary" 
                            onClick={allowUpload ? () => this.uploadCoverPhoto() : () => {} }
                            disabled={!allowUpload}
                        >
                            {
                                status ? "Uploading" : status !== null ? "Update" : "Done"
                            }
                        </Button>
                    </Modal.Body>
                </Modal> 
            </>
        )
    }
}

export default CPUploadModal
