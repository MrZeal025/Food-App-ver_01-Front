import React, { Component } from 'react'
import axios from 'axios'
//react icons
import { Navbar } from 'react-bootstrap'
import { MdStar } from 'react-icons/md'
import { Link } from 'react-router-dom';
import FsLightbox from 'fslightbox-react';
import Moment from "react-moment";

const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};
const logoLight = process.env.PUBLIC_URL + '/assets/logowhite@2x.png';

export class index extends Component {

    state = {
         reviews: [],
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
    }

    async componentDidMount() {
        
        try {
            const recipe = await axios.get(`/api/recipe/public/${this.props.match.params.id}`)
            const reviews = await axios.get('/api/review/all-reviews');
            document.title = `${recipe.data.data.recipe.foodName} - Bitezoo`
            this.setState({
                recipe: recipe.data.data.recipe,
                reviews: reviews.data.data
            })
        }
        catch(error) {
            console.log(error.response)
        }
    }

    openLightBox = () => {
        this.setState({
            openLightBox: !this.state.openLightBox
        })
    }

    render() {
        const { recipe, openLightBox, reviews } = this.state
    
        return (
            <>
                <Navbar className="landNav" sticky="top" variant="dark">
                    <Navbar.Brand href="/" className="BZlogo">
                        <img
                            src={logoLight}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt=""
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="/" className="brandN">Bitezoo</Navbar.Brand>
                    <div className="signLinks">
                        <Link to="/sign-in" className="sign-in-link">Sign In</Link>
                        <Link to="/sign-up" className="sign-up-link">Sign Up</Link>
                    </div>
                </Navbar>
                <div className="mainHomeDiv">
                    <div className="fullRecDiv mb-10">
                        <div className="white-bg mb-4 mt-4">
                            <h4 className="recipeName mb-10">{recipe.foodName}</h4>
                            {/* userName */}
                            <div className="flex-row mb-10">
                                <img className="small-avatar mr-10" src={recipe.ownerInfo.profilePicture} alt="DP"/>
                                <div className="userName"><h6>By: {recipe.ownerInfo.name}</h6></div>
                            </div>
                            {/* rating */}
                            <div className="rating fullv mb-10 flex-row">
                                <MdStar 
                                className={
                                    Math.round(
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) 
                                        / 
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).length
                                        ) >= 1 
                                    ? "star true" 
                                    : "star false"
                                }
                            />
                            <MdStar 
                                className={
                                    Math.round(
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) 
                                        / 
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).length
                                        ) >= 2 
                                    ? "star true" 
                                    : "star false"
                                }
                            />
                            <MdStar 
                                className={
                                    Math.round(
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) 
                                        / 
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).length
                                        ) >= 3 
                                    ? "star true" 
                                    : "star false"
                                }
                            />
                            <MdStar 
                                className={
                                    Math.round(
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) 
                                        / 
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).length
                                        ) >= 4 
                                    ? "star true" 
                                    : "star false"
                                }
                            />
                            <MdStar 
                                className={
                                    Math.round(
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).reduce((a, b) => a + b, 0) 
                                        / 
                                        reviews.filter(review => review.recipeId === recipe._id).map(data => { return data.rating }).length
                                        ) >= 5 
                                    ? "star true" 
                                    : "star false"
                                }
                            />
                            <p>({ reviews.filter(review => review.recipeId === recipe._id).length })</p>
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
                                        <h6 className="label mb-10">Nutrition&nbsp;Facts</h6>
                                            <div className="flex-row mb_5">
                                                <h6 className="nutContLabel mr-10">Total&nbsp;Calories</h6>
                                                <h6 className="nutCont">{recipe.nutrition.totalCalories === '' ? "None" : recipe.nutrition.totalCalories }</h6>
                                            </div>
                                            <div className="flex-row mb_5">
                                                <h6 className="nutContLabel mr-10">Carbohydrates</h6>
                                                <h6 className="nutCont">{recipe.nutrition.caloricBreakDown.percentCarbs}</h6>
                                            </div>
                                            <div className="flex-row mb_5">
                                            <h6 className="nutContLabel mr-10">Protein</h6>
                                            <h6 className="nutCont">{recipe.nutrition.caloricBreakDown.percentProtein}</h6>
                                            </div>
                                            <div className="flex-row mb_5">
                                                <h6 className="nutContLabel mr-10">Fat</h6>
                                                <h6 className="nutCont">{recipe.nutrition.caloricBreakDown.percentFat}</h6>
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
                                <div className="ingList">
                                <ul>
                                    {
                                        recipe.ingredients.map((ingredient, i) => {
                                            return <li key={i}>{ingredient.amount + " " + ingredient.unit + " " + ingredient.name}</li>
                                        })
                                    }
                                </ul>
                                </div>
                            </div>
                            {/* Procedure */}
                            <div className="mb-10">
                                <h5 className="mb-10 procTitle">Procedure</h5>
                                <div className="ingList">
                                    <ol className="justify">
                                        {
                                            recipe.instruction.map((intruction, i) => {
                                                return <li className="mt-2" key={i}>{intruction}</li>
                                            })
                                        }
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="white-bg mb-10">
                            <h5 className="rateTitle mb-10">Ratings and Comments</h5>
                            {/* Rating Post Sample */}
                            {
                                reviews.reverse().map((review, i) => {
                                    return (
                                        <div key={i} className="flex-col mb-20">
                                            <div className="flex-row mb-10">
                                                <img 
                                                    className="small-avatar mr-10" 
                                                    src={review.ownerInfo.profilePicture} 
                                                    alt="DP" 
                                                />
                                                <div className="userName">
                                                    <h6 className="mr-10 rateUserName">{review.ownerInfo.fullName}</h6>
                                                    <Moment format="ddd YYYY/MM/DD h:mm A" className="timeStamp">{review.dateStamp}</Moment>
                                                </div>
                                                
                                            </div>
                                            {/* Stars */}
                                            <div className="rating fullv mb-10">
                                                <MdStar className={review.rating >= 1 ? "star true" : "star false" }  />
                                                <MdStar className={review.rating >= 2 ? "star true" : "star false" }  />
                                                <MdStar className={review.rating >= 3 ? "star true" : "star false" }  />
                                                <MdStar className={review.rating >= 4 ? "star true" : "star false" }  />
                                                <MdStar className={review.rating >= 5 ? "star true" : "star false" }  />
                                            </div>
                                            <p className="justify">{review.comment}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <FsLightbox
                    toggler={openLightBox}
                    sources={recipe.foodImages}
                    slide={true}
                />
            </>
        )
    }
}

export default index