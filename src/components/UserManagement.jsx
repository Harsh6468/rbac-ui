import React, { useState } from "react";

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

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white h-[80vh] shadow-lg rounded-l-lg p-4">
        <h2 className="text-xl font-bold mb-6">User Management</h2>
        <ul>
          {["list", "create", "edit", "delete"].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer py-2 px-4 rounded ${activeTab === tab ? "bg-gray-700" : ""}`}
              onClick={() => {
                resetForm();
                setActiveTab(tab);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Users
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white h-[80vh] shadow-lg rounded-r-lg overflow-auto">
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
            {formData.id ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full mb-4"
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
            ) : (
              <p>User not found</p>
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
                <p>Are you sure you want to delete the user {deleteUser.name}?</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                  onClick={() => setShowConfirmation(true)}
                >
                  Delete
                </button>
              </div>
            )}

            {showConfirmation && (
              <div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-4"
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
