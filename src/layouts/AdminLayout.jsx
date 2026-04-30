import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiList,
  FiCalendar,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
} from "react-icons/fi";
import { MdHomeRepairService } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const adminNav = [
  { label: "Dashboard", icon: FiHome, path: "/admin/dashboard" },
  { label: "Manage Users", icon: FiUsers, path: "/admin/users" },
  {
    label: "Manage Services",
    icon: MdHomeRepairService,
    path: "/admin/services",
  },
  { label: "Manage Bookings", icon: FiCalendar, path: "/admin/bookings" },
];

const AdminSidebar = ({ user, onLogout, onClose }) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="px-6 py-5 border-b border-gray-700">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center">
          <MdHomeRepairService className="text-white text-lg" />
        </div>
        <div>
          <span className="font-bold text-white text-base">HomeService</span>
          <p className="text-purple-300 text-xs">Admin Panel</p>
        </div>
      </div>
    </div>

    {/* User Info */}
    <div className="px-6 py-4 border-b border-gray-700">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="overflow-hidden">
          <p className="text-white font-semibold text-sm truncate">
            {user?.name}
          </p>
          <p className="text-gray-400 text-xs truncate">{user?.email}</p>
        </div>
      </div>
      <span className="mt-2 inline-block text-xs bg-purple-600/30 text-purple-300 px-2.5 py-1 rounded-full capitalize">
        Administrator
      </span>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-4 py-4 space-y-1">
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider px-3 mb-3">
        Admin Menu
      </p>
      {adminNav.map(({ label, icon: Icon, path }) => (
        <NavLink
          key={path}
          to={path}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>

    {/* Logout */}
    <div className="px-4 py-4 border-t border-gray-700">
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-600/20 hover:text-red-400 transition-all"
      >
        <FiLogOut size={18} />
        Logout
      </button>
    </div>
  </div>
);

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-gray-900 flex-col flex-shrink-0">
        <AdminSidebar user={user} onLogout={handleLogout} onClose={() => {}} />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 flex flex-col
        transform transition-transform duration-300 lg:hidden
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FiX size={20} />
        </button>
        <AdminSidebar
          user={user}
          onLogout={handleLogout}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-purple-600"
          >
            <FiMenu size={22} />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
              <FiBell size={16} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
