import React from 'react';
import PropTypes from 'prop-types';
import "./ImageDisplayComponent.css"; // Optional for styling

const ImageDisplayComponent = ({ image, onClick }) => {
  return (
    <div className="image-container">
      <img
        src={(image)}
        onClick={() => onClick(image)}
        className="image"
      />
    </div>
  );
};

ImageDisplayComponent.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ImageDisplayComponent;
