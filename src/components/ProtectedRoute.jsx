import React, { useContext } from "react";
import { FirebaseContext } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useContext(FirebaseContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
