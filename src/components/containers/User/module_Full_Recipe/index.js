import React, { Component } from 'react'
import UserFrame from '../UserFrame'
import SearchFilter from '../module_Search'
import axios from 'axios'

//react icons
import {MdStar} from 'react-icons/md'

export class index extends Component {
    render() {
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <SearchFilter />
                    <div className="middle">
                        <div className="white-bg mb-20">
                            <h4 className="recipeName">Recipe Name Sample</h4>
                            {/* userName */}
                            <div className="flex-row mb-10">
                                <div className="imgTempo"></div>
                                <div className="userName"><h6>By: Juan Dela Cruz</h6></div>
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
                                    src="https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                                    alt="RecipeImage"
                                    className="recImg"
                                />
                                <div className="recDetails">
                                    <div className="flex-row mb-10">
                                        <h6 className="label mr-10">Duration:</h6>
                                        <h6>45 mins</h6>
                                    </div>
                                    <div className="flex-row mb-10">
                                        <h6 className="label mr-10">Servings:</h6>
                                        <h6>3</h6>
                                    </div>
                                    <div className="mb-10">
                                        <h6 className="label mb-10">Nutrition Facts</h6>
                                        <div className="flex-row mb_5">
                                            <h6 className="nutCont mr-10">650</h6>
                                            <h6 className="label">Total Calories</h6>
                                        </div>
                                        <div className="flex-row mb_5">
                                            <h6 className="nutCont mr-10">125 g</h6>
                                            <h6 className="label">Carbohydrates</h6>
                                        </div>
                                        <div className="flex-row mb_5">
                                            <h6 className="nutCont mr-10">40.5 g</h6>
                                            <h6 className="label">Protein</h6>
                                        </div>
                                        <div className="flex-row mb_5">
                                            <h6 className="nutCont mr-10">30.8 g</h6>
                                            <h6 className="label">Fat</h6>
                                        </div>
                                    </div>
                                    {/* tags */}
                                    <div>
                                        <h6 className="label mb-10">Tags</h6>
                                        <div>
                                            <button className="tag customTag"><p>Breakfast</p></button>
                                            <button className="tag customTag"><p>Healthy</p></button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* Ingredients */}
                            <div className="mb-10">
                                <h5 className="mb-10 ingTitle">Ingredients</h5>
                                <ul>
                                    <li>1 Avocado</li>
                                    <li>2 Eggs</li>
                                    <li>6 pcs Bread</li>
                                    <li>1 tbsp Olive Oil</li>
                                    <li>1 tsp Chilli Flakes</li>
                                </ul>
                            </div>
                            {/* Procedure */}
                            <div className="mb-10">
                                <h5 className="mb-10 procTitle">Procedure</h5>
                                <ol className="justify">
                                    <li>Slice or mush the avocado.</li>
                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit assumenda ipsum vero deleniti voluptatem facere itaque totam.</li>
                                    <li>Fugit pariatur quam impedit est quae repellendus cupiditate, nemo error minima illum blanditiis consequatur.</li>
                                </ol>
                            </div>
                            {/* Action Button */}
                            <div>
                                <button className="customButtonFormat buttonColorBlue mr-10"><p>Add to Pantry</p></button>
                                {/* NOTE: ganito itsura kapag na-add na sa pantry, then kapag niremove yung recipe sa pantry... babalik sa add to pantry lang */}
                                <button className="customButtonFormat buttonColorBlue mr-10"><p>Add Ingredients to Grocery List</p></button>
                                <button className="customButtonFormat buttonColorRed"><p>Remove from Pantry</p></button>
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
                                <div className="inputSetFormat no-mb">
                                    <input type="text" placeholder="Add a comment" className="mb-10"/>
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
            </UserFrame>
        )
    }
}

export default index