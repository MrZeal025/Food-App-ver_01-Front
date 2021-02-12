import React, { Component } from 'react'
// components
import { Modal, Button } from 'react-bootstrap';
import ImageUpload from '../../../../common/ProfilCoverUpload';
// utilities
import { FaCamera, FaTimes } from 'react-icons/fa'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import FsLightbox from 'fslightbox-react';
import { toast } from 'react-toastify';
import SuccessToast from '../../../../common/toastSuccess';
import ErrorToast from '../../../../common/toastError';

toast.configure();

// profil pic
const path = process.env.PUBLIC_URL;
const avatar ="avatar.jpg"
const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};

export class DPUploadModal extends Component {

    state = {
        _id: '',
        showDPModal: false,
        allowUpload: false,
        profilePicture: '',
        image : {
            name: [],
            formData: []
        },
        profileImageURL: [],
        status: false,
        openLightBox: false
    }

    async componentDidMount() {
        const decode = jwt_decode(token);
        const profile = await axios.get(`/api/user/profile/read/${decode._id}`, config);
        this.setState({
            _id: profile.data.data._id,
            profilePicture: profile.data.data.profilePicture
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
            showDPModal : !this.state.showDPModal
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
            profileImageURL: processName,
            allowUpload: true
        })
    }

    discard = () => {
        // revert to original state
        this.setState({
            showDPModal: false,
            image : {
                name: [],
                formData: []
            },
            profileImageURL: [],
            allowUpload: true
        })
    }

    uploadProfile = async () => {
        const { image, _id } = this.state    
        this.setState({
            status: true
        })    
        try {
            const upload =  await axios.put(`/api/uploads/profile/${_id}`, JSON.stringify({ data: image.formData }), config);
            this.setState({
                showDPModal: false,
                allowUpload: false,
                profilePicture: upload.data.data.imageResponse.url,
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

    openLightBox = () => {
        this.setState({
            openLightBox: !this.state.openLightBox
        })
    }

    render() {
        const { showDPModal, profilePicture, allowUpload, status, openLightBox } = this.state
        return (
            <>
                <img 
                    src={profilePicture !== "" ? profilePicture : path + '/profile/' + avatar } 
                    alt="DP" 
                    onClick={() => this.openLightBox()}
                />
                <div className="image-upload" onClick={() => this.setShowModal()}>
                    <label htmlFor="file-input">
                        <FaCamera/>
                    </label>
                </div>
                <Modal
                    show={showDPModal}
                    onHide={() => this.setShowModal()}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-modal-sizes-title-sm"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            Update Profile Picture
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
                            onClick={allowUpload ? () => this.uploadProfile() : () => {}}
                            disabled={!allowUpload}
                        >
                           {
                                status ? "Uploading" : status !== null ? "Update" : "Done"
                            }
                        </Button>
                    </Modal.Body>
                </Modal> 
                <FsLightbox
                    toggler={openLightBox}
                    sources={[profilePicture !== "" ? profilePicture : path + '/profile/' + avatar]}
                />
            </>
        )
    }
}

export default DPUploadModal
