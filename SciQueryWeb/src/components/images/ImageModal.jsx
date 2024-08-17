import React from "react";
import "./ImageModal.css"; // Optional for styling

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {typeof image === 'string' ? (
          <img src={image} alt="Selected" className="modal-image" />
        ) : (
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            className="modal-image"
          />
        )}
        <button onClick={onClose} className="btn-close">
          X
        </button>
      </div>
    </div>
  );
};



export default ImageModal;
