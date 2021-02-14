import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import SearchFilter from '../module_Search'
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
        reviews: [],
        tags: [],
        tagsSelected: [],
        quickFilter: ""
    }

    async componentDidMount() {
        document.title = "Welcome - Bitezoo"
        try {
            const recipe = await axios.get('/api/recipe/read-all', config);
            const tag = await axios.get('/json/tags.json');
            const reviews = await axios.get('/api/review/all-reviews');
            this.setState({
                recipes: recipe.data.data.recipes,
                tags: tag.data,
                reviews: reviews.data.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }


    setSelectedTags = (i) => {
        const { tagsSelected } = this.state
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

    setQuickFilter = input => e => {
        this.setState({
            ...this.state,
            [input]: e.target.value
        })
    }

    render() {
        const { recipes, tags, tagsSelected, quickFilter, reviews} = this.state
        
        // transform the array object tag into a much simplier array string
        const items = recipes.map((element) => ({
            ...element, 
            sub: element.tags.map((tag) => { return tag.tagName })
        }))
        
        let filteredStudent = items.filter((recipe) => {

            // default values for filtering
            let tags = true;
            let recipeName = recipe.foodName.toUpperCase().indexOf(quickFilter.toUpperCase()) !== -1;

            // check if tag is selected
            if(tagsSelected.length > 0) {
                tags = recipe.sub.some(r => tagsSelected.includes(r));
            }

            // check if boolean condition is false to not render items
            if(!recipeName || !tags) {
                return false
            }

            return true
        })


        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="left">
                        <SearchFilter 
                            tags={tags}
                            tagsSelected={tagsSelected}
                            setSelectedTags={this.setSelectedTags}
                            setQuickFilter={this.setQuickFilter}
                            quickFilter={quickFilter}
                        />
                    </div>
                    <div className="middle">
                        <Row md={ recipes.length > 0 ? 4 : 12}>
                            {
                                filteredStudent.length > 0 
                                ? 
                                    filteredStudent.map((recipe, i) => {
                                        return(
                                            <Col key={i} className="perCard">
                                                <Card>
                                                    <Card.Img variant="top" src={recipe.foodImages[0]} />
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
                                                    <Button className="customButton" variant="primary"><Link to={`/recipe/view/${recipe._id}`}>See Full Recipe</Link></Button>
                                                    <Button className="customButton custom-secondary">Add to Pantry</Button>
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
                    </div>
                </div>
            </UserFrame>
        )
    }
}

export default index