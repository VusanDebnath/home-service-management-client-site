import { useState, useEffect } from "react";
import { FiSearch, FiX, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import toast from "react-hot-toast";
import { axiosSecure } from "../../../utils/axios";
import usePageTitle from "../../../hooks/usePageTitle";

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmed", class: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", class: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", class: "bg-red-100 text-red-700" },
};

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  usePageTitle("Manage Bookings");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosSecure.get("/bookings");
        setBookings(res.data.bookings || []);
      } catch {
        toast.error("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    const matchTab = activeTab === "all" || b.status === activeTab;
    const matchSearch =
      b.customerId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.providerId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceId?.title?.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

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
        <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of all bookings across the platform
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FiSearch
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bookings..."
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

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {STATUS_TABS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
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
                ? bookings.length
                : bookings.filter((b) => b.status === value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {[
                  "Service",
                  "Customer",
                  "Provider",
                  "Date & Time",
                  "Status",
                  "Price",
                ].map((h) => (
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
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 text-sm">
                      {booking.serviceId?.title || "Service"}
                    </p>
                    <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                      <FiMapPin size={10} /> {booking.address}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-800 text-sm font-medium">
                      {booking.customerId?.name || "Customer"}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {booking.customerId?.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-800 text-sm font-medium">
                      {booking.providerId?.name || "Provider"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-700 text-sm flex items-center gap-1">
                      <FiCalendar size={12} className="text-blue-400" />{" "}
                      {booking.date}
                    </p>
                    <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                      <FiClock size={10} /> {booking.time}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[booking.status]?.class}`}
                    >
                      {statusConfig[booking.status]?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-purple-600 text-sm">
                      ৳{booking.price}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
