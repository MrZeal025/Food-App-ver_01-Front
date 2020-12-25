import React, { Component } from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import { FaAngleDown } from 'react-icons/fa';
// utilities
import jwt_decode from 'jwt-decode';
//routing
import {Link} from "react-router-dom";

export class LandingPage extends Component {

    componentDidMount(){
        // check for an existing token 
        this.verifyAccessToken()
    }

    verifyAccessToken = () => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            const hasToken =  jwt_decode(token);
            switch(hasToken.type) {
                case "User:Regular" :
                    window.location.href = "/home";
                    break;
                case "Admin:Super" :
                    window.location.href = "/admin/home";
                    break;
                default: 
                    break;
            }
        }
    }

    render() {
        return (
            <>
                <Navbar className="landNav" sticky="top" variant="dark">
                    <Navbar.Brand href="#home" className="BZlogo">
                        <img
                            src="../../../assets/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt=""
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#home" className="brandN">Bitezoo</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" className="navLink">Home</Nav.Link>
                        <Nav.Link href="#features" className="navLink">Features</Nav.Link>
                        <Nav.Link href="#" className="navLink">Contact</Nav.Link>
                    </Nav>
                    <div className="signLinks">
                        <Link to="/sign-in" className="sign-in-link">Sign In</Link>
                        <Link to="/sign-up" className="sign-up-link">Sign Up</Link>
                    </div>
                </Navbar>
                <div className="coverDisp">
                    <div className="promText">
                        <h1>Thousands of recipes,</h1>
                        <h1>ready to be cooked and served.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et.</p>
                        <Button variant="outline-light">Get Started</Button>
                    </div>
                    <div className="center-container">
                        <p>Learn More</p>
                        <FaAngleDown className="landing-icon"/>
                    </div>
                </div>
                {/* this is temporary please remove upon new feature */}
                <div style={{ height: "100vh", width: "100vw" }}>

                </div>
            </>
        )
    }
}

export default LandingPage
