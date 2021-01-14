import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import axios from 'axios';

//react bootstrap
import {Card, Button, InputGroup, FormControl, Container, Row, Col} from 'react-bootstrap'
//react icons
import {MdStar} from 'react-icons/md'

//stylesheet
import '../../../../scss/index.scss'


export class index extends Component {

    state = {
        recipes: [],
        tags: []
    }

    async componentDidMount() {
       try {
            const res = await axios.get('/json/recipe.json');
            const tag = await axios.get('/json/tags.json');
            this.setState({
                recipes: res.data,
                tags: tag.data
            })
       }
       catch(error) {
        console.log(error)
       }
    }

    render() {
        const { recipes, tags } = this.state
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="left">
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                            <Button variant="outline-secondary">Button</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <div className="filterDiv">
                            <h3>Search Filter</h3>
                            <div>
                                <h5>Tags</h5>
                                <Container>
                                    <Row md={3}>
                                        {
                                            tags.map((tag, i) => {
                                                return(
                                                    <Col className="tagFilter">
                                                        <button
                                                            key={i}
                                                            className="tag"
                                                            style={{color:tag.tagColor, border: `2px solid ${tag.tagColor}`}}>
                                                                {tag.tagName}
                                                        </button> 
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Container>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        className="pholder"
                                        placeholder="Add a tag for your next recipe"
                                    />
                                </InputGroup>
                            </div>
                            <div>
                                <h5>Serving Size</h5>
                            </div>
                        </div>

                    </div>
                    <div className="middle">
                        <Container fluid >
                                <Row md={3}>
                                    {
                                        recipes.map((recipe, i) => {
                                            return(
                                                <Col key={i} className="perCard">
                                                    <Card>
                                                        <Card.Img variant="top" src={recipe.recipeImg} />
                                                        <Card.Body className="customCardBody">
                                                        <Card.Title className="title">{recipe.recipeName}</Card.Title>
                                                        <div>
                                                            <p className="userName">By: {recipe.userName}</p>
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
                                                                                style={{color:tag.tagColor, border: `2px solid ${tag.tagColor}`}}>
                                                                                    {tag.tagName}
                                                                            </p>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="buttonDiv">
                                                        <Button className="customButton" variant="primary">See Full Recipe</Button>
                                                        <Button className="customButton secondary">Add to Pantry</Button>
                                                        </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                        </Container>
                    </div>
                    <div className="right">
                        <h1>Add Recipe</h1>
                    </div>
                </div>
               
            </UserFrame>
        )
    }
}

export default index
