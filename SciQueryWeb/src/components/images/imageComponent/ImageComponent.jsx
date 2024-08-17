import React from 'react';
import PropTypes from 'prop-types';
import "./ImageComponent.css"; // Optional for styling

const ImageComponent = ({ image, index, onDelete, onClick }) => {
  return (
    <div className="image-container">
      <img
        src={URL.createObjectURL(image)}
        alt={`image-${index}`}
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

ImageComponent.propTypes = {
  image: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ImageComponent;
