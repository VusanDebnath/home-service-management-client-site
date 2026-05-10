import { useState, useEffect } from "react";
import { FiSearch, FiX, FiShield, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { axiosSecure } from "../../../utils/axios";
import usePageTitle from "../../../hooks/usePageTitle";

const ROLE_TABS = [
  { label: "All", value: "all" },
  { label: "Customer", value: "customer" },
  { label: "Provider", value: "provider" },
  { label: "Admin", value: "admin" },
];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  usePageTitle("Manage Users");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data.users || []);
      } catch {
        toast.error("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchTab = activeTab === "all" || u.role === activeTab;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleToggleBlock = async (id) => {
    try {
      await axiosSecure.patch(`/users/${id}/toggle-block`);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id
            ? { ...u, status: u.status === "active" ? "blocked" : "active" }
            : u,
        ),
      );
      toast.success("User status updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed!");
    }
  };

  const handleMakeAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/${id}/make-admin`);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u)),
      );
      toast.success("User promoted to Admin!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-500 text-sm mt-1">
          View, block, or delete users
        </p>
      </div>

      {/* Search + Tabs */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full h-11 pl-10 pr-10 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={15} />
            </button>
          )}
        </div>

        {/* Role Tabs */}
        <div className="flex gap-2 flex-wrap">
          {ROLE_TABS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === value
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300"
              }`}
            >
              {label}
              <span
                className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === value
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {value === "all"
                  ? users.length
                  : users.filter((u) => u.role === value).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {["User", "Role", "Status", "Joined", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">
                          {user.name?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {user.name}
                        </p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        user.role === "provider"
                          ? "bg-green-100 text-green-700"
                          : user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Make Admin */}
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-purple-50 text-purple-600 border border-purple-200 text-xs font-medium rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          <FiShield size={12} /> Admin
                        </button>
                      )}

                      {/* Block/Unblock */}
                      <button
                        onClick={() => handleToggleBlock(user._id)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                          user.status === "active"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100"
                            : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                        }`}
                      >
                        {user.status === "active" ? "Block" : "Unblock"}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
