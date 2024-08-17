import axios from "axios";
import { API_BASE_URL, TOKEN } from "../config/Constants";

export const postData = async (url, data) => {
  url = API_BASE_URL + url;
  try {
    const response = await axios.post(url, data, {
      headers: {
        // Do not manually set 'Content-Type' when sending FormData
        Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
        // The browser will set it automatically along with the boundary
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in postData:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
