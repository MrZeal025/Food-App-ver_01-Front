import React, { Component } from 'react'
import Navbar from '../../navigations/AdminNavbar';

export class index extends Component {
    render() {
        return (
            <>
                <Navbar/>
                {this.props.children}
            </>
        )
    }
}

export default index
