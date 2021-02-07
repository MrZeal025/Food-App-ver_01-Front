import React from "react";

//icons
import { FaPlus, FaMinus } from "react-icons/fa";

const ingredientList = props => {
  const { handleIngredients } = props
  return props.ingredientDetails.map((val, idx) => {

    let amount = `amount-${idx}`
    let unit = `unit-${idx}`
    let name = `name-${idx}`
    let price = `price-${idx}`

    return (
      <div className="ingInputFormat inputSetFormat" key={idx}>
        <div className="inputSubFormat2 mr-10">
          <label>Amount</label>
          <input
            type="number"
            className="form-control required"
            placeholder="Amount"
            name="amount"
            data-id={idx}
            id={amount}
            onChange={handleIngredients}
          />
        </div>
        <div className="inputSubFormat2 mr-10">
          <label>Unit</label>
          <select 
            className="form-control" 
            name="unit" 
            id={unit} 
            data-id={idx} 
            onChange={handleIngredients}
          >
            <option value="" selected hidden>Select a unit</option>
            <option>kg/s</option>
            <option>g/s</option>
            <option>mg/s</option>
            <option>liter/s</option>
            <option>ml/s</option>
            <option>cup/s</option>
            <option>tbsp/s</option>
            <option>tsp/s</option>
          </select>
        </div>
        <div className="inputSubFormat2 mr-10">
          <label>Ingredient Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name="name"
            id={name}
            data-id={idx}
            onChange={handleIngredients}
          />
        </div>
        <div className="inputSubFormat2 mr-10">
          <label>Price (Php)</label>
          <input
            type="number"
            className=""
            placeholder="000.00"
            name="price"
            id={price}
            data-id={idx}
            onChange={handleIngredients}
          />
        </div>
        <div className="inputSubFormat2 addOrDelbuttonDiv">
          {idx === 0 ? (
            <button
              onClick={() => props.add()}
              type="button"
              className="customButtonFormat2 buttonColorBlue"
            >
              <FaPlus />
            </button>
          ) : (
            <button
              className="customButtonFormat2 buttonColorRed"
              onClick={() => props.delete(val)}
            >
              <FaMinus />
            </button>
          )}
        </div>
      </div>
    );
  });
};
export default ingredientList;
