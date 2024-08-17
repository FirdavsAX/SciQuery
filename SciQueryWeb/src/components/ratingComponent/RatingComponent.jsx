import React from 'react';
import { FaArrowUp, FaArrowDown, FaTrash } from 'react-icons/fa';
import './RatingComponent.css'; // Import your CSS file

const RatingComponent = ({votes = 0}) => {
  const votesCount = votes; 
    return (
    <div className="icon-container">
      <button className="icon-button" aria-label="Move Up">
        <FaArrowUp />
      </button>
        <h2>{votesCount}</h2>
      <button className="icon-button" aria-label="Move Down">
        <FaArrowDown />
      </button>
      <button className="icon-button" aria-label="Delete">
        <FaTrash />
      </button>
    </div>
  );
};

export default RatingComponent;
