import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data); 
      } catch (err) {
        console.error("Error fetching data:", err);
      } 
    };

    fetchData();
  }, [url]); 
  return {data}; 
};