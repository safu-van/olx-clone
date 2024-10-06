import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FirebaseContext } from "../context/Context";

function RedirectIfAuthenticated() {
  const { user, loading } = useContext(FirebaseContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
      </div>
    );
  }

  return user ? <Navigate to="/" /> : <Outlet />;
}

export default RedirectIfAuthenticated;
