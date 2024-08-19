import { useState, useEffect } from 'react';
import { getData } from '../../services/ApiService';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) { // Only fetch if URL is valid
      const fetchData = async () => {
        try {
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
  }, [url]);

  return { data, isPending, error };
};
