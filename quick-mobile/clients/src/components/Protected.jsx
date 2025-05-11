import React from "react";
import { Navigate } from "react-router";
import { useUser } from "../../context/context";

const ProtectedLayout = ({ children }) => {
  const { email } = useUser();

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
