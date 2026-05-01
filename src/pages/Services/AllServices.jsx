import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiFilter, FiX, FiGrid, FiList } from "react-icons/fi";
import {
  MdPlumbing,
  MdElectricBolt,
  MdCleaningServices,
  MdAcUnit,
  MdFormatPaint,
  MdBuild,
} from "react-icons/md";
import ServiceCard from "../../components/home/ServiceCard";
import usePageTitle from "../../hooks/usePageTitle";

import { DUMMY_SERVICES } from "../../data/services.data"; // Dummy data for testing, replace with API data in production

// ── Dummy Data ────────────────────────────────────── Not use now, just for reference. API থেকে আসবে data, এই structure মেনে আসতে হবে।
// const DUMMY_SERVICES = [
//   {
//     _id: "1",
//     title: "Professional Plumbing Repair",
//     category: "Plumbing",
//     price: 500,
//     image:
//       "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
//     providerName: "Rahim Plumbing Co.",
//     rating: 4.8,
//     reviewCount: 124,
//     location: "Dhaka",
//     duration: "1-2 hours",
//     isAvailable: true,
//     description:
//       "Expert plumbing services for all your home needs including pipe repair, installation, and maintenance.",
//   },
//   {
//     _id: "2",
//     title: "Home Electrical Wiring & Repair",
//     category: "Electrical",
//     price: 800,
//     image:
//       "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80",
//     providerName: "Karim Electric",
//     rating: 4.9,
//     reviewCount: 89,
//     location: "Dhaka",
//     duration: "2-3 hours",
//     isAvailable: true,
//     description:
//       "Safe and certified electrical services for residential and commercial properties.",
//   },
//   {
//     _id: "3",
//     title: "Deep Home Cleaning Service",
//     category: "Cleaning",
//     price: 1200,
//     image:
//       "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
//     providerName: "CleanPro BD",
//     rating: 4.7,
//     reviewCount: 210,
//     location: "Chittagong",
//     duration: "3-4 hours",
//     isAvailable: true,
//     description:
//       "Thorough deep cleaning service for your entire home using eco-friendly products.",
//   },
//   {
//     _id: "4",
//     title: "AC Installation & Servicing",
//     category: "AC Repair",
//     price: 1500,
//     image:
//       "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
//     providerName: "Cool Air Services",
//     rating: 4.6,
//     reviewCount: 67,
//     location: "Dhaka",
//     duration: "2-3 hours",
//     isAvailable: false,
//     description:
//       "Professional AC installation, servicing, and repair for all major brands.",
//   },
//   {
//     _id: "5",
//     title: "Interior & Exterior Painting",
//     category: "Painting",
//     price: 3000,
//     image:
//       "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80",
//     providerName: "Color Masters",
//     rating: 4.8,
//     reviewCount: 145,
//     location: "Sylhet",
//     duration: "1-2 days",
//     isAvailable: true,
//     description:
//       "Premium quality painting service with best materials and skilled painters.",
//   },
//   {
//     _id: "6",
//     title: "Custom Furniture & Carpentry",
//     category: "Carpentry",
//     price: 2500,
//     image:
//       "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80",
//     providerName: "Wood Works BD",
//     rating: 4.5,
//     reviewCount: 43,
//     location: "Dhaka",
//     duration: "1-3 days",
//     isAvailable: true,
//     description:
//       "Custom furniture design and carpentry work for homes and offices.",
//   },
//   {
//     _id: "7",
//     title: "Bathroom Plumbing & Fitting",
//     category: "Plumbing",
//     price: 700,
//     image:
//       "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80",
//     providerName: "Hasan Plumbers",
//     rating: 4.4,
//     reviewCount: 58,
//     location: "Rajshahi",
//     duration: "2-3 hours",
//     isAvailable: true,
//     description:
//       "Complete bathroom plumbing solutions including fitting, repair and installation.",
//   },
//   {
//     _id: "8",
//     title: "Office Cleaning & Sanitization",
//     category: "Cleaning",
//     price: 2000,
//     image:
//       "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80",
//     providerName: "Office Clean Pro",
//     rating: 4.9,
//     reviewCount: 178,
//     location: "Dhaka",
//     duration: "3-5 hours",
//     isAvailable: true,
//     description:
//       "Professional office cleaning and sanitization services for a healthy workplace.",
//   },
// ];

const CATEGORIES = [
  { label: "All", icon: FiGrid, value: "all" },
  { label: "Plumbing", icon: MdPlumbing, value: "plumbing" },
  { label: "Electrical", icon: MdElectricBolt, value: "electrical" },
  { label: "Cleaning", icon: MdCleaningServices, value: "cleaning" },
  { label: "AC Repair", icon: MdAcUnit, value: "ac repair" },
  { label: "Painting", icon: MdFormatPaint, value: "painting" },
  { label: "Carpentry", icon: MdBuild, value: "carpentry" },
];

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rated", value: "rating" },
];

// ── Component ──────────────────────────────────────

const AllServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [showFilter, setShowFilter] = useState(false); //

  // URL থেকে category নাও (Home থেকে click করলে আসে)
  const activeCategory = searchParams.get("category") || "all";

  const setCategory = (value) => {
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  // Filter + Search + Sort একসাথে
  const filteredServices = useMemo(() => {
    let result = [...DUMMY_SERVICES];

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter(
        (s) => s.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    // Search filter
    if (search.trim()) {
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.category.toLowerCase().includes(search.toLowerCase()) ||
          s.providerName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Sort
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, search, sortBy]);

  usePageTitle("All Services - Home Service Management");// Custom hook to set page title (SEO এর জন্য ভালো, এবং user experience এর জন্যও ভালো)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Page Header ── */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-3">Our Services</h1>
          <p className="text-blue-100 text-lg mb-8">
            Find the perfect service provider for your home needs
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services, providers..."
              className="w-full h-14 pl-12 pr-12 rounded-2xl border-0 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ── Category Tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map(({ label, icon: Icon, value }) => (
            <button
              key={value}
              onClick={() => setCategory(value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === value
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between mb-6">
          {/* Result count */}
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-gray-900">
              {filteredServices.length}
            </span>{" "}
            services found
          </p>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-3 text-sm border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SORT_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                <FiGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                <FiList size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Services Grid/List ── */}
        {filteredServices.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <FiSearch size={32} className="text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No services found
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
