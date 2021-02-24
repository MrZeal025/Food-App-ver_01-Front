import React, { Component } from 'react'
import UserFrame from '../UserFrame';

//react bootstrap
import { Accordion, Button, Card, Nav, Row, Col } from 'react-bootstrap'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
//react icons
import { MdStar } from 'react-icons/md';
import { FaBreadSlice } from 'react-icons/fa';
import { Toast } from 'react-bootstrap'
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};


export class index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pantries: [],
            step: 0,
            reviews: [],
            showtoast: false,
            toastMessage: ""
        }
    }

    async componentDidMount() {
        try {
            const getMyRecipes = await axios.get(`/api/pantry/read/${jwtDecode(token)._id}`, config);
            const reviews = await axios.get('/api/review/all-reviews');
            this.setState({
                pantries: getMyRecipes.data.data,
                reviews: reviews.data.data
            })
        } 
        catch (error) {
            this.setState({
                pantries: []
            })    
        }
    }

    setStep = (step) => {
        this.setState({
            step: step
        })
    }

    removeFromPantty = async (id) => {
        const { pantries } = this.state
        try {
            await axios.delete(`/api/pantry/remove/${id}`, config);
            const newPantry = pantries.filter(pantry => pantry._id !== id);
            console.log(newPantry)
            this.setState({
                pantries: newPantry
            })
            this.setShow(true, "Item removed from pantry")
        } 
        catch (error) {
            this.setShow(true, "Failed to remove from pantry")
        }
    }

    setShow = (condition, message) => {
        this.setState({
            showtoast: condition,
            toastMessage: message ? message : "Something went wrong"
        })
    }


    render() {
        const { step, pantries,  reviews, showtoast, toastMessage } = this.state
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="fullRecDiv">
                        <div className="white-bg mt-4 mb-4">
                            <h1>Pantry</h1>
                            <Nav variant="tabs" defaultActiveKey="link-1">
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1" onClick={() => this.setStep(0)}>Recipe List</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2" onClick={() => this.setStep(1)}>Grocery List</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            {
                                step === 0 &&
                                 <Row md={ pantries.length > 0 ? 4 : 12}>
                                    {
                                        pantries.length > 0 
                                        ? 
                                            pantries.map((recipe, i) => {
                                                return(
                                                    <Col key={i} className="perCard mt-4">
                                                        <Card>
                                                            <div>
                                                                <Card.Img 
                                                                    variant="top" 
                                                                    src={recipe.foodImages[0]} 
                                                                    
                                                                />
                                                            </div>
                                                            <Card.Body className="customCardBody">
                                                            <Card.Title className="title">{recipe.foodName}</Card.Title>
                                                            <div>
                                                                <p className="userName">By: {recipe.ownerInfo.name}</p>
                                                                <div className="rating">
                                                                    <MdStar 
                                                                        className={Math.round(reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) / 5) >= 1 ? "star true" : "star false"}
                                                                    />
                                                                    <MdStar 
                                                                        className={Math.round(reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) / 5) >= 2 ? "star true" : "star false"}
                                                                    />
                                                                    <MdStar 
                                                                        className={Math.round(reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) / 5) >= 3 ? "star true" : "star false"}
                                                                    />
                                                                    <MdStar 
                                                                        className={Math.round(reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) / 5) >= 4 ? "star true" : "star false"}
                                                                    />
                                                                    <MdStar 
                                                                        className={Math.round(reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) / 5) >= 5 ? "star true" : "star false"}
                                                                    />
                                                                    <p>({ reviews.filter(review => review.recipeId === recipe._id).length })</p>
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
                                                            <Link to={`/recipe/view/${recipe._id}`}>
                                                                <Button className="customButton buttonColorBlue" variant="primary">
                                                                    <p>See Full Recipe</p>
                                                                </Button>
                                                            </Link>
                                                            <Button className="customButton" variant="danger" onClick={() => this.removeFromPantty(recipe._id)}>
                                                                <p>Remove from pantry</p>
                                                            </Button>
                                                            </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                        : 
                                        <div className="center-container w-100">
                                            <div className="empty-center-display-profile">
                                                <FaBreadSlice/>
                                                <p>No recipes in  the pantry at the moment</p>
                                            </div>
                                        </div>
                                    }
                                </Row>
                            }
                            {
                                step === 1 &&
                                <div className="mt-2">
                                    <Accordion defaultActiveKey="0">
                                        {
                                            pantries.length > 0 ?
                                                pantries.map((pantry, i) => {
                                                    return (
                                                        <Card key={i}>
                                                            <Card.Header>
                                                                <Accordion.Toggle as={Button} className="d-flex w-100" variant="link" eventKey={i.toLocaleString()}>
                                                                    <div className="w-75 text-left">
                                                                        <p>Recipe Name: {pantry.foodName}</p>
                                                                    </div>
                                                                    <div className="w-25">
                                                                        <Button variant="danger" className="float-right">Remove</Button>
                                                                    </div>
                                                                </Accordion.Toggle>
                                                            </Card.Header>
                                                            <Accordion.Collapse eventKey={i.toLocaleString()}>
                                                                <Card.Body>
                                                                    <ul>
                                                                        {
                                                                            pantry.ingredients.map((ingredient, i) => {
                                                                                return (
                                                                                    <li key={i}>{ingredient.name}</li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                    )
                                                })
                                            :
                                            <div className="center-container w-100">
                                                <div className="empty-center-display-profile">
                                                    <FaBreadSlice/>
                                                    <p>No grocery items at the moment</p>
                                                </div>
                                            </div>
                                        }

                                    </Accordion>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Toast onClose={() => this.setShow(false)} show={showtoast} delay={4000} autohide>
                    <Toast.Header>
                        <FaExclamationTriangle/>
                        <strong className="mr-auto ml-2"> Notice!</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}!</Toast.Body>
                </Toast>
            </UserFrame>
        )
    }
}

export default index
