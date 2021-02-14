import React, { Component } from 'react'
import UserFrame from '../UserFrame'
import axios from 'axios'
//react icons
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { MdStar } from 'react-icons/md'
import { FaBreadSlice } from 'react-icons/fa';
import FsLightbox from 'fslightbox-react';
import jwtDecode from 'jwt-decode'

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
        recipe: {
            foodImages: [],
            nutrition: {
                totalCalories: "",
                caloricBreakDown: {},
            },
            ownerInfo: {},
            tags: [],
            ingredients: [],
            instruction: [],
            openLightBox: false,
            profilePicture: ""
        }
        ,
        newComment: {
            recipeId: "",
            rating: 0,
            comment: "",
            userInfo: {
                _id: "",
                fullname: ""
            }
        },
        isOnPantry: false
    }

    async componentDidMount() {
        
        try {
            const recipe = await axios.get(`/api/recipe/${this.props.match.params.id}`, config);
            const profile = await axios.get(`/api/user/profile/read/${jwtDecode(token)._id}`, config);
            document.title = `${recipe.data.data.recipe.foodName} - Bitezoo`
            this.setState({
                recipe: recipe.data.data.recipe,
                profilePicture: profile.data.data.profilePicture
            })
        }
        catch(error) {
            console.log(error.response)
        }

        try {
            const recipe = await axios.get('/api/recipe/read-all', config);
            this.setState({
                recipes: recipe.data.data.recipes,
            })
       }
       catch(error) {
        console.log(error)
       }
    }

    openLightBox = () => {
        this.setState({
            openLightBox: !this.state.openLightBox
        })
    }

    addToPanty = () => {
        this.setState({
            isOnPantry: !this.state.isOnPantry
        })
    }

    handleComment = input => e => {
        this.setState({
            newComment: {
                ...this.state.newComment,
                [input]: e.target.value
            }
        })
    }

    render() {
        const { recipe, recipes, openLightBox, profilePicture, isOnPantry, newComment } = this.state
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="middle pr-20">
                        <div className="white-bg mb-4 mt-4">
                            <h4 className="recipeName">{recipe.foodName}</h4>
                            {/* userName */}
                            <div className="flex-row mb-10">
                                <img className="small-avatar" src={recipe.ownerInfo.profilePicture === "" ? profilePicture : recipe.ownerInfo.profilePicture} alt="DP"/>
                                <div className="userName"><h6>By: {recipe.ownerInfo.name}</h6></div>
                            </div>
                            {/* rating */}
                            <div className="rating fullv mb-10">
                                <MdStar className="star true"/>
                                <MdStar className="star true"/>
                                <MdStar className="star true"/>
                                <MdStar className="star false"/>
                                <MdStar className="star false"/>
                                <p className="rateCount">(1.5k)</p>
                            </div>
                            {/* Image and Details */}
                            <div className="flex-row mb-10 imgAndDetails">
                                <img 
                                    src={recipe.foodImages[0]} 
                                    alt="RecipeImage"
                                    className="recImg"
                                    onClick={() => this.openLightBox()}
                                />
                                <div className="recDetails">
                                    <div className="flex-row mb-10">
                                        <h6 className="label mr-10">Duration:</h6>
                                        <h6>{recipe.readyIn}</h6>
                                    </div>
                                    <div className="flex-row mb-10">
                                        <h6 className="label mr-10">Servings:</h6>
                                        <h6>{recipe.goodFor}</h6>
                                    </div>
                                    <div className="mb-10">
                                        <h6 className="label mb-10">Nutrition Facts</h6>
                                        <div className="flex-row mb_5">
                                            <h6 className="nutCont mr-10">{recipe.nutrition.totalCalories === '' ? "None" : recipe.nutrition.totalCalories }</h6>
                                            <h6 className="label">Total Calories</h6>
                                        </div>
                                        <div className="flex-row mb_5">
                                            <h6 className="nutCont mr-10">{recipe.nutrition.caloricBreakDown.percentCarbs}</h6>
                                            <h6 className="label">Carbohydrates</h6>
                                        </div>
                                        <div className="flex-row mb_5">
                                            <h6 className="nutCont mr-10">{recipe.nutrition.caloricBreakDown.percentProtein}</h6>
                                            <h6 className="label">Protein</h6>
                                        </div>
                                        <div className="flex-row mb_5">
                                            <h6 className="nutCont mr-10">{recipe.nutrition.caloricBreakDown.percentFat}</h6>
                                            <h6 className="label">Fat</h6>
                                        </div>
                                    </div>
                                    {/* tags */}
                                    <div>
                                        <h6 className="label mb-10">Tags</h6>
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
                            </div>
                            <div className="image-holder">
                                {
                                    recipe.foodImages.map((foodImage, i) => {
                                        return <img 
                                            key={i}
                                            src={foodImage} 
                                            alt="RecipeImage"
                                            className="recImg"
                                            onClick={() => this.openLightBox()}
                                        />
                                    })
                                }
                            </div>
                            {/* Ingredients */}
                            <div className="mb-10">
                                <h5 className="mb-10 ingTitle">Ingredients</h5>
                                <ul>
                                    {
                                        recipe.ingredients.map((ingredient, i) => {
                                            return <li key={i} >{ingredient.name}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            {/* Procedure */}
                            <div className="mb-10">
                                <h5 className="mb-10 procTitle">Procedure</h5>
                                <ol className="justify">
                                    {
                                        recipe.instruction.map((intruction, i) => {
                                            return <li className="mt-2" key={i}>{intruction}</li>
                                        })
                                    }
                                </ol>
                            </div>
                            {/* Action Button */}
                            <div>
                                {
                                    !isOnPantry 
                                    ? <button 
                                        className="customButtonFormat buttonColorBlue mr-10"
                                        onClick={() => this.addToPanty()}
                                    >
                                        <p>Add to Pantry</p>
                                    </button> 
                                    : <>
                                        <button className="customButtonFormat buttonColorBlue mr-10"><p>Add Ingredients to Grocery List</p></button>
                                        <button 
                                            className="customButtonFormat buttonColorRed"
                                            onClick={() => this.addToPanty()}
                                        >
                                            <p>Remove from Pantry</p>
                                        </button>
                                    </>   
                                }
                            </div>
                        </div>
                        <div className="white-bg">
                            <h5 className="rateTitle mb-10">Ratings</h5>
                            {/* For Input of the user for a comment */}
                            <div className="flex-col mb-20">
                                {/* Stars */}
                                <div className="rating fullv mb-10">
                                    <MdStar className="star false"/>
                                    <MdStar className="star false"/>
                                    <MdStar className="star false"/>
                                    <MdStar className="star false"/>
                                    <MdStar className="star false"/>
                                </div>
                                <div className="inputSetFormat">
                                    <textarea
                                        rows="4"
                                        type="text"
                                        className="input-type-area"
                                        placeholder={`Add a comment`}
                                        name="method"
                                        value={newComment.comment}
                                        onChange={this.handleComment("comment")}
                                    />
                                </div>
                                <button className="customButtonFormat rateButton"><p>Post</p></button>
                            </div>
                            {/* Rating Post Sample */}
                            <div className="flex-col mb-20">
                                <div className="flex-row mb-10">
                                    <div className="imgTempo"></div>
                                    <div className="userName"><h6>Other User</h6></div>
                                </div>
                                {/* Stars */}
                                <div className="rating fullv mb-10">
                                    <MdStar className="star true"/>
                                    <MdStar className="star true"/>
                                    <MdStar className="star true"/>
                                    <MdStar className="star false"/>
                                    <MdStar className="star false"/>
                                </div>
                                <p className="justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptatibus iure recusandae, repellendus quam tenetur voluptates corrupti nesciunt, suscipit perferendis quos ab nostrum tempore aut modi ad porro repudiandae eligendi.</p>
                            </div>
                            <div className="flex-col mb-20">
                                <div className="flex-row mb-10">
                                    <div className="imgTempo"></div>
                                    <div className="userName"><h6>Other User</h6></div>
                                </div>
                                {/* Stars */}
                                <div className="rating fullv mb-10">
                                    <MdStar className="star true"/>
                                    <MdStar className="star true"/>
                                    <MdStar className="star true"/>
                                    <MdStar className="star false"/>
                                    <MdStar className="star false"/>
                                </div>
                                <p className="justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptatibus iure recusandae, repellendus quam tenetur voluptates corrupti nesciunt, suscipit perferendis quos ab nostrum tempore aut modi ad porro repudiandae eligendi.</p>
                            </div>
                            <div className="flex-col mb-20">
                                <div className="flex-row mb-10">
                                    <div className="imgTempo"></div>
                                    <div className="userName"><h6>Other User</h6></div>
                                </div>
                                {/* Stars */}
                                <div className="rating fullv mb-10">
                                    <MdStar className="star true"/>
                                    <MdStar className="star true"/>
                                    <MdStar className="star true"/>
                                    <MdStar className="star false"/>
                                    <MdStar className="star false"/>
                                </div>
                                <p className="justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptatibus iure recusandae, repellendus quam tenetur voluptates corrupti nesciunt, suscipit perferendis quos ab nostrum tempore aut modi ad porro repudiandae eligendi.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <FsLightbox
                    toggler={openLightBox}
                    sources={recipe.foodImages}
                    slide={true}
                />
                 <Row md={ recipes.length > 0 ? 4 : 12}>
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
            </UserFrame>
        )
    }
}

export default index