import { useEffect, useState } from "react";
import axios from "axios";

const useBookHook = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/books").then((res) => {
      setAllBooks(res.data.books);
      setLoading(false);
    });
  }, []);

  return { allBooks, setAllBooks, loading };
};

export default useBookHook;
