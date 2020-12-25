import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class RegisterVerifyPanel extends Component {
    render() {
        return (
            <div>
                Please verify you email address, a link has been sent.!
                <Link to="/">Go to home page</Link>
            </div>
        )
    }
}

export default RegisterVerifyPanel