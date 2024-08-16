import React, { useState } from "react";
import "./ImageInput.css";

const ImageInput = ({ images, setImages }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);
    // Check if the total number of images won't exceed 6
    if (images.length + newImages.length <= 5) {
      setImages((prevImages) => [...prevImages, ...newImages]);
    } else {
      alert("Image limit reached!")
    }
  };
  
  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="card my-4" style={{ height :"auto",overflowY: "auto" }}>
      <div className="d-flex justify-content-center align-items-center gap-5">
        {images && images.map((img, index) => (
          <div key={index}>
            <hr />
            <img
              height={100}
              src={URL.createObjectURL(img)}
              alt={`images-${index}`}
              onClick={() => handleImageClick(img)}
              style={{ cursor: "pointer" }}
            />
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteImage(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="image-overlay">
          <div className="image-modal">
            <div className="modal-content">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="selected-image"
              />
              <button className="btn btn-primary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      <hr />
      <label className="custom-file-upload d-flex justify-content-center">
        <input type="file" id="file" multiple onChange={handleImageUpload} />
        Upload Image
      </label>
    </div>
  );
};

export default ImageInput;
