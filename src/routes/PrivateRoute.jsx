import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to={"/login"} state={{ path: pathname }}></Navigate>;
  }

  return children;
}
