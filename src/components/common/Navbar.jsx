import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdHomeRepairService } from "react-icons/md";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "provider") return "/dashboard/provider";
    return "/dashboard";
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <MdHomeRepairService className="text-white text-lg" />
          </div>
          <span className="font-bold text-gray-900 text-lg">HomeService</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/services"
            className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            Services
          </Link>
          <Link
            to="/#how-it-works"
            className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            How It Works
          </Link>
          <Link
            to="/#contact"
            className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full capitalize">
                  {user.role}
                </span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FiUser size={14} />
                    Dashboard
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <Link
            to="/services"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-gray-700 py-2 hover:text-blue-600"
          >
            Services
          </Link>
          <Link
            to="/#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-gray-700 py-2 hover:text-blue-600"
          >
            How It Works
          </Link>
          <hr className="border-gray-100" />
          {user ? (
            <>
              <Link
                to={getDashboardLink()}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-700 py-2 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-sm text-red-600 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-medium border border-gray-200 rounded-xl text-gray-700"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
