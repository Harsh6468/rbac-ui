import React, { useState, useEffect } from "react";

export const roles = ["Admin", "User", "Manager", "Editor", "Viewer"];
export const statuses = ["Active", "Inactive", "Pending"];

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
  ]);
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ id: null, name: "", email: "", role: "", status: "" });
  const [editEmail, setEditEmail] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deleteUser, setDeleteUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for managing sidebar visibility
  const [isSmallScreen, setIsSmallScreen] = useState(false); // track if it's a small screen

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Assuming 1024px is the breakpoint for large screens
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize screen size state on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchEdit = () => {
    const user = users.find((u) => u.email === editEmail);
    if (user) {
      setFormData(user);
    } else {
      setFormData({ id: null, name: "", email: "", role: "", status: "" });
    }
  };

  const handleSearchDelete = () => {
    const user = users.find((u) => u.email === deleteEmail);
    setDeleteUser(user || null);
  };

  const handleDelete = () => {
    setUsers(users.filter((user) => user.email !== deleteUser.email));
    setDeleteUser(null);
    setShowConfirmation(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    resetForm();
    setActiveTab("list");
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", email: "", role: "", status: "" });
    setEditEmail("");
    setDeleteEmail("");
    setDeleteUser(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isSmallScreen) {
      setIsSidebarOpen(false); // Close sidebar on small screens when switching tabs
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div
        className={`lg:w-1/4 w-full bg-gray-800 text-white h-[80vh] shadow-lg rounded-l-lg p-4 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">User Management</h2>
        <ul>
          {["list", "create", "edit", "delete"].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer py-2 px-4 rounded ${activeTab === tab ? "bg-gray-700" : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Users
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger Menu Button for Small Screens */}
      <div className="lg:hidden p-4">
        <button
          className="text-gray-800 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="lg:flex-1 p-6 bg-white h-[80vh] shadow-lg rounded-r-lg overflow-auto">
        {activeTab === "list" && (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="bg-gray-50 shadow-md rounded">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "create" && (
          <div className="bg-gray-50 shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-4">Create User</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />

              {/* Role Dropdown */}
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded w-full mb-4"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              {/* Status Dropdown */}
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded w-full mb-4"
              >
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
          </div>
        )}

        {activeTab === "edit" && (
          <div className="bg-gray-50 shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Search by email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={handleSearchEdit}
              >
                Search
              </button>
            </div>
            {formData.id && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                  disabled
                />

                {/* Role Dropdown */}
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>

                {/* Status Dropdown */}
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                >
                  <option value="">Select Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
              </form>
            )}
          </div>
        )}

        {activeTab === "delete" && (
          <div className="bg-gray-50 shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-4">Delete User</h3>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Search by email"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={handleSearchDelete}
              >
                Search
              </button>
            </div>
            {deleteUser && (
              <div>
                <p>Are you sure you want to delete {deleteUser.name}?</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                  onClick={() => setShowConfirmation(true)}
                >
                  Confirm Deletion
                </button>
              </div>
            )}
            {showConfirmation && (
              <div className="mt-4">
                <p>Are you sure you want to delete?</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
