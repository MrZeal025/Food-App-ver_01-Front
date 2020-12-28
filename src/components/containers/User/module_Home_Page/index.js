import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import axios from "axios";

export class index extends Component {

    async componentDidMount() {
       
    }

    render() {
        return (
            <UserFrame>
                <h1>Welcome User</h1>
            </UserFrame>
        )
    }
}

export default index
