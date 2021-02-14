import React, { Component } from 'react'
import { Navbar, Nav, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { FaAngleDown } from 'react-icons/fa';
// utilities
import axios from 'axios';
import jwt_decode from 'jwt-decode';
//react icons
import { MdStar } from 'react-icons/md';
import { FaBreadSlice } from 'react-icons/fa';
// link
import { Link } from 'react-router-dom';
const logoLight = process.env.PUBLIC_URL + '/assets/logowhite@2x.png';

export class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        }
    }

    async componentDidMount(){
        // check for an existing token 
        this.verifyAccessToken()
        try {
          const recipes = await axios.get('/api/recipe/read-all/public');  
          if(Array.isArray(recipes.data.data.recipes)){
            this.setState({
                recipes: recipes.data.data.recipes
            })
          }
          else {
            this.setState({
                recipes: []
            })
          }

        } catch (error) {
            
        }
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
        const  { recipes } = this.state
        return (
            <>
                <Navbar className="landNav" sticky="top" variant="dark">
                    <Navbar.Brand href="#home" className="BZlogo">
                        <img
                            src={logoLight}
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
                <Container fluid >
                    <Row md={ recipes.length > 0 ? 3 : 12}>
                        {
                            recipes.length > 0 
                            ? 
                                recipes.map((recipe, i) => {
                                    return(
                                        <Col key={i} className="perCard">
                                            <Card>
                                                <Card.Img variant="top" src={recipe.foodImages[0]} />
                                                <Card.Body className="customCardBody">
                                                <Card.Title className="title">{recipe.foodName}</Card.Title>
                                                <div>
                                                    <p className="userName">By: {recipe.ownerInfo.name}</p>
                                                    <div className="rating">
                                                        <MdStar className="star true"/>
                                                        <MdStar className="star true"/>
                                                        <MdStar className="star true"/>
                                                        <MdStar className="star false"/>
                                                        <MdStar className="star false"/>
                                                        <p>(1.5k)</p>
                                                    </div>
                                                    <div className="tagDiv">
                                                        {
                                                            recipe.tags.map((tag, i) => {
                                                                return(
                                                                    <p 
                                                                        key={i}
                                                                        className="tag" 
                                                                        style={{color:tag.color, border: `2px solid ${tag.color} `}}>
                                                                            {tag.tagName}
                                                                    </p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="buttonDiv">
                                                <Button className="customButton" variant="primary"><Link to={`/public/recipe/view/${recipe._id}`}>See Full Recipe</Link></Button>
                                                </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            : 
                            <div className="empty-center-display">
                                <FaBreadSlice/>
                                <p>No recipes at the moment</p>
                            </div>
                        }
                    </Row>
                </Container>
            </>
        )
    }
}

export default LandingPage
