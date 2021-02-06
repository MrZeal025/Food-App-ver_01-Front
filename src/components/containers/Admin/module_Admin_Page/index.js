import React, { Component } from 'react'
import AdminFrame from '../AdminFrame';
import Delete from './Delete/index';
import axios from 'axios';
//react bootstrap
import { Card, Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { MdStar } from 'react-icons/md';

const path = process.env.PUBLIC_URL;
const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};

export class index extends Component {

    state = {
        show: false,
        recipes: [],
        tags: [],
        tagsSelected: []
    }

    async componentDidMount() {
       try {
            const recipe = await axios.get('/api/recipe/read-all', config);
            const tag = await axios.get('/json/tags.json');
            this.setState({
                ...this.state,
                recipes: recipe.data.data.recipes,
                tags: tag.data
            })
       }
       catch(error) {
        console.log(error)
       }
    }

    handleClose = (condition) => {
        this.setState({
            show: condition
        })
    }

    removeDeletedRecipe  = (_id) => {
        const { recipes } = this.state
        // filter out the facility that is not deleted && set it back to the state
        this.setState({
            recipes: recipes.filter(recipe => recipe._id !== _id)
        })
    }

    render() {
        const { recipes, show } = this.state
        return (
            <AdminFrame>
                <div className="mainHomeDiv">
                    <div className="left">
                        <InputGroup>
                            <FormControl
                            placeholder="Search for a recipe"
                            aria-label="Search for a recipe"
                            aria-describedby="basic-addon2"
                            className="pholder2"
                            />
                            <InputGroup.Append size="lg">
                            <Button className="searchButton">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                    <div className="middle">
                        <Container fluid >
                                <Row md={3}>
                                    {
                                        recipes.map((recipe, i) => {
                                            return(
                                                <Col key={i} className="perCard">
                                                    <Card>
                                                        <Card.Img variant="top" src={path + '/recipe-images/' + recipe.foodImages[0]} />
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
                                                            <Button className="customButton" variant="primary">See Full Recipe</Button>
                                                            <Delete
                                                                _id={recipe._id}
                                                                name={recipe.foodName}
                                                                show={show}
                                                                handleClose={this.handleClose}
                                                                removeRecipe={this.removeDeletedRecipe}
                                                            />
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
                        <button className="customButton" onClick={() => {}}>Add Your Recipe</button>
                    </div>
                </div>
            </AdminFrame>
        )
    }
}

export default index
