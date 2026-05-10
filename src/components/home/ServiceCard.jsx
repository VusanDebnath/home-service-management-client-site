import { Link } from "react-router-dom";
import { FiStar, FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";

const ServiceCard = ({ service }) => {
  const {
    _id,
    title,
    category,
    price,
    image,
    providerId,
    rating,
    reviewCount,
    location,
    duration,
    isAvailable,
  } = service;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80"
          }
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
            isAvailable ? "bg-green-500 text-white" : "bg-gray-400 text-white"
          }`}
        >
          {isAvailable ? "Available" : "Busy"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
          {title}
        </h3>

        {/* Provider — Backend থেকে populate হয়ে আসে */}
        <p className="text-gray-500 text-sm mb-3">
          by {providerId?.name || "Unknown Provider"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <FiStar size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-gray-800 text-sm">
            {rating > 0 ? rating : "New"}
          </span>
          {reviewCount > 0 && (
            <span className="text-gray-400 text-sm">
              ({reviewCount} reviews)
            </span>
          )}
        </div>

        {/* Location & Duration */}
        <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
          <span className="flex items-center gap-1">
            <FiMapPin size={12} />
            {location || "Dhaka"}
          </span>
          <span className="flex items-center gap-1">
            <FiClock size={12} />
            {duration || "1-2 hours"}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400">Starting from</span>
            <p className="text-xl font-bold text-blue-600">৳{price}</p>
          </div>
          <Link
            to={`/services/${_id}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Book Now
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
