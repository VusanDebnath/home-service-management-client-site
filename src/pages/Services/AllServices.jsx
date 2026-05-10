import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiSearch, FiX, FiGrid, FiList } from "react-icons/fi";
import {
  MdPlumbing,
  MdElectricBolt,
  MdCleaningServices,
  MdAcUnit,
  MdFormatPaint,
  MdBuild,
} from "react-icons/md";
import toast from "react-hot-toast";
import { axiosPublic } from "../../utils/axios";
import ServiceCard from "../../components/home/ServiceCard";
import usePageTitle from "../../hooks/usePageTitle";

const CATEGORIES = [
  { label: "All", icon: FiGrid, value: "all" },
  { label: "Plumbing", icon: MdPlumbing, value: "Plumbing" },
  { label: "Electrical", icon: MdElectricBolt, value: "Electrical" },
  { label: "Cleaning", icon: MdCleaningServices, value: "Cleaning" },
  { label: "AC Repair", icon: MdAcUnit, value: "AC Repair" },
  { label: "Painting", icon: MdFormatPaint, value: "Painting" },
  { label: "Carpentry", icon: MdBuild, value: "Carpentry" },
];

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rated", value: "rating" },
];

const AllServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageTitle("All Services");

  const activeCategory = searchParams.get("category") || "all";

  const setCategory = (value) => {
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  // API থেকে services নাও
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory !== "all") params.category = activeCategory;
        if (search.trim()) params.search = search;
        if (sortBy !== "popular") params.sort = sortBy;

        const res = await axiosPublic.get("/services", { params });
        setServices(res.data.services || []);
      } catch (err) {
        toast.error("Failed to load services.");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    // 300ms debounce — search typing এ বারবার call না হয়
    const timer = setTimeout(fetchServices, 300);
    return () => clearTimeout(timer);
  }, [activeCategory, search, sortBy]);

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
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-gray-900">
              {services.length}
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
        {loading ? (
          /* Loading State */
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : services.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {services.map((service) => (
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
              Try adjusting your search or filter.
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
