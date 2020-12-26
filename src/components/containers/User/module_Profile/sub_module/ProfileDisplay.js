import React, { Component } from 'react'
// icons
import { FaCamera } from 'react-icons/fa';
// utilities
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import DPUploadModal from './DPUploadModal';
import CPUploadModal from './CPUploadModal';

const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};

export class ProfileDisplay extends Component {

    state = {
        _id: '',
        fullname: '',
        profilePicture: '',
        showCPModal: false
    }

    async componentDidMount() {
       
        if(token) {
            const decode = jwt_decode(token);
            const profile = await axios.get(`/api/user/profile/read/${decode._id}`, config);
            this.setState({
                fullname: profile.data.data.fullName,
                _id: profile.data.data._id,
                profilePicture: profile.data.data.profilePicture
            })
        }
    }
    
    render() {
        const { fullname, showCPModal, _id, profilePicture } = this.state
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
                            <DPUploadModal _id={_id}/>
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
