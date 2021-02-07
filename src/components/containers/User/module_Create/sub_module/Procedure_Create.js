import React from "react";
//icons
import { FaPlus, FaMinus } from "react-icons/fa";

const procedureList = props => {
  
  return props.procedure.map((val, idx) => {
    
    return (
      <div className="procInputFormat " key={idx}>
        <p id={idx} className="align-center-none">{idx + 1}.</p>
          <textarea
            rows="4"
            type="text"
            className="input-type-area"
            placeholder={`Place instruction number ${idx + 1}`}
            name="method"
          />
        <div className="addOrDelbuttonDiv align-item-end-unset">
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
