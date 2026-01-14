import { useContext } from "react";
import { Navigate } from "react-router";
import { UserAuthContext } from "../AuthProvider/AuthContext";

const AuthRoute = ({ children }) => {
  const { user, loadingProvider:loading } = useContext(UserAuthContext);
  if (loading) return null;
  if (user) {
    return <Navigate to="/book" replace />;
  }
  return children;
};

export default AuthRoute;
