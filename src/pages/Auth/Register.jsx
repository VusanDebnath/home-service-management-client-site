import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { MdHomeRepairService } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { axiosPublic } from "../../utils/axios";

// Reusable Input Component
const InputField = ({ icon: Icon, error, rightElement, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
      <Icon size={15} className={error ? "text-red-400" : "text-gray-400"} />
    </div>
    <input
      {...props}
      className={`
        w-full h-11 pl-10 pr-10 text-sm rounded-lg border outline-none transition-all duration-200
        placeholder:text-gray-400 text-gray-800
        ${
          error
            ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }
      `}
    />
    {rightElement && (
      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
        {rightElement}
      </div>
    )}
  </div>
);

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      login(res.data.token);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex w-[55%] bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 flex-col p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-white/5 rounded-full" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
            <MdHomeRepairService className="text-blue-600 text-xl" />
          </div>
          <span className="text-white font-bold text-xl">HomeService</span>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center relative z-10 py-12 ml-4">
          <h2 className="text-5xl font-bold text-white leading-tight mb-4">
            Your home,
            <br />
            perfectly
            <br />
            maintained.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
            Connect with trusted service providers for all your home needs —
            fast, easy, and reliable.
          </p>

          {/* Stats */}
          <div className="flex gap-10 mt-10">
            {[
              ["500+", "Service Providers"],
              ["10k+", "Happy Customers"],
              ["4.9★", "Average Rating"],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="text-3xl font-bold text-white">{val}</p>
                <p className="text-blue-200 text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {[
              "Plumbing",
              "Cleaning",
              "Electrical",
              "AC Repair",
              "Painting",
            ].map((s) => (
              <span
                key={s}
                className="px-3 py-1 bg-white/20 text-white text-sm rounded-full backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-blue-200 text-sm relative z-10">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-semibold underline underline-offset-2"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-[45%] flex items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <MdHomeRepairService className="text-white text-lg" />
            </div>
            <span className="font-bold text-gray-800 text-lg">HomeService</span>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
            <p className="text-gray-500 text-sm mt-1">
              Get started in less than a minute
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <InputField
                icon={FiUser}
                error={errors.name}
                type="text"
                placeholder="MR. Name"
                {...register("name", {
                  required: "Full name is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  ⚠ {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <InputField
                icon={FiMail}
                error={errors.email}
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  ⚠ {errors.email.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                I want to
              </label>
              <div className="relative">
                <select
                  className={`
                    w-full h-11 pl-4 pr-10 text-sm rounded-lg border outline-none appearance-none
                    transition-all duration-200 bg-white
                    ${
                      errors.role
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100 text-gray-800"
                        : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800"
                    }
                  `}
                  {...register("role", { required: "Please select a role" })}
                >
                  <option value="">-- Select your role --</option>
                  <option value="customer">Book Services (Customer)</option>
                  <option value="provider">Provide Services (Provider)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                  <FiChevronDown size={15} className="text-gray-400" />
                </div>
              </div>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">
                  ⚠ {errors.role.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <InputField
                icon={FiLock}
                error={errors.password}
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? (
                      <FiEyeOff size={15} />
                    ) : (
                      <FiEye size={15} />
                    )}
                  </button>
                }
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])/,
                    message: "Must include 1 uppercase & 1 number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  ⚠ {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <InputField
                icon={FiLock}
                error={errors.confirmPassword}
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                }
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  ⚠ {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md shadow-blue-200 hover:shadow-lg mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-5 lg:hidden">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
