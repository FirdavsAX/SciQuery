import { useState } from "react";
import { putData } from "../../services/ApiService";

export const useUpdate = (url) => {
  const [loading, setLoading] = useState(false);
  

  const update = async (data) => {
    setLoading(true);
    try {
      const result = await putData(url, data);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error("Error in create:", error);
      throw error;
    }
  };

  
  return { update, loading };
};
