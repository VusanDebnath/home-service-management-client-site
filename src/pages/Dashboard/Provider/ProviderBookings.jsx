import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCalendar, FiCheck, FiClock, FiMapPin, FiX } from "react-icons/fi";
import usePageTitle from "../../../hooks/usePageTitle";
import { axiosSecure } from "../../../utils/axios";

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
];

const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmed", class: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", class: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", class: "bg-red-100 text-red-700" },
};

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  usePageTitle("Bookings");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/bookings/provider");
        setBookings(res.data.bookings || []);
      } catch {
        toast.error("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (b) => activeTab === "all" || b.status === activeTab,
  );

  const handleConfirm = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}/confirm`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "confirmed" } : b)),
      );
      toast.success("Booking confirmed!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed!");
    }
  };

  const handleComplete = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}/complete`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "completed" } : b)),
      );
      toast.success("Marked as completed!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed!");
    }
  };

  const handleCancel = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}/cancel`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b)),
      );
      toast.error("Booking cancelled.");
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
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage customer booking requests
        </p>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {STATUS_TABS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === value
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
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

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Customer */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {booking.customerId?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {booking.customerId?.name || "Customer"}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {booking.customerId?.email}
                      </p>
                    </div>
                    <span
                      className={`ml-auto flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[booking.status]?.class}`}
                    >
                      {statusConfig[booking.status]?.label}
                    </span>
                  </div>

                  {/* Service */}
                  <p className="font-medium text-gray-800 text-sm mb-2">
                    {booking.serviceId?.title || "Service"}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} className="text-blue-400" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock size={12} className="text-green-400" />
                      {booking.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin size={12} className="text-red-400" />
                      {booking.address}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleConfirm(booking._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <FiCheck size={12} /> Confirm
                        </button>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <FiX size={12} /> Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => handleComplete(booking._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <FiCheck size={12} /> Mark as Completed
                      </button>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-xl font-bold text-blue-600">
                    ৳{booking.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCalendar size={28} className="text-gray-300" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">No bookings found</h3>
          <p className="text-gray-400 text-sm">
            No {activeTab !== "all" ? activeTab : ""} bookings yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProviderBookings;
