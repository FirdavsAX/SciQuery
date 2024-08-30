import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./ImageInput.css";
import ImageModal from "../../images/ImageModal";
import ImageComponent from "../../images/imageComponent/ImageComponent";
import ImageContainer from "../../images/imageContainer/ImageContainer";

const ImageInput = ({ images, setImages,oldImages }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files).map(file => ({
      file,
      isNew: true,
    }));

    if (images.length + newImages.length <= 5) {
      setImages((prevImages) => [...prevImages, ...newImages]);
    } else {
      alert("Image limit reached!");
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="card my-4" style={{ height: "auto", overflowY: "auto" }}>
      <ImageContainer images={images} onDeleteImage={handleDeleteImage}/>
      <br />
      <br />
      <hr />
      <label className="custom-file-upload d-flex justify-content-center">
        <input type="file" id="file" multiple onChange={handleImageUpload} />
        Rasm yuklash
      </label>
    </div>
  );
};

ImageInput.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired
};

export default ImageInput;
