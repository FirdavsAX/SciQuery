import axios from "axios";
import { TOKEN } from "../config/Constants";

export const postData = async (url, object) => {
  try {
    const config = {
      headers: {
        Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(url, object, config);
    return response.data; // Return the response data
  } 
  catch (error) {
    console.error("Error creating the resource:", error);
    throw error; // Rethrow the error so it can be handled by the calling code
  }
};
