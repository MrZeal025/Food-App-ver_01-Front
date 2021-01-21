import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import axios from 'axios';

//icons
import { MdCloudUpload } from "react-icons/md";



export class index extends Component {
    render() {
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
                                Choose an image
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
                        <div className="inputSetFormat">
                            <label>How much time does it take to do?</label>
                            <div className="inputSubFormat2">
                                <div className="inputSubFormat2_1">
                                    <input type="number" min="0" placeholder="0" maxLength="5"/> 
                                    <p>Hour/s</p>
                                </div>
                                <div className="inputSubFormat2_1">
                                    <input type="number" min="1" placeholder="1" maxLength="5"/> 
                                    <p>Minute/s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UserFrame>
        )
    }
}

export default index
