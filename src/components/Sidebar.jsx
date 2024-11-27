import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar state
  const navItems = [
    { name: "Users", path: "/users" },
    { name: "Roles", path: "/roles" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-gray-800 text-white h-screen flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Sidebar Header with the arrow button */}
      <div className="text-2xl font-bold p-6 flex justify-between items-center">
        <span>{isSidebarOpen ? "RBAC Admin" : ""}</span>
        {/* Always visible arrow button */}
        <button
          onClick={toggleSidebar}
          className="text-white p-2 focus:outline-none"
        >
          {/* Arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-6 w-6 transform ${isSidebarOpen ? "rotate-180" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 px-4">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            {isSidebarOpen ? item.name : ""}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
