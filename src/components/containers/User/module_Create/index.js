import React, { Component } from 'react'
import UserFrame from '../UserFrame';
import axios from 'axios';
//React Bootstrap
import { Toast } from 'react-bootstrap'
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
        submitting: false,
        image: {
            name: "",
            formData: []
        },
        recipe: {
            foodName: "",
            goodFor: "",
            hours: "",
            mins: "1",
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
            nutritions: {
                caloricBreakDown: {
                    carbsLabel : "",
                    fatLabel : "",
                    proteinLabel: "",

                    percentCarbs : "",
                    percentFat : "",
                    percentProtein :""
                }
            },
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
        document.title = "Create Recipe - Bitezoo"
        try {
            const tag = await axios.get('/json/tags.json');
            const profile = await axios.get(`/api/user/profile/read/${jwtDecode(token)._id}`, config);
            this.setState({
                tags: tag.data,
                recipe: {
                    ...this.state.recipe,
                    ownerInfo: {
                        id: jwtDecode(token)._id,
                        name: jwtDecode(token).fullName,
                        profilePicture: profile.data.data.profilePicture
                    }
                }
            })
        }
        catch(error) {
         console.log(error)
        }
    }

    checkToHandleDisable = () => {
        const { recipe, image } = this.state
        if(image.formData.length === 0 || recipe.foodName === "" || recipe.goodFor === "" || recipe.mins === ""){
            return true
        }

        return false
    }

    setSelectedTags = (i, tag) => {
        const {tagsSelected} = this.state
        this.setState({
            tagsSelected: [...tagsSelected, i],
            recipe : {
                ...this.state.recipe,
                tags: [...this.state.recipe.tags, tag]
            } 
        })
        if (tagsSelected.includes(i)) {
            this.setState({
                tagsSelected: tagsSelected.filter(tags => tags !== i),
                recipe: {
                    ...this.state.recipe,
                    tags: this.state.recipe.tags.filter(tag => tag.tagName !== i)
                }
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
                formData: [...this.state.image.formData, formData]
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
    handleInstructions = index => e => {
        const instructions = [...this.state.recipe.instruction]
        instructions[index] = e.target.value
        this.setState({
            recipe: {
                ...this.state.recipe,
                instruction: instructions
            }
        })
    }

    addNewInstruction = e => {
        this.setState(prevState => ({
            recipe: {
                ...this.state.recipe,
                instruction : [...prevState.recipe.instruction, ""]
            }
        }))
    }

    deleteInstruction = index => {
        const { recipe } = this.state
        recipe.instruction.splice(index, 1)
        this.setState({
            recipe : {
                ...this.state.recipe,
                instruction: recipe.instruction
            }
        })
    }

    handleNutrition = index => e => {
        this.setState({
            recipe: {
                ...this.state.recipe,
                nutritions: {
                    ...this.state.recipe.nutritions,
                    [index]: e.target.value
                }
            }
        })
    }

    handleNutritionCalories = index => e => {
        this.setState({
            recipe: {
                ...this.state.recipe,
                nutritions: {
                    ...this.state.recipe.nutritions,
                    caloricBreakDown: {
                        ...this.state.recipe.nutritions.caloricBreakDown,
                        [index]: e.target.value
                    }
                }
            }
        })
    }

    handleCreateRecipe = async (data) => {
        const { recipe } = this.state
        const body = {
            foodName: recipe.foodName,
            goodFor: recipe.goodFor,
            readyIn: recipe.hours !== '' || recipe.mins !== '' ? recipe.hours || 0 + " hour/s " +  + recipe.mins + " minute/s" : '',
            foodImages: data.imageResponse.map(image => image.url),
            tags: recipe.tags,
            ingredients: recipe.ingredients,
            instruction: recipe.instruction,
            nutrition: {
                totalCalories: recipe.nutritions.totalCalories,
                caloricBreakDown: {
                    percentProtein: recipe.nutritions.caloricBreakDown.percentProtein + " " + recipe.nutritions.caloricBreakDown.proteinLabel, 
                    percentFat: recipe.nutritions.caloricBreakDown.percentFat + " " + recipe.nutritions.caloricBreakDown.fatLabel,
                    percentCarbs: recipe.nutritions.caloricBreakDown.percentCarbs + " " + recipe.nutritions.caloricBreakDown.carbsLabel
                }
            },
            ownerInfo: recipe.ownerInfo
        }
        try {

            const process = await axios.post('/api/recipe/create', body, config);
            this.setState({
                submitting: null,
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
                    nutritions: {
                        caloricBreakDown: {
                            carbsLabel : "",
                            fatLabel : "",
                            proteinLabel: "",

                            percentCarbs : "",
                            percentFat : "",
                            percentProtein :""
                        }
                    },
                    ownerInfo: {
                        id: "",
                        name: ""
                    }
                }
            })
            this.setShow(true, process.data.data.message)
        } 
        catch (error) {
            if(error.response.data.length > 0){
                this.setState({
                    errors: error.response.data
                })
            }
            this.setShow(true, "Recipe create failed")
        }
    }

    submitRecipe = async () => {
        const { image } = this.state
        this.setState({
            submitting: true
        })
        try {
            const processimage = await axios.post('/api/uploads/create/image/recipe', image.formData);
            this.handleCreateRecipe(processimage.data.data)
        }
        catch(error) {
            this.setShow(true, "Recipe create failed")
        }
    }
    
    processError = (errors, lookUP) => {
        if(errors.length > 0) {
            return errors.filter(d => d.path[0] === lookUP).length > 0 ? true : false
        }
        return false
    }

    discard = () => {
        this.setState({
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
                nutritions: {
                    caloricBreakDown: {
                        carbsLabel : "",
                        fatLabel : "",
                        proteinLabel: "",

                        percentCarbs : "",
                        percentFat : "",
                        percentProtein :""
                    }
                },
                ownerInfo: {
                    id: "",
                    name: ""
                }
            }
        })
    }

    render() {
        const { 
            tags, 
            tagsSelected, 
            checked, 
            recipe,
            showtoast,
            toastMessage,
            errors,
            submitting
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
                            delete={this.deleteInstruction}
                            procedure={recipe.instruction}
                            handleInstructions={this.handleInstructions}
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
                                    <input 
                                        type="number" 
                                        min="0" 
                                        placeholder="0" 
                                        maxLength="5" 
                                        className="mr-10"
                                        value={recipe.nutritions.totalCalories}
                                        onChange={this.handleNutrition("totalCalories")}
                                    /> 
                                    <p>Total&nbsp;Calories</p>
                                </div>
                                <div className="nutInputsubFormat1">
                                    <input 
                                        type="number" 
                                        min="0" 
                                        placeholder="0" 
                                        maxLength="5" 
                                        className="mr-10"
                                        value={recipe.nutritions.caloricBreakDown.percentProtein}
                                        onChange={this.handleNutritionCalories('percentProtein')}
                                    /> 
                                    <select 
                                        className="form-control mr-10" 
                                        name="unit"
                                        value={recipe.nutritions.caloricBreakDown.proteinLabel}
                                        onChange={this.handleNutritionCalories('proteinLabel')}
                                    >
                                        <option value=" " selected hidden>Unit</option>
                                        <option>kg/s</option>
                                        <option>g/s</option>
                                        <option>mg/s</option>
                                    </select>
                                    <p>Carbohydrates</p>
                                </div>
                                <div className="nutInputsubFormat1">
                                    <input 
                                        type="number" 
                                        min="0" 
                                        placeholder="0" 
                                        maxLength="5" 
                                        className="mr-10"
                                        value={recipe.nutritions.caloricBreakDown.percentCarbs}
                                        onChange={this.handleNutritionCalories('percentCarbs')}
                                    /> 
                                    <select 
                                        className="form-control mr-10" 
                                        name="unit"
                                        value={recipe.nutritions.caloricBreakDown.carbsLabel}
                                        onChange={this.handleNutritionCalories('carbsLabel')}
                                    >
                                        <option value=" " selected hidden>Unit</option>
                                        <option>kg/s</option>
                                        <option>g/s</option>
                                        <option>mg/s</option>
                                    </select>
                                    <p>Protein</p>
                                </div>
                                <div className="nutInputsubFormat1">
                                    <input 
                                        type="number" 
                                        min="0" 
                                        placeholder="0" 
                                        maxLength="5" 
                                        className="mr-10"
                                        value={recipe.nutritions.caloricBreakDown.percentFat}
                                        onChange={this.handleNutritionCalories('percentFat')}
                                    /> 
                                    <select 
                                        className="form-control mr-10" 
                                        name="unit"
                                        value={recipe.nutritions.caloricBreakDown.fatLabel}
                                        onChange={this.handleNutritionCalories('fatLabel')}
                                    >
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
                                            className={tagsSelected.includes(tag.tagName)? "tag customTag activeTag" : "tag customTag"}
                                            style={{color:tag.color, border: `2px solid ${tag.color}`}}
                                            onClick={() => {this.setSelectedTags(tag.tagName, tag)}}
                                            >
                                                {tag.tagName}
                                        </button> 
                                    )
                                })
                            }
                        </div>
                        <hr/>
                        {/* Action Buttons */}
                        <div className="actionButtonDiv">
                            <button 
                                className="customButtonFormat buttonColorBlue mr-10"
                                onClick={this.checkToHandleDisable() ? () => {} : () => this.submitRecipe()}
                                disabled={this.checkToHandleDisable()}
                            >
                                <p>
                                    {
                                        submitting ? "Submitting Recipe" : submitting === null ? "Submitted" : "Save and Post"
                                    }
                                </p>
                            </button>
                            <button className="customButtonFormat buttonColorRed" onClick={() => this.discard()}>
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
