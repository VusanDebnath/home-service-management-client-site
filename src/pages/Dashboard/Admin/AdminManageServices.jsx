import { useState } from "react";
import { FiSearch, FiX, FiCheck, FiTrash2, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";
import { ADMIN_SERVICES } from "../../../data/admin.data";

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
];

const AdminManageServices = () => {
  const [services, setServices] = useState(ADMIN_SERVICES);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((s) => {
    const matchTab =
      activeTab === "all" ||
      (activeTab === "approved" && s.isApproved) ||
      (activeTab === "pending" && !s.isApproved);
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.providerName.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleApprove = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isApproved: true } : s)),
    );
    toast.success("Service approved! ✅");
    // Backend হলে: await axiosSecure.patch(`/services/${id}/approve`)
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success("Service deleted!");
    // Backend হলে: await axiosSecure.delete(`/services/${id}`)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
        <p className="text-gray-500 text-sm mt-1">
          Approve or remove service listings
        </p>
      </div>

      {/* Search + Tabs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services or providers..."
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

        <div className="flex gap-2">
          {STATUS_TABS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
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
                  ? services.length
                  : value === "approved"
                    ? services.filter((s) => s.isApproved).length
                    : services.filter((s) => !s.isApproved).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow ${
              !service.isApproved ? "border-yellow-200" : "border-gray-100"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-sm">
                    {service.title}
                  </h3>
                  {!service.isApproved && (
                    <span className="flex-shrink-0 px-2.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                      ⏳ Pending
                    </span>
                  )}
                  {service.isApproved && (
                    <span className="flex-shrink-0 px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      ✓ Approved
                    </span>
                  )}
                </div>

                <p className="text-gray-500 text-xs mb-2">
                  by{" "}
                  <span className="font-medium text-gray-700">
                    {service.providerName}
                  </span>{" "}
                  · {service.providerEmail}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                    {service.category}
                  </span>
                  <span className="font-semibold text-blue-600">
                    ৳{service.price}
                  </span>
                  {service.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <FiStar
                        size={11}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      {service.rating} ({service.totalBookings} bookings)
                    </span>
                  )}
                  <span>Added: {service.createdAt}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {!service.isApproved && (
                  <button
                    onClick={() => handleApprove(service.id)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-600 border border-green-200 text-xs font-semibold rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <FiCheck size={13} />
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-xl hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
            <p className="text-gray-400 text-sm">No services found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageServices;
