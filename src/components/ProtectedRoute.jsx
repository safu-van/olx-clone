import React, { useContext } from "react";
import { FirebaseContext } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useContext(FirebaseContext);

  return user ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
