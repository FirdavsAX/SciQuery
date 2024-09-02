import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageModal from "../../images/ImageModal";
import ImageComponent from "../../images/imageComponent/ImageComponent";
import ImageDisplayComponent from "../imageDisplayComponent/ImageDisplayComponent";
import "./ImageContainer.css"; // Assuming you have styles for the container

const ImageContainer = ({ images, onDeleteImage}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Determine if all items in images are strings
  const handleCheckImage= (img) =>{
    return typeof img === "string";
  } 

  return (
    <div className="image-container d-flex flex-column align-items-center">
      <div className="d-flex flex-wrap gap-5">
        {images &&
          images.map((img, index) =>
            handleCheckImage(img) ? (
              <ImageDisplayComponent
                key={index}
                index={index}
                image={img}
                onDelete={() => onDeleteImage(index)}
                onClick={() => handleImageClick(img)}
                alt={`Image ${index}`}
                className="img-fluid"
              />
            ) : (
              <ImageComponent
                key={index}
                image={img}
                index={index}
                onDelete={() => onDeleteImage(index)}
                onClick={() => handleImageClick(img)}
              />
            )
          )}

      </div>
      <ImageModal image={selectedImage} onClose={closeModal} />
    </div>
  );
};

ImageContainer.propTypes = {
  images: PropTypes.array.isRequired,
  onDeleteImage: PropTypes.func,
};

export default ImageContainer;
