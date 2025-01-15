import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeLoading, changeNetworkError } from '../redux/Home';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeNetworkError(false));
    setLoading(true); // Start the loader

    const fetchData = async () => {
      try {
        let response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error", error);

        if (error.message === "Network Error") {
          dispatch(changeNetworkError(true));
        }
      } finally {
        setLoading(false); // Stop the loader
      }
    };

    fetchData();
  }, [url, dispatch]); // Include dispatch in the dependency array

  return { data, loading }; // Return loading state
};
