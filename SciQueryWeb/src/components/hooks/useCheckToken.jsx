import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const useCheckToken = () => {
  useEffect(() => {
    const token = window.localStorage.getItem('token'); 
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp <= currentTime) { // Compare with the token's expiration time
          window.localStorage.removeItem('token');
          window.location.href = '/'; // Redirect to login page
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        window.localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to login page on error
      }
    }
  }, []);
};
