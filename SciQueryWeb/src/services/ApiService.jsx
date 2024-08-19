import axios from "axios";
import { API_BASE_URL } from "../config/Constants";
export const getData = async (url) => {
  url = API_BASE_URL + url;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: window.localStorage.getItem("token")
          ? `Bearer ${window.localStorage.getItem("token")}`
          : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error)(
      "Error in getData",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const postData = async (url, data) => {
  url = API_BASE_URL + url;

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: window.localStorage.getItem("token")
          ? `Bearer ${window.localStorage.getItem("token")}`
          : "",
      },
    });
    return response.data;
  } catch (error) {
      console.log('asd' +  error)

      if(error.status === 401){
        window.localStorage.removeItem('token');
        console.log('shu  yerda')
      }

    throw error;
  }
};

export const putData = async (url, data) => {
  url = API_BASE_URL + url;

  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: window.localStorage.getItem("token")
          ? `Bearer ${window.localStorage.getItem("token")}`
          : "",
      },
    });
    return response.data;
  } catch (error) {
      if(error.status === 401){
        window.localStorage.removeItem('token');
      }

    throw error;
  }
};
