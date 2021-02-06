import React, { Component } from 'react'
import Navbar from '../../navigations/Navbar';

export class index extends Component {
    render() {
        return (
            <>
                <Navbar/>
                {this.props.children}
                {/* <Footer/> */}
            </>
        )
    }
}

export default index
