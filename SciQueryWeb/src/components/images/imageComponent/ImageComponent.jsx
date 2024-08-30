import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import "./ImageComponent.css"; // Optional for styling

const ImageComponent = ({ image, index, onDelete, onClick }) => {
  // Extract the file from the image object
  const file = image.file;

  if (!(file instanceof Blob)) {
    console.error(`Invalid file object at index ${index}:`, file);
    return null;
  }

  const imageUrl = URL.createObjectURL(file);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <div className="image-container">
      <img
        src={imageUrl}
        alt={`image-${index}`}
        onClick={() => onClick(file)}
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
  image: PropTypes.shape({
    file: PropTypes.instanceOf(Blob).isRequired,
    isNew: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ImageComponent;
