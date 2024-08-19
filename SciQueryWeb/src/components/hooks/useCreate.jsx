import { useState } from "react";
import { postData } from "../../services/ApiService";

export const useCreate = (url) => {
  const [loading, setLoading] = useState(false);
  

  const create = async (data) => {
    setLoading(true);
    try {
      const result = await postData(url, data);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error("Error in create:", error);
      throw error;
    }
  };

  const uploadImage = async (images, uploadUrl) => {
    setLoading(true);
    try {
      const uploadPromises = images.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);

        const result = await postData(uploadUrl, formData);
        return result;
      });

      // Wait for all images to be uploaded
      const results = await Promise.all(uploadPromises);
      setLoading(false);
      const imagePaths = results.map((response) => response);
      
      return imagePaths;

    } catch (error) {
      setLoading(false);
      console.error("There was an error uploading the images!", error);
      throw error;
    }
  };

  return { uploadImage, create, loading };
};
