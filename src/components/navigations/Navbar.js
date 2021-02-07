import React, { Component } from 'react';
import Logout from '../authentication/logout/index';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AiOutlineMessage } from 'react-icons/ai';
import { IoNotificationsOutline, IoHome } from 'react-icons/io5';
// utilities
import jwt_decode from 'jwt-decode';
const logoLight = process.env.PUBLIC_URL + '/assets/logowhite@2x.png';

export class NavBar extends Component {

    state = {
        user: {}
    }

    componentDidMount(){
        const token = localStorage.getItem('accessToken');
        if(token) {
            const decode = jwt_decode(token);
            this.setState({
                user:  decode
            })
        }
    }

    render() {
        const { user } = this.state
        return (
            <Navbar className="nav-overrides" collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/" className="BZlogo">
                     <img
                            src={logoLight}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt=""
                        />
                </Navbar.Brand>
                <Navbar.Brand href="/" className="brandN">Bitezoo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <div className="flex-grow-1 w-100"></div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">
                            <IoHome/>
                        </Nav.Link>
                        <Nav.Link href="#messages">
                            <AiOutlineMessage/>
                        </Nav.Link>
                        <Nav.Link href="#pricing">
                            <IoNotificationsOutline/>
                        </Nav.Link>
                        <NavDropdown className="to-uppercase" title={user.fullName || "Loading"} id="collasible-nav-dropdown">
                            <NavDropdown.Item href={`/profile/${user._id}`}>Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <Logout/>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar
