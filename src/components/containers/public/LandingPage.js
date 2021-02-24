import React, { Component } from 'react'
import { Navbar, Nav, Button, Card, Container, Row, Col } from 'react-bootstrap';
// utilities
import axios from 'axios';
import jwt_decode from 'jwt-decode';
//react icons
import { MdStar, MdSearch, MdExpandMore, MdShoppingBasket, MdNoteAdd, MdCheck, MdClose } from 'react-icons/md';
import { FaBreadSlice } from 'react-icons/fa';
// link
import { Link } from 'react-router-dom';
//Footer
import Footer from '../../common/Footer'
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
                    <div className="signLinks">
                        <Link to="/sign-in" className="sign-in-link">Sign In</Link>
                        <Link to="/sign-up" className="sign-up-link">Sign Up</Link>
                    </div>
                </Navbar>
                <div className="coverDisp mb-10">
                    <div className="promText">
                        <h1>Thousands of recipes,</h1>
                        <h1>ready to be cooked and served.</h1>
                        <p>Various kinds of recipes waiting for you to try everyday, and many more coming!</p>
                        <Link to="/sign-up"><button className="outlineButtonFormat"><h5>Get Started</h5></button></Link>
                    </div>
                    <Container fluid className="center-container">
                        <a href="#features"><h6>Learn More</h6></a>
                        <div className="center-icon">
                            <a href="#features"><MdExpandMore className="landing-icon"/></a>
                        </div>
                    </Container>
                </div>
                {/* Features */}
                <Container className="mb-20">
                    <h1 className="bannerTitle" id="features">Features</h1>
                    <Row>
                        <Col className="mb-20">
                            <Card className="featureCard">
                                <Card.Body  className="nt-pad">
                                    <div className="featureIconDiv">
                                        <MdSearch className="featureIcon"/>
                                    </div>
                                    <Card.Title className="bold">Search</Card.Title>
                                    <Card.Text>
                                        Search every type of recipe you desire to make.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="mb-20">
                            <Card className="featureCard">
                                <Card.Body className="nt-pad">
                                    <div className="featureIconDiv">
                                        <MdShoppingBasket className="featureIcon"/>
                                    </div>
                                    <Card.Title className="bold">Add</Card.Title>
                                    <Card.Text>
                                        Add recipes to your pantry to cook later.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="mb-20">
                            <Card className="featureCard">
                                <Card.Body  className="nt-pad">
                                    <div className="featureIconDiv">
                                        <MdStar className="featureIcon"/>
                                    </div>
                                    <Card.Title className="bold">Rate</Card.Title>
                                    <Card.Text>
                                       Rate and comment on other recipes you have tried cooking.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="mb-20">
                            <Card className="featureCard">
                                <Card.Body className="nt-pad">
                                    <div className="featureIconDiv">
                                        <MdNoteAdd className="featureIcon"/>
                                    </div>
                                    <Card.Title className="bold">Post and Share</Card.Title>
                                    <Card.Text>
                                        Post and share your own recipes online.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                
                {/* Featured Recipes */}
                <Container className="mb-10">
                    <h1 className="bannerTitle">Featured Recipes</h1>
                    <Row md={ recipes.length > 0 ? 4 : 12}>
                        {
                            recipes.length > 0 
                            ? 
                                recipes.map((recipe, i) => {
                                    return(
                                        <Col key={i} className="perCard">
                                            <Card className="mb-10">
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
                                                <Link to={`/public/recipe/view/${recipe._id}`}><Button className="customButton" variant="primary">See Full Recipe</Button></Link>
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
                
                 {/* Pro and Reg Users */}
                 <Container className="mb-20">
                <h1 className="bannerTitle">Be a Pro user now!</h1>
                    <Row className="rowUser">
                        <Col className="userType">
                            <div className="typeDiv reg"><h4>Regular</h4></div>
                            <div className="userBody">
                                <div className="flex-row userFeat">
                                    <MdCheck className="MDcheck"/>
                                    <p>Post and share recipes.</p>
                                </div>
                                <div className="flex-row userFeat">
                                    <MdCheck className="MDcheck"/>
                                    <p>Store recipes in your personal pantry.</p>
                                </div>
                                <div className="flex-row userFeat">
                                    <MdClose className="MDclose"/>
                                    <p>Add a price before other users can view your recipe</p>
                                </div>
                            </div>
                        </Col>
                        <Col className="userType">
                            <div className="typeDiv pro"><h4>Pro</h4></div>
                            <div className="userBody">
                                <div className="flex-row userFeat">
                                    <MdCheck className="MDcheck"/>
                                    <p>Post and share recipes.</p>
                                </div>
                                <div className="flex-row userFeat">
                                    <MdCheck className="MDcheck"/>
                                    <p>Store recipes in your personal pantry.</p>
                                </div>
                                <div className="flex-row userFeat">
                                    <MdCheck className="MDcheck"/>
                                    <p>Add a price before other users can view your recipe</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </>
        )
    }
}

export default LandingPage
