import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../../Functions/services/auth.service";

const ProtectedRoute = () => {
  const token = AuthService.isUser();
  return token ? (
    <>
        <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
