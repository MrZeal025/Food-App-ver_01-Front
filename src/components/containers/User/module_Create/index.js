import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import axios from 'axios';
//React Bootstrap
import { InputGroup, FormControl, Toast } from 'react-bootstrap'
// components
import Ingredient from './sub_module/Ingredient_Create'
import Procedure from "./sub_module/Procedure_Create";
import ImageUpload from '../../../common/ImageUpload';
import RenderError from '../../../common/Renderer/RenderErrors';
// utilities and icons
import jwtDecode from 'jwt-decode';
import { FaExclamationTriangle } from 'react-icons/fa';

const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};

export class index extends Component {

    state = {
        tags: [],
        tagsSelected: [],
        checked: true,
        image: {
            name: "",
            formData: []
        },
        recipe: {
            foodName: "",
            goodFor: "",
            hours: "",
            mins: "",
            readyIn: "",
            foodImages: "",
            tags: [],
            ingredients: [
                {
                    amount: "",
                    unit: "",
                    name: "",
                    price: ""
                }
            ],
            instruction: [""],
            nutritions: {},
            ownerInfo: {
                id: "",
                name: ""
            }
        },
        errors: {},
        showtoast: false,
        toastMessage: ""
    }

    async componentDidMount() {
        try {
            const tag = await axios.get('/json/tags.json');
            this.setState({
                tags: tag.data,
                recipe: {
                    ...this.state.recipe,
                    ownerInfo: {
                        id: jwtDecode(token)._id,
                        name: jwtDecode(token).fullName
                    }
                }
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

    setShow = (condition, message) => {
        this.setState({
            showtoast: condition,
            toastMessage: message ? message : "Something went wrong"
        })
    }
    
    getImageFromUploads = (data, formData) => {
        const processName = []
        // file name processing
        for(var i in data) {
            const extn = data[i].split('.').pop()
            const processFile = "xs.prcs." + data[i].split('.').join('_') + "." + extn 
            processName.push(processFile)   
        }
        this.setState({
            ...this.state,
            image: {
                name: processName,
                formData: formData
            },
            recipe : {
                ...this.state.recipe,
                foodImages: processName
            }
        })
    }

    handleRecipeChange = input => e => {
        const { errors } = this.state
        this.setState({
            recipe: {
                ...this.state.recipe,
                [input]: e.target.value
            },
            errors:  errors.length > 0 ? errors.filter(error => error.path[0] !== (input === "mins" || input === "hours" ? "readyIn" : input)) : ''
        })
    }

    // Ingredient Section
    handleIngredients = e => {
        if ( ["amount", "unit", "name", "price"].includes(e.target.name)) {
            let ingredients = [...this.state.recipe.ingredients];
            ingredients[e.target.dataset.id][e.target.name] = e.target.value;
        }
        else {
            this.setState({ 
                recipe: {
                    ...this.state.recipe,
                    [e.target.name]: e.target.value 
                }
            });
        }
    }

    addNewRow = e => {
        this.setState(prevState => ({
            recipe: {
                ...this.state.recipe,
                ingredients: [
                    ...prevState.recipe.ingredients,
                    {
                        amount: "",
                        unit: "",
                        name: "",
                        price: ""
                    }
                ]
            }
        }))
    }

    clickOnDelete = (record) =>  {
        const { recipe } = this.state
        this.setState({
            recipe: {
                ...recipe,
                ingredients: recipe.ingredients.filter(r => r !== record)
            }
        });
        console.log(this.state.recipe.ingredients.filter(r => r !== record))
    }

    // instructions

    addNewInstruction = e => {
        this.setState(prevState => ({
            recipe: {
                ...this.state.recipe,
                instruction : [...prevState.recipe.instruction, ""]
            }
        }))
    }

    submitRecipe = async () => {
        const { recipe } = this.state
        const body = {
            foodName: recipe.foodName,
            goodFor: recipe.goodFor,
            readyIn: recipe.hours !== '' || recipe.mins !== '' ? recipe.hours + " hour/s " +  + recipe.mins + " minute/s" : '',
            foodImages: recipe.foodImages,
            tags: recipe.tags,
            ingredients: recipe.ingredients,
            instruction: recipe.instruction,
            nutrition: recipe.nutrition,
            ownerInfo: recipe.ownerInfo
        }
        try {
            const process = await axios.post('/api/recipe/create', body, config);
            console.log(process.data)
        }
        catch(error) {
            if(error.response.data.length > 0){
                this.setState({
                    errors: error.response.data
                })
            }
            this.setShow(true, "Recipe create failed")
        }
    }
    
    processError = (errors, lookUP) => {
        if(errors.length > 0) {
            return errors.filter(d => d.path[0] === lookUP).length > 0 ? true : false
        }
        return false
    }

    render() {
        const { 
            tags, 
            tagsSelected, 
            checked, 
            recipe,
            showtoast,
            toastMessage,
            errors
        } = this.state
        
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="createRecipe">
                        <h5>Fill in details for your recipe!</h5>
                        {/* image upload */}
                        <ImageUpload getImageFromUploads={this.getImageFromUploads}/>
                        <p className="err">{this.processError(errors, 'foodImages') ? "Image/s is required" : ''}</p>
                        {/* Recipe Name */}
                        <div className="inputSetFormat">
                            <label>Name of Recipe</label>
                            <input 
                                type="text" 
                                maxLength="40" 
                                value={recipe.foodName} 
                                className={this.processError(errors, 'foodName') ? "err" : ''}
                                onChange={this.handleRecipeChange('foodName')}
                                placeholder="Aa"
                            />
                            <RenderError 
                                data={errors.length > 0 ? errors.filter(d => d.path[0] === "foodName") : ''}
                            />
                        </div>
                        {/* Servings */}
                        <div className="inputSetFormat">
                            <label>Good for how many servings?</label>
                            <div className="inputsubFormat1">
                                <input 
                                    type="number" 
                                    min="1"
                                    placeholder="1" 
                                    maxLength="30"
                                    value={recipe.goodFor} 
                                    className={this.processError(errors, 'goodFor') ? "err" : ''}
                                    onChange={this.handleRecipeChange('goodFor')}
                                /> 
                                <p>Serving/s</p>
                            </div>
                        </div>
                        {/* Time */}
                        <div className="inputSetFormat">
                            <label>How much time does it take to do?</label>
                            <div className="inputSubFormat2">
                                <div className="inputSubFormat2_1 mr-10">
                                    <input 
                                        type="number" 
                                        min="0" 
                                        placeholder="0" 
                                        maxLength="5"
                                        value={recipe.hours} 
                                        className={this.processError(errors, 'readyIn') ? "err" : ''}
                                        onChange={this.handleRecipeChange('hours')}
                                    /> 
                                    <p>Hour/s</p>
                                </div>
                                <div className="inputSubFormat2_1">
                                    <input 
                                        type="number" 
                                        min="1" 
                                        placeholder="1" 
                                        maxLength="5"
                                        value={recipe.mins} 
                                        className={this.processError(errors, 'readyIn') ? "err" : ''}
                                        onChange={this.handleRecipeChange('mins')}
                                    /> 
                                    <p>Minute/s</p>
                                </div>
                            </div>
                        </div>
                        {/* Ingredients */}
                        <h4>Ingredients</h4>
                        <Ingredient 
                            add={this.addNewRow}
                            delete={this.clickOnDelete}
                            ingredientDetails={recipe.ingredients}
                            handleIngredients={this.handleIngredients}
                        />
                        {/* Procedure */}
                        <hr/>
                        <h4>Procedure</h4>
                        <Procedure 
                            add={this.addNewInstruction}
                            delete={this.clickOnDelete}
                            procedure={recipe.instruction}
                        />
                        <hr/>
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
                        <hr/>
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
                            <button 
                                className="customButtonFormat buttonColorBlue mr-10"
                                onClick={() => this.submitRecipe()}
                            >
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
                <Toast onClose={() => this.setShow(false)} show={showtoast} delay={4000} autohide>
                    <Toast.Header>
                        <FaExclamationTriangle/>
                        <strong className="mr-auto ml-2"> Notice!</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}!</Toast.Body>
                </Toast>
            </UserFrame>
        )
    }
}

export default index
