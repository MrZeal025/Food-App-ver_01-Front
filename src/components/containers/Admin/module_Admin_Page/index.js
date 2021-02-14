import React, { Component } from 'react'
import AdminFrame from '../AdminFrame';
// import SearchFilter from '../module_Search'
import axios from 'axios';
//react bootstrap
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
//react icons
import { MdStar } from 'react-icons/md';
import { FaBreadSlice } from 'react-icons/fa';
// link
import { Link } from 'react-router-dom';

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
        document.title = "Welcome - Bitezoo"
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
            <AdminFrame>
                <div className="mainHomeDiv">
                    <div className="left">
                        {/* <SearchFilter /> */}
                    </div>
                    <div className="middle">
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
                                                        <Button className="customButton w-100 mt-1" variant="primary">
                                                            <Link to={`/recipe/view/${recipe._id}`}>See Full Recipe</Link>
                                                        </Button>
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
                    </div>
                    <div className="right">
                        <Link className="customButton" to="/recipe/create">Add Your Recipe</Link>
                    </div>
                </div>
            </AdminFrame>
        )
    }
}

export default index