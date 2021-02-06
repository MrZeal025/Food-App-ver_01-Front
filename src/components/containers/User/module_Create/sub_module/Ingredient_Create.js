import React from "react";

//icons
import { FaPlus, FaMinus } from "react-icons/fa";


const ingredientList = props => {
  return props.ingredientDetails.map((val, idx) => {
    let amount = `amount-${idx}`,
        unit = `unit-${idx}`,
        ingredientName = `ingredientName-${idx}`,
        price = `price-${idx}`;
    return (
      <div className="ingInputFormat inputSetFormat" key={val.index}>
        <div className="inputSubFormat2 mr-10">
          <label>Amount</label>
          <input
            type="number"
            className="form-control required"
            placeholder="Amount"
            name="amount"
            data-id={idx}
            id={amount}
          />
        </div>
        <div className="inputSubFormat2 mr-10">
          <label>Unit</label>
          <select className="form-control" name="type" id={unit} data-id={idx}>
            <option value=" " selected hidden>Select a unit</option>
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
            name="ingredientName"
            id={ingredientName}
            data-id={idx}
          />
        </div>
        <div className="inputSubFormat2 mr-10">
          <label>Price</label>
          <input
            type="number"
            className=""
            placeholder="000.00"
            name="price"
            id={price}
            data-id={idx}
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
