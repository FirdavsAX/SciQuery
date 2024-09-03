import React from "react";
import PropTypes from "prop-types";
import "./ImageDisplayComponent.css"; // Optional for styling

const ImageDisplayComponent = ({ index, image, onClick, onDelete }) => {
  return (
    <div className="image-container">
      <img
        src={image.src ? image.src : image}
        onClick={() => onClick(image)}
        className="image"
      />
       (
        <button className="btn-delete" onClick={() => onDelete(index)}>
          X
        </button>
      )
    </div>
  );
};

export default ImageDisplayComponent;
