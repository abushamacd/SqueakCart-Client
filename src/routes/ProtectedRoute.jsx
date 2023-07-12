import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser } from "../redux/features/auth/authSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (!user || user?.role !== "admin") {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    return <Navigate to={"/login"} state={{ path: pathname }}></Navigate>;
  }

  return children;
}
