import React, { useContext } from "react";
import { AuthenticationContext } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useContext(AuthenticationContext);

  return user ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
