import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class RegisterConfirmed extends Component {
    
    componentDidMount(){
        localStorage.removeItem('registerToken');
    }
    
    render() {
        return (
            <div>
                You can now <Link to="/sign-in" >sign in.</Link>
            </div>
        )
    }
}

export default RegisterConfirmed
