import React, { useContext } from "react";
import { FirebaseContext } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const { user } = useContext(FirebaseContext);

  return user ? <Navigate to={"/"} /> : <Outlet />;
};

export default RedirectIfAuthenticated;
