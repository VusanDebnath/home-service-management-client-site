import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiLock,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import usePageTitle from "../../../hooks/usePageTitle";
import { axiosSecure } from "../../../utils/axios";

const MyProfile = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  usePageTitle("My Profile");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const {
    register: registerPass,
    handleSubmit: handlePassSubmit,
    watch,
    reset: resetPass,
    formState: { errors: passErrors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onProfileUpdate = async (data) => {
    setSaving(true);
    try {
      await axiosSecure.patch("/users/me", {
        name: data.name,
        phone: data.phone,
        address: data.address,
      });
      toast.success("Profile updated!");
      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update!");
    } finally {
      setSaving(false);
    }
  };

  const onPasswordChange = async (data) => {
    setSaving(true);
    try {
      await axiosSecure.patch("/users/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed!");
      setChangingPassword(false);
      resetPass();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your personal information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column ── */}
        <div className="lg:col-span-1 space-y-4">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-400" />
            <div className="px-5 pb-5">
              <div className="flex justify-between items-start -mt-8 mb-3">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl border-4 border-white flex items-center justify-center shadow-md">
                  <span className="text-white text-xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`mt-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
                    editMode
                      ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {editMode ? (
                    <>
                      <FiX size={12} /> Cancel
                    </>
                  ) : (
                    <>
                      <FiEdit2 size={12} /> Edit
                    </>
                  )}
                </button>
              </div>
              <h2 className="font-bold text-gray-900 text-lg">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <span className="mt-2 inline-block text-xs bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full capitalize font-medium">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-4">
              Account Info
            </h3>
            <div className="space-y-3">
              {[
                { label: "Role", value: user?.role },
                { label: "Status", value: "Active" },
                {
                  label: "Member Since",
                  value: user?.createdAt
                    ? new Date(user.createdAt).getFullYear()
                    : "2025",
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{label}</span>
                  <span className="font-semibold text-gray-900 text-sm capitalize">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Personal Information Form */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-5">
              Personal Information
            </h3>

            <form
              onSubmit={handleSubmit(onProfileUpdate)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      disabled={!editMode}
                      className={`w-full h-11 pl-10 pr-4 text-sm rounded-xl border outline-none transition-all ${
                        editMode
                          ? "border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          : "border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                      }`}
                      {...register("name", { required: "Required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      ⚠ {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      disabled={!editMode}
                      placeholder="+880 1700 000000"
                      className={`w-full h-11 pl-10 pr-4 text-sm rounded-xl border outline-none transition-all ${
                        editMode
                          ? "border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                      }`}
                      {...register("phone")}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    disabled
                    className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed outline-none"
                    {...register("email")}
                  />
                </div>
                <p className="text-gray-400 text-xs">Email cannot be changed</p>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="relative">
                  <FiMapPin
                    size={14}
                    className="absolute left-3.5 top-3.5 text-gray-400"
                  />
                  <textarea
                    disabled={!editMode}
                    placeholder="Your home address"
                    rows={3}
                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border outline-none resize-none transition-all ${
                      editMode
                        ? "border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                    }`}
                    {...register("address")}
                  />
                </div>
              </div>

              {editMode && (
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    <FiSave size={14} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-gray-900">Password & Security</h3>
                <p className="text-gray-400 text-sm mt-0.5">
                  Keep your account secure
                </p>
              </div>
              <button
                onClick={() => setChangingPassword(!changingPassword)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  changingPassword
                    ? "bg-gray-100 text-gray-600"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                <FiLock size={14} />
                {changingPassword ? "Cancel" : "Change Password"}
              </button>
            </div>

            {changingPassword && (
              <form
                onSubmit={handlePassSubmit(onPasswordChange)}
                className="space-y-4 mt-5 pt-5 border-t border-gray-100"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Current
                    </label>
                    <input
                      type="password"
                      placeholder="Current password"
                      className="w-full h-11 px-4 text-sm rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      {...registerPass("currentPassword", {
                        required: "Required",
                      })}
                    />
                    {passErrors.currentPassword && (
                      <p className="text-red-500 text-xs">
                        ⚠ {passErrors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      New
                    </label>
                    <input
                      type="password"
                      placeholder="New password"
                      className="w-full h-11 px-4 text-sm rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      {...registerPass("newPassword", {
                        required: "Required",
                        minLength: { value: 6, message: "Min 6 characters" },
                      })}
                    />
                    {passErrors.newPassword && (
                      <p className="text-red-500 text-xs">
                        ⚠ {passErrors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Confirm
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="w-full h-11 px-4 text-sm rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      {...registerPass("confirmPassword", {
                        required: "Required",
                        validate: (v) =>
                          v === newPassword || "Passwords do not match",
                      })}
                    />
                    {passErrors.confirmPassword && (
                      <p className="text-red-500 text-xs">
                        ⚠ {passErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <FiSave size={14} />
                  {saving ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
