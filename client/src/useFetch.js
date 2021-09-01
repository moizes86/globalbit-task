import { useState, useCallback } from "react";
import Spinner from "./Components/Spinner";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (cb, ...params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cb(...params);
      setData(result.data);
    } catch (e) {
      setError(e.response.data.message || "Something went wrong");
    }
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    data,
    Spinner,
    sendRequest,
  };
};

export default useFetch;
