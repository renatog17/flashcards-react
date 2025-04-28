// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
  //const token = localStorage.getItem("token");
  const token = sessionStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
}