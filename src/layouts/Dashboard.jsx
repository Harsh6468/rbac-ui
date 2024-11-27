// src/layouts/DashboardLayout.jsx
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 overflow-y-auto bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
