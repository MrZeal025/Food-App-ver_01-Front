import React, { Component } from 'react'
// utilities
import jwt_decode from 'jwt-decode';
import DPUploadModal from './DPUploadModal';
import CPUploadModal from './CPUploadModal';
import axios from 'axios';
//react bootstrap
import { Card, Button } from 'react-bootstrap';
import { Toast } from 'react-bootstrap'
//react icons
import { MdStar } from 'react-icons/md';
import { FaBreadSlice } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};

export class ProfileDisplay extends Component {

    state = {
        fullname: '',
        recipes: [],
        showtoast: false,
        toastMessage: ""
    }

    async componentDidMount() {
        document.title = "My Profile - Bitezoo"
        if(token) {
            const decode = jwt_decode(token);
            this.setState({
                fullname: decode.fullName,
            })
        }
        try{
            const recipe = await axios.get(`/api/recipe/my/${this.props.id}`, config);
            this.setState({
                recipes: recipe.data.data.recipe,
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    remove = async (_id) => {
        const { recipes } = this.state
        try {
            await axios.delete(`/api/recipe/delete/${_id}`, config);
            const newRecipes =  recipes.filter(recipe => recipe._id !== _id);
            this.setState({
                recipes: newRecipes
            })
            this.setShow(true, 'Post has been deleted');
        } catch (error) {
            this.setShow(true, 'Failed to delete post');
        }
    }

    setShow = (condition, message) => {
        this.setState({
            showtoast: condition,
            toastMessage: message ? message : "Something went wrong"
        })
    }
    
    render() {
        const { fullname, recipes, showtoast, toastMessage } = this.state
        return (
            <>
                <div className="profile-control">
                    <div className="display-holder">
                        <CPUploadModal />
                        <div className="profile-pic-container">
                            <DPUploadModal/>
                        </div>
                    </div>
                    <h2 className="profileName">{fullname !== '' ? fullname : ''}</h2>
                </div>
                <div className="center-container">
                    <h3 align="left"><b>My Posts</b></h3>
                    <div className="mt-3 mb-3">
                        {
                            recipes.length > 0 
                            ? 
                                recipes.map((recipe, i) => {
                                    return(
                                        <Card className="mt-3" key={i}>
                                            <Card.Img variant="top" src={recipe.foodImages[0]} />
                                            <Card.Body className="customCardBody unset-align-center">
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
                                                    <a href={`/recipe/view/${recipe._id}`}><Button className="customButton" variant="primary">See Full Recipe</Button></a>
                                                    <Button variant="danger" className="mt-2" onClick={() => this.remove(recipe._id)}>Remove Post</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            : 
                            <div className="empty-center-display-profile">
                                <FaBreadSlice/>
                                <p>You have no post at the moment</p>
                                <Link to="/recipe/create"><Button className="mt-4">Add a post</Button></Link>
                            </div>
                        }
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
            </>
        )
    }
}

export default ProfileDisplay
