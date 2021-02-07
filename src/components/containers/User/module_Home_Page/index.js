import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import SearchFilter from '../module_Search'
import axios from 'axios';
//react bootstrap
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
//react icons
import { MdStar } from 'react-icons/md';
// link
import { Link } from 'react-router-dom';

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
        const { recipes} = this.state
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="left">
                        <SearchFilter />
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
                                                        <Button className="customButton" variant="primary"><Link to={`/recipe/view/${recipe._id}`}>See Full Recipe</Link></Button>
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
                        <Link className="customButton" to="/recipe/create">Add Your Recipe</Link>
                    </div>
                </div>
            </UserFrame>
        )
    }
}

export default index