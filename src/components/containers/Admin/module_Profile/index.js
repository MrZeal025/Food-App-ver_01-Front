import React, { Component } from 'react';
// components
import AdminFrame from '../AdminFrame';
import ProfileDisplay from './sub_module/ProfileDisplay';

export class index extends Component {
    render() {
        return (
            <AdminFrame>
                <ProfileDisplay/>
            </AdminFrame>
        )
    }
}

export default index
