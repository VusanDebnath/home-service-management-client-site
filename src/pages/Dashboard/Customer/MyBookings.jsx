import { useState, useEffect } from "react";
import { FiCalendar, FiClock, FiMapPin, FiStar, FiX } from "react-icons/fi";
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

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [reviewModal, setReviewModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  usePageTitle("My Bookings");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/bookings/my");
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

  const handleCancel = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}/cancel`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b)),
      );
      toast.success("Booking cancelled!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel!");
    }
  };

  const handleReviewSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment!");
      return;
    }
    setSubmitting(true);
    try {
      await axiosSecure.post("/reviews", {
        bookingId: reviewModal._id,
        rating,
        comment,
      });
      toast.success("Review submitted! ⭐");
      setReviewModal(null);
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review!");
    } finally {
      setSubmitting(false);
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
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track and manage all your bookings
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
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 truncate">
                      {booking.serviceId?.title || "Service"}
                    </h3>
                    <span
                      className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[booking.status]?.class}`}
                    >
                      {statusConfig[booking.status]?.label}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">
                    by {booking.providerId?.name || "Provider"}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar size={12} className="text-blue-400" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock size={12} className="text-green-400" />
                      {booking.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiMapPin size={12} className="text-red-400" />
                      {booking.address}
                    </span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <p className="text-xl font-bold text-blue-600">
                    ৳{booking.price}
                  </p>
                  <div className="flex gap-2">
                    {booking.status === "completed" && (
                      <button
                        onClick={() => setReviewModal(booking)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-600 border border-yellow-200 text-xs font-medium rounded-lg hover:bg-yellow-100 transition-colors"
                      >
                        <FiStar size={12} /> Write Review
                      </button>
                    )}
                    {booking.status === "pending" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <FiX size={12} /> Cancel
                      </button>
                    )}
                  </div>
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

      {/* ── Review Modal ── */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Write a Review</h3>
              <button
                onClick={() => {
                  setReviewModal(null);
                  setRating(0);
                  setComment("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>

            <p className="text-gray-500 text-sm mb-4">
              {reviewModal.serviceId?.title}
            </p>

            {/* Star Rating */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <FiStar
                    size={28}
                    className={
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setReviewModal(null);
                  setRating(0);
                  setComment("");
                }}
                className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                disabled={submitting}
                className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:bg-blue-400"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
