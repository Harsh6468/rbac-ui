// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
