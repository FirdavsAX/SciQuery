import axios from "axios";
import { API_BASE_URL } from "../config/Constants";

export const postData = async (url, data) => {
  url = API_BASE_URL + url;
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: window.localStorage.getItem('token') ? `Bearer ${window.localStorage.getItem('token')}` : "",
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
