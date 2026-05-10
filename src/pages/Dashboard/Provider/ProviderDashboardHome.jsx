import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiStar,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import { MdHomeRepairService } from "react-icons/md";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import usePageTitle from "../../../hooks/usePageTitle";
import { axiosSecure } from "../../../utils/axios";

const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmed", class: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", class: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", class: "bg-red-100 text-red-700" },
};

const statsIcons = [
  { icon: MdHomeRepairService, color: "bg-blue-50 text-blue-600" },
  { icon: FiCalendar, color: "bg-purple-50 text-purple-600" },
  { icon: FiCheckCircle, color: "bg-green-50 text-green-600" },
  { icon: FiClock, color: "bg-yellow-50 text-yellow-600" },
];

const ProviderDashboardHome = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageTitle("Provider Dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, bookingsRes] = await Promise.all([
          axiosSecure.get("/services/my/services"),
          axiosSecure.get("/bookings/provider"),
        ]);
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
    { label: "Total Services", value: services.length },
    { label: "Total Bookings", value: bookings.length },
    {
      label: "Completed Jobs",
      value: bookings.filter((b) => b.status === "completed").length,
    },
    {
      label: "Pending",
      value: bookings.filter((b) => b.status === "pending").length,
    },
  ];

  const pendingServices = services.filter((s) => !s.isApproved);
  const recentBookings = bookings.slice(0, 3);

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
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Welcome, {user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-blue-100 text-sm">
              Manage your services and track your bookings.
            </p>
            <div className="flex gap-3 mt-4">
              <Link
                to="/dashboard/provider/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors"
              >
                Manage Services
                <FiArrowRight size={15} />
              </Link>
              <Link
                to="/dashboard/provider/bookings"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 text-white font-semibold text-sm rounded-xl hover:bg-white/25 transition-colors border border-white/30"
              >
                View Bookings
              </Link>
            </div>
          </div>

          {/* Pending approval alert */}
          {pendingServices.length > 0 && (
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 flex-shrink-0 text-center">
              <p className="text-white text-xs font-medium">
                ⏳ Pending Approval
              </p>
              <p className="text-white text-2xl font-bold">
                {pendingServices.length}
              </p>
              <p className="text-blue-200 text-xs">service(s)</p>
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
        {/* ── Recent Bookings ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Recent Bookings</h2>
            <Link
              to="/dashboard/provider/bookings"
              className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
            >
              View all <FiArrowRight size={14} />
            </Link>
          </div>

          {recentBookings.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <div key={booking._id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {booking.customerId?.name || "Customer"}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5 truncate">
                        {booking.serviceId?.title || "Service"}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {booking.date} · {booking.time}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[booking.status]?.class}`}
                      >
                        {statusConfig[booking.status]?.label}
                      </span>
                      <p className="font-semibold text-blue-600 text-sm">
                        ৳{booking.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <FiCalendar size={28} className="text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No bookings yet.</p>
            </div>
          )}
        </div>

        {/* ── My Services ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">My Services</h2>
            <Link
              to="/dashboard/provider/services"
              className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
            >
              Manage <FiArrowRight size={14} />
            </Link>
          </div>

          {services.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {services.slice(0, 3).map((service) => (
                <div key={service._id} className="px-6 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {service.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-gray-400 text-xs">
                          {service.category}
                        </span>
                        {service.rating > 0 && (
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <FiStar
                              size={11}
                              className="text-yellow-400 fill-yellow-400"
                            />
                            {service.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <p className="font-semibold text-blue-600 text-sm">
                        ৳{service.price}
                      </p>
                      {service.isApproved ? (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            service.isAvailable
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {service.isAvailable ? "Active" : "Inactive"}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <MdHomeRepairService
                size={28}
                className="text-gray-200 mx-auto mb-2"
              />
              <p className="text-gray-400 text-sm">No services yet.</p>
              <Link
                to="/dashboard/provider/services"
                className="inline-block mt-3 text-blue-600 text-sm font-medium hover:underline"
              >
                Add your first service →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboardHome;
