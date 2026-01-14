import React, {  useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import { UserAuthContext } from "../AuthProvider/AuthContext";

const PrivateRouteProvide = ({ children }) => {
  const { user, loading } = useContext(UserAuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRouteProvide;
