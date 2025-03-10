import React from "react";
import "./ResetButton.css";

const ResetButton = ({ resetGrid }) => {
    
    return (
      <div className="reset-button-container">
      <button className="reset-button" onClick={resetGrid}>Reset</button>
      </div>
    );
};

export default ResetButton;
