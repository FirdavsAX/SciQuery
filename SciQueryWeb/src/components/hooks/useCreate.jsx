// hooks/useCreate.js
import { useState } from 'react';
import { postData } from '../../services/ApiService';

export const useCreate = (url) => {
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setLoading(true);
    try {
      const result = await postData(url, data);
      setLoading(false);
      return result;
    } 
    catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return { create, loading };
};
