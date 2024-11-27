// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { name: "Users", path: "/users" },
    { name: "Roles", path: "/roles" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="text-2xl font-bold p-6">RBAC Admin</div>
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
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
