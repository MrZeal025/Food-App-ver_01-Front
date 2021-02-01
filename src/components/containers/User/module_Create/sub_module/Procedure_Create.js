import React from "react";

//icons
import { FaPlus, FaMinus } from "react-icons/fa";



const procedureList = props => {
  return props.procedure.map((val, idx) => {
    return (
      <div className="inputSetFormat procInputFormat" key={idx}>
        <p id={idx} className="inputsubFormat1">{idx + 1}</p>
        <div className="inputsubFormat1">
          <input
            type="text"
            className="form-control required inpSpace"
            name="method"
          />
        </div>
        <div className="inputsubFormat1 addOrDelbuttonDiv">
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
              onClick={() => props.delete(val.id)}
            >
              <FaMinus />
            </button>
          )}
        </div>
      </div>
    );
  });
};
export default procedureList;
