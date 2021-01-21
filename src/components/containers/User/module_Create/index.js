import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import axios from 'axios';

export class index extends Component {
    render() {
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="createRecipe">
                    <h5>Fill in details for your recipe!</h5>
                    </div>
                </div>
            </UserFrame>
        )
    }
}

export default index
