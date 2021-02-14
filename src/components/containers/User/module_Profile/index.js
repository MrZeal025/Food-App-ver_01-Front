import React, { Component } from 'react';
// components
import UserFrame from '../UserFrame';
import ProfileDisplay from './sub_module/ProfileDisplay';

export class index extends Component {
    render() {
        return (
            <UserFrame>
                <ProfileDisplay
                    id={this.props.match.params.id}
                />
            </UserFrame>
        )
    }
}

export default index
