import React, { useContext } from "react";
import { AuthenticationContext } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const { user } = useContext(AuthenticationContext);

  return user ? <Navigate to={"/"} /> : <Outlet />;
};

export default RedirectIfAuthenticated;
