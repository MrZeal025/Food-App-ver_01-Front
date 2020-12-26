import React, { Component } from 'react';

// icons
import { FaRegCheckCircle } from 'react-icons/fa';

export class toastSuccess extends Component {

    render() {
        const { SUCCESS_MSG } = this.props
        return (
            <div className="stack-toast">
                <FaRegCheckCircle />
                <div className="toast-body">
                    <p>Great!</p>
                    <span>{SUCCESS_MSG}!</span>
                    <span className="lower-notif-stamp">a few seconds ago</span>
                </div>
            </div>
        )
    }
}

export default toastSuccess
