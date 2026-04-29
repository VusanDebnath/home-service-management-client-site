import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
} from "react-icons/fi";
import { MdHomeRepairService } from "react-icons/md";
import useAuth from "../hooks/useAuth";

// Navigation items
const customerNav = [
  { label: "Dashboard", icon: FiHome, path: "/dashboard" },
  { label: "My Bookings", icon: FiCalendar, path: "/dashboard/bookings" },
  { label: "My Profile", icon: FiUser, path: "/dashboard/profile" },
];

// ── SidebarContent কে DashboardLayout এর বাইরে রাখো ──
// কারণ: React এ render এর ভেতরে component define করা যায় না
// বাইরে রেখে props দিয়ে data pass করছি
const SidebarContent = ({ user, onLogout, onClose }) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="px-6 py-5 border-b border-gray-700">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
          <MdHomeRepairService className="text-white text-lg" />
        </div>
        <span className="font-bold text-white text-lg">HomeService</span>
      </div>
    </div>

    {/* User Info */}
    <div className="px-6 py-4 border-b border-gray-700">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
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
      <span className="mt-2 inline-block text-xs bg-blue-600/30 text-blue-300 px-2.5 py-1 rounded-full capitalize">
        {user?.role}
      </span>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-4 py-4 space-y-1">
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider px-3 mb-3">
        Main Menu
      </p>
      {customerNav.map(({ label, icon: Icon, path }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/dashboard"}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/50"
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

// ── Main Layout ──
const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar — lg screen এ সবসময় দেখাবে */}
      <aside className="hidden lg:flex w-64 bg-gray-900 flex-col flex-shrink-0">
        <SidebarContent
          user={user}
          onLogout={handleLogout}
          onClose={() => {}}
        />
      </aside>

      {/* Mobile Overlay — sidebar open থাকলে dark background */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar — বাম থেকে slide করে আসে */}
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
        <SidebarContent
          user={user}
          onLogout={handleLogout}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between flex-shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-blue-600"
          >
            <FiMenu size={22} />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notification */}
            <button className="relative w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
              <FiBell size={16} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {/* Avatar */}
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content — Outlet এখানে বসে */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
