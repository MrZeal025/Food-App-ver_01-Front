import React, { Component } from 'react'
import Navbar from '../../navigations/Navbar';
import Footer from '../../common/Footer';

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
