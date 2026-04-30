import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiPhone,
  FiCheck,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { PROVIDER_BOOKINGS } from "../../../data/provider.data";

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
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState(PROVIDER_BOOKINGS);

  const filteredBookings = bookings.filter(
    (b) => activeTab === "all" || b.status === activeTab,
  );

  const handleConfirm = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "confirmed" } : b)),
    );
    toast.success("Booking confirmed!");
    // Backend হলে: await axiosSecure.patch(`/bookings/${id}/confirm`)
  };

  const handleComplete = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "completed" } : b)),
    );
    toast.success("Marked as completed!");
    // Backend হলে: await axiosSecure.patch(`/bookings/${id}/complete`)
  };

  const handleCancel = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
    );
    toast.error("Booking cancelled.");
    // Backend হলে: await axiosSecure.patch(`/bookings/${id}/cancel`)
  };

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
              key={booking.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Customer Info */}
                <div className="flex-1 min-w-0">
                  {/* Top row */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {booking.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {booking.customerName}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {booking.customerEmail}
                      </p>
                    </div>
                    <span
                      className={`ml-auto flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[booking.status].class}`}
                    >
                      {statusConfig[booking.status].label}
                    </span>
                  </div>

                  {/* Service */}
                  <p className="font-medium text-gray-800 text-sm mb-2">
                    {booking.service}
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
                          onClick={() => handleConfirm(booking.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <FiCheck size={12} /> Confirm
                        </button>
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <FiX size={12} /> Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => handleComplete(booking.id)}
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
