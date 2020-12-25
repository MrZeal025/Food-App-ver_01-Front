import React, { Component } from 'react'
// icons
import { FaCamera } from 'react-icons/fa';
// utilities
import jwt_decode from 'jwt-decode';
import DPUploadModal from './DPUploadModal';
import CPUploadModal from './CPUploadModal';

// profil pic
const profilPicture = process.env.PUBLIC_URL + '/profile/ako.jpg';
const token = localStorage.getItem('accessToken');

export class ProfileDisplay extends Component {

    state = {
        fullname: '',
        showDPModal: false,
        showCPModal: false
    }

    componentDidMount() {
        if(token) {
            const decode = jwt_decode(token);
            this.setState({
                fullname: decode.fullName
            })
        }
    }
    
    render() {
        const { fullname, showCPModal, showDPModal } = this.state
        return (
            <>
                <div className="profile-control">
                    <div className="display-holder">
                        <img className="cover-photo" src="https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg" alt="profile-cover" />
                        <button className="btn btn-primary transparent-btn">
                            <FaCamera/> {' '}
                            Edit Cover Photo
                        </button>
                        <div className="profile-pic-container">
                            <img src={profilPicture} alt="DP"/>
                            <DPUploadModal/>
                        </div>
                    </div>
                    <h2 className="profileName">{fullname !== '' ? fullname : ''}</h2>
                </div>
                <CPUploadModal 
                    show={showCPModal}
                    toggleModal={this.setShowModal}
                />
                
            </>
        )
    }
}

export default ProfileDisplay
