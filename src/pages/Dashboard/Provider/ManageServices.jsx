import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiX,
  FiSave,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { axiosSecure } from "../../../utils/axios";
import usePageTitle from "../../../hooks/usePageTitle";

const CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "AC Repair",
  "Painting",
  "Carpentry",
];

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  usePageTitle("My Services");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/services/my/services");
      setServices(res.data.services || []);
    } catch {
      toast.error("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditService(null);
    reset({
      title: "",
      category: "",
      price: "",
      description: "",
      duration: "",
      location: "",
    });
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setEditService(service);
    reset({
      title: service.title,
      category: service.category,
      price: service.price,
      description: service.description,
      duration: service.duration,
      location: service.location,
    });
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editService) {
        await axiosSecure.patch(`/services/${editService._id}`, data);
        toast.success("Service updated! Waiting for approval.");
      } else {
        await axiosSecure.post("/services", data);
        toast.success("Service added! Waiting for admin approval.");
      }
      fetchServices();
      setShowModal(false);
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast.success("Service deleted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete!");
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      const res = await axiosSecure.patch(`/services/${id}/toggle`);
      setServices((prev) =>
        prev.map((s) => (s._id === id ? res.data.service : s)),
      );
    } catch {
      toast.error("Failed to toggle availability!");
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and update your service listings
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-200"
        >
          <FiPlus size={16} />
          Add Service
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: services.length, color: "text-blue-600" },
          {
            label: "Active",
            value: services.filter((s) => s.isAvailable && s.isApproved).length,
            color: "text-green-600",
          },
          {
            label: "Pending",
            value: services.filter((s) => !s.isApproved).length,
            color: "text-yellow-600",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center"
          >
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-gray-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Services List */}
      {services.length > 0 ? (
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {service.category}
                      </p>
                    </div>
                    {service.isApproved ? (
                      <span className="flex-shrink-0 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        ✓ Approved
                      </span>
                    ) : (
                      <span className="flex-shrink-0 px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        ⏳ Pending
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-bold text-blue-600 text-sm">
                      ৳{service.price}
                    </span>
                    {service.rating > 0 && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <FiStar
                          size={11}
                          className="text-yellow-400 fill-yellow-400"
                        />
                        {service.rating} ({service.reviewCount})
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    {/* Toggle */}
                    <button
                      onClick={() => handleToggleAvailability(service._id)}
                      disabled={!service.isApproved}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        service.isAvailable && service.isApproved
                          ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                          : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {service.isAvailable ? (
                        <>
                          <FiToggleRight size={14} /> Active
                        </>
                      ) : (
                        <>
                          <FiToggleLeft size={14} /> Inactive
                        </>
                      )}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(service)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FiEdit2 size={13} /> Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <FiTrash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
          <p className="text-gray-400 text-sm">
            No services yet. Add your first service!
          </p>
        </div>
      )}

      {/* ── Add/Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-lg">
                {editService ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Service Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Professional Plumbing Repair"
                  className={`w-full h-11 px-4 text-sm rounded-xl border outline-none transition-all ${
                    errors.title
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  }`}
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">
                    ⚠ {errors.title.message}
                  </p>
                )}
              </div>

              {/* Category + Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    className={`w-full h-11 px-4 text-sm rounded-xl border outline-none appearance-none bg-white transition-all ${
                      errors.category
                        ? "border-red-400"
                        : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }`}
                    {...register("category", { required: "Required" })}
                  >
                    <option value="">Select</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs">
                      ⚠ {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Price (৳)
                  </label>
                  <input
                    type="number"
                    placeholder="500"
                    min="0"
                    className={`w-full h-11 px-4 text-sm rounded-xl border outline-none transition-all ${
                      errors.price
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }`}
                    {...register("price", {
                      required: "Required",
                      min: { value: 1, message: "Must be greater than 0" },
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs">
                      ⚠ {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Duration + Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="1-2 hours"
                    className="w-full h-11 px-4 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...register("duration")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Dhaka"
                    className="w-full h-11 px-4 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...register("location")}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Describe your service in detail..."
                  rows={3}
                  className={`w-full px-4 py-3 text-sm rounded-xl border outline-none resize-none transition-all ${
                    errors.description
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  }`}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    ⚠ {errors.description.message}
                  </p>
                )}
              </div>

              {/* Pending note */}
              {!editService && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                  <p className="text-yellow-700 text-xs">
                    ⚠ New services require admin approval before becoming
                    visible to customers.
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <FiSave size={14} />
                  {submitting
                    ? "Saving..."
                    : editService
                      ? "Save Changes"
                      : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
