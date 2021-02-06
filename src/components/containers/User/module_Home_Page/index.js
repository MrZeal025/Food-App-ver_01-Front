import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import axios from 'axios';
//react bootstrap
import { Card, Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
//react icons
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
        recipes: [],
        tags: [],
        tagsSelected: []
    }

    async componentDidMount() {
       try {
            const recipe = await axios.get('/api/recipe/read-all', config);
            const tag = await axios.get('/json/tags.json');
            this.setState({
                recipes: recipe.data.data.recipes,
                tags: tag.data
            })
       }
       catch(error) {
        console.log(error)
       }
    }

    setSelectedTags = (i) => {
        const {tagsSelected} = this.state
        this.setState({
            ...this.state,
            tagsSelected: [...tagsSelected, i]
            
        })
        if (tagsSelected.includes(i)) {
            this.setState({
                tagsSelected: tagsSelected.filter(tags => tags !== i)
            })
        }
    }

    render() {
        const { recipes, tags, tagsSelected } = this.state
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="left">
                    <InputGroup>
                        <FormControl
                        placeholder="Search for a recipe"
                        aria-label="Search for a recipe"
                        aria-describedby="basic-addon2"
                        className="searchInput"
                        />
                        <InputGroup.Append size="lg">
                        <Button className="searchButton">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                        <div className="filterDiv">
                            <h3>Search Filter</h3>
                            {/* Tags Filter Div */}
                            <div className="tagsFiltDiv">
                                <h5>Tags</h5>
                                        {
                                            tags.map((tag, i) => {
                                                return(
                                                    <button
                                                        key={i}
                                                        className={tagsSelected.includes(tag.value)? "tag customTag activeTag" : "tag customTag"}
                                                        style={{color:tag.tagColor, border: `2px solid ${tag.tagColor}`}}
                                                        onClick={() => {this.setSelectedTags(tag.value)}}
                                                        >
                                                            {tag.tagName}
                                                    </button> 
                                                )
                                            })
                                        }
                                <InputGroup className="mb-3">
                                    <FormControl
                                        className="pHolder customPHolder"
                                        placeholder="Add a tag for your next recipe"
                                    />
                                </InputGroup>
                            </div>
                            {/* Serving Size Filter Div */}
                            <div className="serveFiltDiv">
                                <h5>Serving Size</h5>
                                    <button className="serveOp">1</button>
                                    <button className="serveOp">2</button>
                                    <button className="serveOp">3-5</button>
                                    <button className="serveOp">6-10</button>
                                    <button className="serveOp">11-20</button>
                                    <button className="serveOp">21 and above</button>
                            </div>
                            {/* Rating Filter Div */}
                            <div className="ratingFiltDiv">
                                <h5>Rating</h5>
                                <div>
                                    <input type="radio" value="1" name="oneStar"className="radio"/>
                                    <label htmlFor="oneStar" className="rateLabel">
                                        <MdStar className="star starfilt true"/>
                                        (and above)
                                    </label>
                                </div>
                                <div>
                                    <input type="radio" value="1" name="twoStar"className="radio"/>
                                    <label htmlFor="twoStar" className="rateLabel">
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                        (and above)
                                    </label>
                                </div>
                                <div>
                                    <input type="radio" value="1" name="threeStar"className="radio"/>
                                    <label htmlFor="threeStar" className="rateLabel">
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                        (and above)
                                    </label>
                                </div>
                                <div>
                                    <input type="radio" value="1" name="fourStar"className="radio"/>
                                    <label htmlFor="fourStar" className="rateLabel">
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                        (and above)
                                    </label>
                                </div>
                                <div>
                                    <input type="radio" value="1" name="fiveStar"className="radio"/>
                                    <label htmlFor="fiveStar" className="rateLabel">
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                        <MdStar className="star starfilt true"/>
                                    </label>
                                </div>
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
                        <button className="customButton" onClick={() => {}}>Add Your Recipe</button>
                    </div>
                </div>
            </UserFrame>
        )
    }
}

export default index
