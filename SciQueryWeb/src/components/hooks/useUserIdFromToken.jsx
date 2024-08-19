import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import

export const useUserIdFromToken = (token) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.nameid); // Ensure 'nameid' matches the token claim
      } catch (err) {
        setUserId(null); // Handle errors silently
        console.error('Failed to decode token', err);
      }
    } else {
      setUserId(null);
    }
  }, [token]);

  return { userId };
};
