import React, { Component } from 'react';
import Logout from '../authentication/logout/index';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// utilities
import jwt_decode from 'jwt-decode';
import { FaPlus } from 'react-icons/fa';
import { MdShoppingBasket, MdHome } from 'react-icons/md';
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
                <Navbar.Brand href="/home" className="BZlogo">
                    <img
                        src={logoLight}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        alt=""
                    />
                </Navbar.Brand>
                <Navbar.Brand href="/home" className="brandN">Bitezoo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <div className="flex-grow-1 w-100"></div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/recipe/create"className="navLink">
                            <FaPlus className="navIcon"/>
                        </Nav.Link>
                        <Nav.Link href="/" className="navLink">
                            <MdHome className="navIcon"/>
                        </Nav.Link>
                        <Nav.Link href="/pantry"  className="navLink">
                            <MdShoppingBasket className="navIcon"/>
                        </Nav.Link>
                        <NavDropdown className="to-uppercase navName " title={user.fullName || "Loading"} id="collasible-nav-dropdown">
                            <NavDropdown.Item href={`/profile/${user._id}`}>Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/user/pro" className="goProLink">Go Pro!</NavDropdown.Item>
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
