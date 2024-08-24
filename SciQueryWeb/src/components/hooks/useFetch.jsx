import { useState, useEffect } from 'react';
import { getData } from '../../services/ApiService';
import { useCheckToken } from './useCheckToken';

export const useFetch = (url, deps = []) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useCheckToken();  
  
  useEffect(() => {
    if (url) { // Only fetch if URL is valid
      const fetchData = async () => {
        try {
          setIsPending(true);
          const result = await getData(url);
          setData(result);
          setError(null);
        } catch (err) {
          setError(err.message || 'An error occurred');
          setData(null);
        } finally {
          setIsPending(false);
        }
      };

      fetchData();
    } else {
      setIsPending(false); // If no URL, stop pending state
    }
  }, [url, ...deps]); // Include deps in the dependency array

  return { data, isPending, error };
};
