import { useState } from "react";
import { postData } from "../../services/ApiService"; // Ensure this is correctly imported
import axios from "axios";

export const useCreate = (url) => {
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setLoading(true);
    try {
      const result = await postData(url, data);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const uploadImage = async (images, url) => {
    setLoading(true);

    try {
      const uploadPromises = images.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);

        const result = await postData(url, formData);
        return result;
      });

      // Wait for all images to be uploaded
      const results = await Promise.all(uploadPromises);
      setLoading(false);
      const imagePaths = results.map((response) => response.data);
      
      return imagePaths;

    } catch (error) {
      setLoading(false);
      console.error("There was an error uploading the images!", error);
      throw error;
    }
  };

  return { uploadImage, create, loading };
};
