import { useState, useEffect } from 'react';
import { deleteData } from '../../services/ApiService';
import { useCheckToken } from './useCheckToken';

export const useDelete = (deps = []) => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useCheckToken();  
  
  const deleteItem = async (url) => {
    setIsPending(true);
    try {
      await deleteData(url);
      setIsPending(false);
    } catch (error) {
        setIsPending(false);
      console.error("Error in create:", error);
      throw error;
    }
  };

  return { deleteItem,isPending, error };
};
