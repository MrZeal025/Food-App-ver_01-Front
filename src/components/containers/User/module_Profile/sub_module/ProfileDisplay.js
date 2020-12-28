import React, { Component } from 'react'
// utilities
import jwt_decode from 'jwt-decode';
import DPUploadModal from './DPUploadModal';
import CPUploadModal from './CPUploadModal';

const token = localStorage.getItem('accessToken');

export class ProfileDisplay extends Component {

    state = {
        fullname: ''
    }

    async componentDidMount() {
       
        if(token) {
            const decode = jwt_decode(token);
            this.setState({
                fullname: decode.fullName,
            })
        }
    }
    
    render() {
        const { fullname } = this.state
        return (
            <>
                <div className="profile-control">
                    <div className="display-holder">
                        <CPUploadModal />
                        <div className="profile-pic-container">
                            <DPUploadModal/>
                        </div>
                    </div>
                    <h2 className="profileName">{fullname !== '' ? fullname : ''}</h2>
                </div>
            </>
        )
    }
}

export default ProfileDisplay
