import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import axios from 'axios';

//React Bootstrap
//react bootstrap
import {InputGroup, FormControl} from 'react-bootstrap'

//Ingredient
import Ingredient from './sub_module/Ingredient_View'
//Procedure
import Procedure from "./sub_module/Procedure_View";

//icons
import { MdCloudUpload } from "react-icons/md"



export class index extends Component {

    state = {
        tags: [],
        tagsSelected: [],
        checked: true
    }

    async componentDidMount() {
        try {
             const tag = await axios.get('/json/tags.json');
             this.setState({
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
            tagsSelected: [...tagsSelected, i]
            
        })
        if (tagsSelected.includes(i)) {
            this.setState({
                tagsSelected: tagsSelected.filter(tags => tags !== i)
            })
        }
    }

    nutState = e => {
        this.setState({
            checked: !this.state.checked
        })
    }
    

    render() {
        const { tags, tagsSelected, checked} = this.state
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="createRecipe">
                        <h5>Fill in details for your recipe!</h5>
                        {/* image upload */}
                        <div>
                            <div className="imgUploadDiv">
                                <MdCloudUpload className="uploadIcon"/>
                                No image chosen yet!
                            </div>
                            <button className="customButtonFormat customButtonsize100 buttonColorGray">
                                <p>Choose an image</p>
                            </button>
                        </div>
                        {/* Recipe Name */}
                        <div className="inputSetFormat">
                            <label>Name of Recipe</label>
                            <input type="value" placeholder="" maxLength="40"/>
                        </div>
                        {/* Servings */}
                        <div className="inputSetFormat">
                            <label>Good for how many servings?</label>
                            <div className="inputsubFormat1">
                                <input type="number" min="1" placeholder="1" maxLength="30"/> 
                                <p>Serving/s</p>
                            </div>
                        </div>
                        {/* Time */}
                        <div className="inputSetFormat">
                            <label>How much time does it take to do?</label>
                            <div className="inputSubFormat2">
                                <div className="inputSubFormat2_1 mr-10">
                                    <input type="number" min="0" placeholder="0" maxLength="5"/> 
                                    <p>Hour/s</p>
                                </div>
                                <div className="inputSubFormat2_1">
                                    <input type="number" min="1" placeholder="1" maxLength="5"/> 
                                    <p>Minute/s</p>
                                </div>
                            </div>
                        </div>
                        {/* Ingredients */}
                        <h4>Ingredients</h4>
                        <Ingredient />
                        {/* Procedure */}
                        <h4>Procedure</h4>
                        <Procedure />

                        {/* Nutrition */}
                        <div>
                            <div className="titleaAndSub">
                                <h4>Nutrition Facts</h4>
                                <p>(Per Serving)</p>
                            </div>
                            <div className="inputSetFormat2">
                                <input type="checkbox" id="checkNut" checked={checked} onChange={e => this.nutState()}/>
                                <label>Add nutrition facts to your recipe</label>
                            </div>
                            {
                                checked && <div className="nutInputFormat" >
                                <div className="nutInputsubFormat1">
                                    <input type="number" min="0" placeholder="0" maxLength="5" className="mr-10"/> 
                                    <p>Total&nbsp;Calories</p>
                                </div>
                                <div className="nutInputsubFormat1">
                                    <input type="number" min="0" placeholder="0" maxLength="5" className="mr-10"/> 
                                    <select className="form-control mr-10" name="unit">
                                        <option value=" " selected hidden>Unit</option>
                                        <option>kg/s</option>
                                        <option>g/s</option>
                                        <option>mg/s</option>
                                    </select>
                                    <p>Carbohydrates</p>
                                </div>
                                <div className="nutInputsubFormat1">
                                    <input type="number" min="0" placeholder="0" maxLength="5" className="mr-10"/> 
                                    <select className="form-control mr-10" name="unit">
                                        <option value=" " selected hidden>Unit</option>
                                        <option>kg/s</option>
                                        <option>g/s</option>
                                        <option>mg/s</option>
                                    </select>
                                    <p>Protein</p>
                                </div>
                                <div className="nutInputsubFormat1">
                                    <input type="number" min="0" placeholder="0" maxLength="5" className="mr-10"/> 
                                    <select className="form-control mr-10" name="unit">
                                        <option value=" " selected hidden>Unit</option>
                                        <option>kg/s</option>
                                        <option>g/s</option>
                                        <option>mg/s</option>
                                    </select>
                                    <p>Fat</p>
                                </div>
                            </div>
                            }
                        </div>
                        {/* Tags */}
                        <div className="tagsFiltDiv">
                            <h4>Tags</h4>
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
                        {/* Action Buttons */}
                        <div className="actionButtonDiv">
                            <button className="customButtonFormat buttonColorBlue mr-10">
                                <p>Save and Post</p>
                            </button>
                            <button className="customButtonFormat mr-10">
                                <p>Save to Drafts</p>
                            </button>
                            <button className="customButtonFormat buttonColorRed">
                                <p>Cancel</p>
                            </button>
                        </div>
                    </div>
                </div>
            </UserFrame>
        )
    }
}

export default index
