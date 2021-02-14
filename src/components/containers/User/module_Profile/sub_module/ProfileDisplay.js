import React, { Component } from 'react'
// utilities
import jwt_decode from 'jwt-decode';
import DPUploadModal from './DPUploadModal';
import CPUploadModal from './CPUploadModal';
import axios from 'axios';
//react bootstrap
import { Card, Button, Row, Col } from 'react-bootstrap';
//react icons
import { MdStar } from 'react-icons/md';
import { FaBreadSlice } from 'react-icons/fa';
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
        recipes: []
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
    
    render() {
        const { fullname, recipes } = this.state
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
                                                <div className="d-flex">
                                                    <Button className="customButton mr-1" variant="primary"><Link to={`/recipe/view/${recipe._id}`}>See Full Recipe</Link></Button>
                                                    <Button className="customButton custom-secondary">Edit Post</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            : 
                            <div className="empty-center-display">
                                <FaBreadSlice/>
                                <p>No recipes at the moment</p>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default ProfileDisplay
