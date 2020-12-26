import React, { Component } from 'react';
// icons
import { FaRegTimesCircle } from 'react-icons/fa';

export class toastError extends Component {

    render() {
        const { ERROR_MSG } = this.props;
        return (
            <div className="stack-toast-error">
                <FaRegTimesCircle />
                <div className="toast-body">
                    <p>Oops!</p>
                    <span>Its seems we ran into a problem.</span>
                    <span>{ERROR_MSG}!</span>
                    <span className="lower-notif-stamp">a few seconds ago</span>
                </div>
            </div>
        )
    }
}

export default toastError
