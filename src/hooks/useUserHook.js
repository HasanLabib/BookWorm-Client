import { useEffect, useState } from "react";
import axios from "axios";

const useUserHook = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users", { withCredentials: true })
      .then((res) => {
        setAllUsers(res.data.users);
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  }, []);

  return { allUsers, setAllUsers };
};

export default useUserHook;
