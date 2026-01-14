import axios from "axios";
import { useEffect, useState } from "react";

const useGenreHook = () => {
  const [allGenre, setAllGenre] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(null);
  useEffect(() => {
    const fetchGenre = async () => {
      try {
        setLoading(true);
        const result = await axios.get("/genre");

        setAllGenre(result.data.genres);
        console.log(result.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenre();
  }, []);
  return { allGenre, error, loading, setAllGenre, setLoading };
};

export default useGenreHook;
