import axios from "axios";
import { useEffect, useState } from "react";
import { UserAuthContext } from "./AuthContext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingProvider, setLoadingProvider] = useState(false);
  const getUser = async () => {
    setLoadingProvider(true);
    try {
      const result = await axios.get("/logged_in");
      setUser(result?.data?.user);
    } catch {
      try {
        await axios.post("/refreshToken");
        const result = await axios.get("/logged_in");
        setUser(result?.data?.user);
      } catch {
        setUser(null);
      }
    } finally {
      setLoadingProvider(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, loadingProvider, getUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default AuthProvider;
