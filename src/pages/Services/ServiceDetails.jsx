import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePageTitle from "../../hooks/usePageTitle";
import { axiosPublic, axiosSecure } from "../../utils/axios";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  usePageTitle(service?.title || "Service Details");

  // Service নাও
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axiosPublic.get(`/services/${id}`);
        setService(res.data.service);
      } catch {
        toast.error("Service not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  // Reviews নাও
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosPublic.get(`/reviews/service/${id}`);
        setReviews(res.data.reviews || []);
      } catch {
        console.error("Failed to load reviews.");
      }
    };
    if (id) fetchReviews();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login to book a service!");
      navigate("/login");
      return;
    }
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time!");
      return;
    }
    setBookingLoading(true);
    try {
      await axiosSecure.post("/bookings", {
        serviceId: id,
        date: selectedDate,
        time: selectedTime,
        address: user.address || "Dhaka",
      });
      toast.success("Booking confirmed! 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed!");
    } finally {
      setBookingLoading(false);
    }
  };

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not Found
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Service Not Found</h2>
        <Link
          to="/services"
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <FiArrowLeft size={16} /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to Services
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Service Info ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden h-72">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-white/90 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                {service.category}
              </span>
              <span
                className={`absolute bottom-4 right-4 text-sm font-semibold px-3 py-1 rounded-full ${
                  service.isAvailable
                    ? "bg-green-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {service.isAvailable ? "● Available" : "● Busy"}
              </span>
            </div>

            {/* Title & Meta */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <FiStar
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                  />
                  <span className="font-semibold text-gray-800">
                    {service.rating > 0 ? service.rating : "New"}
                  </span>
                  {service.reviewCount > 0 &&
                    `(${service.reviewCount} reviews)`}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin size={14} className="text-blue-400" />
                  {service.location || "Dhaka"}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock size={14} className="text-green-400" />
                  {service.duration || "1-2 hours"}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Provider Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                About the Provider
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FiUser size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">
                    {service.providerId?.name || "Unknown"}
                  </p>
                  <p className="text-gray-500 text-sm capitalize">
                    {service.category} Specialist
                  </p>
                  {service.rating > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={12}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      <span className="text-gray-500 text-xs ml-1">
                        {service.rating} rating
                      </span>
                    </div>
                  )}
                </div>
                {service.providerId?.phone && (
                  <a
                    href={`tel:${service.providerId?.phone}`}
                    className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    <FiPhone size={14} />
                    Call
                  </a>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                Customer Reviews ({reviews.length})
              </h2>

              {reviews.length > 0 ? (
                <div className="space-y-5">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="pb-5 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {review.customerId?.name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {review.customerId?.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={12}
                              className="text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiStar size={32} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Booking Card ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              {/* Price */}
              <div className="flex items-end gap-2 mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  ৳{service.price}
                </span>
                <span className="text-gray-400 text-sm mb-1">/ visit</span>
              </div>

              {/* Date Picker */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <FiCalendar size={14} className="inline mr-1.5" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full h-11 px-4 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiClock size={14} className="inline mr-1.5" />
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                        selectedTime === time
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={bookingLoading || !service.isAvailable}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-200 text-sm"
              >
                {bookingLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Booking...
                  </span>
                ) : !service.isAvailable ? (
                  "Currently Unavailable"
                ) : (
                  "Book Now"
                )}
              </button>

              {/* Info */}
              <div className="mt-4 space-y-2">
                {[
                  "Free cancellation up to 24 hours",
                  "No payment needed upfront",
                  "Satisfaction guaranteed",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-gray-500 text-xs"
                  >
                    <FiCheckCircle
                      size={12}
                      className="text-green-500 flex-shrink-0"
                    />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
