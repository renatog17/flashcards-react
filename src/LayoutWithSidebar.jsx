// src/LayoutWithSidebar.jsx
import Sidebar from "./components/Sidebar/Sidebar";
import { Router, Routes, Route, Outlet } from "react-router";


export default function LayoutWithSidebar() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Outlet />

      </div>
    </div>
  );
}
