import React from "react";

//icons
import { FaPlus, FaMinus } from "react-icons/fa";



const procedureList = props => {
  return props.procedure.map((val, idx) => {
    return (
      <div className="procInputFormat " key={idx}>
        <p id={idx} className="mr-10">{idx + 1}.</p>
          <input
            type="text"
            className="required mr-10"
            name="method"
          />
        <div className="addOrDelbuttonDiv">
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
