import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../utilis/config.js';

const useFetch = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(BASE_URL + query);
        if (res.status === 200) {
          setData(res.data);
          setError(null); // Reset error state on success
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]); // Add query as a dependency if needed

  return { data, loading, error };
};

export default useFetch;
