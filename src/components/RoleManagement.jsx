import React, { useState } from "react";

const availablePermissions = ["Read", "Write", "Delete", "Update"];

const RoleManagement = () => {
  const [rolesData, setRolesData] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: ["Read", "Write", "Delete", "Update"],
    },
    {
      id: 2,
      name: "User",
      permissions: ["Read", "View"],
    },
  ]);

  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ id: null, name: "", permissions: [] });
  const [editName, setEditName] = useState("");
  const [deleteName, setDeleteName] = useState("");
  const [deleteRole, setDeleteRole] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for sidebar toggle

  const filteredRoles = rolesData.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.permissions.some(permission => permission.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "permissions") {
      setFormData({
        ...formData,
        permissions: checked
          ? [...formData.permissions, value]
          : formData.permissions.filter((permission) => permission !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSearchEdit = () => {
    const role = rolesData.find((r) => r.name === editName);
    if (role) {
      setFormData(role);
    } else {
      setFormData({ id: null, name: "", permissions: [] });
    }
  };

  const handleSearchDelete = () => {
    const role = rolesData.find((r) => r.name === deleteName);
    setDeleteRole(role || null);
  };

  const handleDelete = () => {
    setRolesData(rolesData.filter((role) => role.name !== deleteRole.name));
    setDeleteRole(null);
    setShowConfirmation(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setRolesData(rolesData.map((role) => (role.id === formData.id ? formData : role)));
    } else {
      setRolesData([...rolesData, { ...formData, id: Date.now() }]);
    }
    resetForm();
    setActiveTab("list");
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", permissions: [] });
    setEditName("");
    setDeleteName("");
    setDeleteRole(null);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div
        className={`lg:w-1/4 w-full bg-gray-800 text-white h-[80vh] shadow-lg rounded-l-lg p-4 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Role Management</h2>
        <ul>
          {["list", "create", "edit", "delete"].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer py-2 px-4 rounded ${activeTab === tab ? "bg-gray-700" : ""}`}
              onClick={() => {
                resetForm();
                setActiveTab(tab);
                if (window.innerWidth < 1024) setIsSidebarOpen(false); // Close sidebar on small screens
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Roles
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger Menu Button for Small Screens */}
      <div className="lg:hidden p-4">
        <button
          className="text-black focus:outline-none"
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
                placeholder="Search by name or permission"
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
                    <th className="px-4 py-2">Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoles.map((role) => (
                    <tr key={role.id} className="border-t">
                      <td className="px-4 py-2">{role.name}</td>
                      <td className="px-4 py-2">
                        {role.permissions.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Create Role */}
        {activeTab === "create" && (
          <div className="bg-gray-50 shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-4">Create Role</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Role Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <div className="mb-4">
                <h4 className="font-bold">Assign Permissions</h4>
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="permissions"
                      value={permission}
                      checked={formData.permissions.includes(permission)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label>{permission}</label>
                  </div>
                ))}
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Role</button>
            </form>
          </div>
        )}

        {/* Edit Role */}
        {activeTab === "edit" && (
          <div className="bg-gray-50 shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-4">Edit Role</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by role name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
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
                  placeholder="Role Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                />
                <div className="mb-4">
                  <label className="font-bold">Permissions</label>
                  <div className="flex flex-wrap gap-4">
                    {availablePermissions.map((permission) => (
                      <div key={permission}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="permissions"
                            value={permission}
                            checked={formData.permissions.includes(permission)}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {permission}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
              </form>
            ) : (
              <p>Role not found</p>
            )}
          </div>
        )}

        {/* Delete Role */}
        {activeTab === "delete" && (
          <div className="bg-gray-50 shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-4">Delete Role</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by role name"
                value={deleteName}
                onChange={(e) => setDeleteName(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={handleSearchDelete}
              >
                Search
              </button>
            </div>
            {deleteRole && (
              <div>
                <p>
                  Are you sure you want to delete the role{" "}
                  <span className="font-bold">{deleteRole.name}</span>?
                </p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                  onClick={() => setShowConfirmation(true)}
                >
                  Delete Role
                </button>
                {showConfirmation && (
                  <div className="mt-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={() => setDeleteRole(null)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleManagement;
