import React, { Component } from 'react'
import IngredientList from './Ingredient_Create'

export class Ingredient_View extends Component {

  state = {
    ingredientDetails: [
      {
        index: Math.floor(Math.random() * Math.floor(900)),
        amount: "",
        unit: "",
        name: "",
        price: ""
      }
    ]
  }

  handleChange = e => {
    if ( ["amount", "unit", "name", "price"].includes(e.target.name)) {
      let ingredientDetails = [...this.state.bookDetails];
      ingredientDetails[e.target.dataset.id][e.target.name] = e.target.value;
    }
    else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  addNewRow = e => {
    this.setState(prevState => ({
      ingredientDetails: [
        ...prevState.ingredientDetails,
        {
          index:  Math.floor(Math.random() * Math.floor(900)),
          amount: "",
          unit: "",
          name: "",
          price: ""
        }
      ]
    }))
  }

  clickOnDelete(record) {
    this.setState({
      ingredientDetails: this.state.ingredientDetails.filter(r => r !== record)
    });
  }

  render() {
    let {ingredientDetails} = this.state
    return (
      <div>
        <IngredientList 
          add={this.addNewRow}
          delete={this.clickOnDelete.bind(this)}
          ingredientDetails={ingredientDetails}
        />
      </div>
    )
  }
}

export default Ingredient_View
