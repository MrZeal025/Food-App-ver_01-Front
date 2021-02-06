import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import SearchFilter from '../module_Search'
import axios from 'axios';

//react bootstrap
import {Card, Button, Container, Row, Col} from 'react-bootstrap'
//react icons
import {MdStar} from 'react-icons/md'



export class index extends Component {

    state = {
        recipes: [],
        tags: [],
        tagsSelected: []
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
        const { recipes} = this.state
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <SearchFilter />
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
                                                                                style={{color:tag.tagColor, border: `2px solid ${tag.tagColor} `}}>
                                                                                    {tag.tagName}
                                                                            </p>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="buttonDiv">
                                                        <Button className="customButton" variant="primary">See Full Recipe</Button>
                                                        <Button className="customButton custom-secondary">Add to Pantry</Button>
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
                        <button className="customButton" onClick="">Add Your Recipe</button>
                    </div>
                </div>
               
            </UserFrame>
        )
    }
}

export default index
