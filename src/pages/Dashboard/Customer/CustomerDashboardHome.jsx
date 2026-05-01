import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import { DUMMY_BOOKINGS, DUMMY_STATS } from "../../../data/bookings.data";
import usePageTitle from './../../../hooks/usePageTitle';

// Status এর color আর label এক জায়গায়
const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmed", class: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", class: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", class: "bg-red-100 text-red-700" },
};

// Stats card এ icon আর color আলাদা রাখলাম
const statsIcons = [
  { icon: FiCalendar, color: "bg-blue-50 text-blue-600" },
  { icon: FiClock, color: "bg-yellow-50 text-yellow-600" },
  { icon: FiCheckCircle, color: "bg-green-50 text-green-600" },
  { icon: FiXCircle, color: "bg-red-50 text-red-600" },
];

const CustomerDashboardHome = () => {
  const { user } = useAuth();

  // Recent bookings — শুধু প্রথম ৩টা দেখাবো
  const recentBookings = DUMMY_BOOKINGS.slice(0, 3);

  usePageTitle("Dashboard - Home");// পেজ টাইটেল সেট করার জন্য কাস্টম হুক ব্যবহার করছি
  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ── */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">
          Welcome back, {user?.name?.split(" ")[0]}! 👋
        </h1>
        <p className="text-blue-100 text-sm">
          Manage your bookings and find new services easily.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-white text-blue-600 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors"
        >
          Book a Service
          <FiArrowRight size={15} />
        </Link>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {DUMMY_STATS.map(({ label, value }, index) => {
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

      {/* ── Recent Bookings ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Bookings</h2>
          <Link
            to="/dashboard/bookings"
            className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
          >
            View all <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {["Service", "Date & Time", "Status", "Price", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 text-sm">
                      {booking.service}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {booking.provider}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-700 text-sm">{booking.date}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {booking.time}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[booking.status].class}`}
                    >
                      {statusConfig[booking.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 text-sm">
                      ৳{booking.price}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === "completed" && (
                      <button className="flex items-center gap-1 text-yellow-500 hover:text-yellow-600 text-xs font-medium">
                        <FiStar size={13} /> Review
                      </button>
                    )}
                    {booking.status === "pending" && (
                      <button className="text-red-500 hover:text-red-600 text-xs font-medium">
                        Cancel
                      </button>
                    )}
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

export default CustomerDashboardHome;
