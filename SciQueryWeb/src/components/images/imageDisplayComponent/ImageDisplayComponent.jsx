import React from 'react';
import PropTypes from 'prop-types';
import "./ImageDisplayComponent.css"; // Optional for styling

const ImageDisplayComponent = ({ index,image, onClick,onDelete }) => {
  return (
    <div className="image-container">
      <img
        src={(image)}
        onClick={() => onClick(image)}
        className="image"
      />
      <button
        className="btn-delete"
        onClick={() => onDelete(index)}
      >
        X
      </button>
    </div>
  );
};

ImageDisplayComponent.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ImageDisplayComponent;
