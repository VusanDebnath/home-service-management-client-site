import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiCalendar,
  FiArrowRight,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";
import { MdHomeRepairService } from "react-icons/md";
import toast from "react-hot-toast";
import { axiosSecure } from "../../../utils/axios";
import usePageTitle from "../../../hooks/usePageTitle";

const statsIcons = [
  { icon: FiUsers, color: "bg-blue-50 text-blue-600" },
  { icon: MdHomeRepairService, color: "bg-green-50 text-green-600" },
  { icon: FiCalendar, color: "bg-purple-50 text-purple-600" },
  { icon: FiTrendingUp, color: "bg-orange-50 text-orange-600" },
];

const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmed", class: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", class: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", class: "bg-red-100 text-red-700" },
};

const AdminDashboardHome = () => {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageTitle("Admin Dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, servicesRes, bookingsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/services/admin/all"),
          axiosSecure.get("/bookings"),
        ]);
        setUsers(usersRes.data.users || []);
        setServices(servicesRes.data.services || []);
        setBookings(bookingsRes.data.bookings || []);
      } catch {
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Total Users", value: users.length },
    { label: "Total Services", value: services.length },
    { label: "Total Bookings", value: bookings.length },
    {
      label: "Total Providers",
      value: users.filter((u) => u.role === "provider").length,
    },
  ];

  const pendingServices = services.filter((s) => !s.isApproved);
  const recentBookings = bookings.slice(0, 3);
  const recentUsers = users.slice(0, 4);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ── */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Admin Dashboard 👋</h1>
            <p className="text-purple-100 text-sm">
              Manage users, services, and bookings from here.
            </p>
            <div className="flex gap-3 mt-4">
              <Link
                to="/admin/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-purple-600 font-semibold text-sm rounded-xl hover:bg-purple-50 transition-colors"
              >
                Review Services
                <FiArrowRight size={15} />
              </Link>
              <Link
                to="/admin/users"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 text-white font-semibold text-sm rounded-xl hover:bg-white/25 transition-colors border border-white/30"
              >
                Manage Users
              </Link>
            </div>
          </div>

          {/* Pending Alert */}
          {pendingServices.length > 0 && (
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 flex-shrink-0 text-center">
              <p className="text-white text-xs font-medium">
                ⏳ Awaiting Approval
              </p>
              <p className="text-white text-3xl font-bold">
                {pendingServices.length}
              </p>
              <p className="text-purple-200 text-xs">services</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value }, index) => {
          const { icon: Icon, color } = statsIcons[index];
          return (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div
                className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}
              >
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-gray-500 text-sm mt-0.5">{label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Pending Approvals ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-gray-900">Pending Approvals</h2>
              {pendingServices.length > 0 && (
                <span className="w-5 h-5 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {pendingServices.length}
                </span>
              )}
            </div>
            <Link
              to="/admin/services"
              className="text-purple-600 text-sm font-medium hover:underline flex items-center gap-1"
            >
              View all <FiArrowRight size={14} />
            </Link>
          </div>

          {pendingServices.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {pendingServices.slice(0, 3).map((service) => (
                <div key={service._id} className="px-6 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {service.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        by {service.providerId?.name || "Provider"}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {service.category} · ৳{service.price}
                      </p>
                    </div>
                    <span className="flex-shrink-0 px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <FiCheckCircle
                size={32}
                className="text-green-400 mx-auto mb-2"
              />
              <p className="text-gray-500 text-sm">All services approved!</p>
            </div>
          )}
        </div>

        {/* ── Recent Bookings ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Recent Bookings</h2>
            <Link
              to="/admin/bookings"
              className="text-purple-600 text-sm font-medium hover:underline flex items-center gap-1"
            >
              View all <FiArrowRight size={14} />
            </Link>
          </div>

          {recentBookings.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <div key={booking._id} className="px-6 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {booking.serviceId?.title || "Service"}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {booking.customerId?.name} → {booking.providerId?.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {booking.date} · {booking.time}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[booking.status]?.class}`}
                      >
                        {statusConfig[booking.status]?.label}
                      </span>
                      <p className="font-semibold text-purple-600 text-sm">
                        ৳{booking.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-gray-400 text-sm">No bookings yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Recent Users ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Users</h2>
          <Link
            to="/admin/users"
            className="text-purple-600 text-sm font-medium hover:underline flex items-center gap-1"
          >
            View all <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {["User", "Role", "Status", "Joined"].map((h) => (
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
              {recentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">
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
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
