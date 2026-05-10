import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ProviderRoute from "./routes/ProviderRoute";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import AllServices from "./pages/Services/AllServices";
import ServiceDetails from "./pages/Services/ServiceDetails";

import CustomerDashboardHome from "./pages/Dashboard/Customer/CustomerDashboardHome";
import MyBookings from "./pages/Dashboard/Customer/MyBookings";
import MyProfile from "./pages/Dashboard/Customer/MyProfile";

import AdminDashboardHome from "./pages/Dashboard/Admin/AdminDashboardHome";
import AdminManageServices from "./pages/Dashboard/Admin/AdminManageServices";
import ManageBookings from "./pages/Dashboard/Admin/ManageBookings";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";

import ManageServices from "./pages/Dashboard/Provider/ManageServices";
import ProviderBookings from "./pages/Dashboard/Provider/ProviderBookings";
import ProviderDashboardHome from "./pages/Dashboard/Provider/ProviderDashboardHome";

import ErrorPage from "./pages/ErrorPage";

// ScrollToTop component, page change হলে top এ scroll করার জন্য
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  // App component mount হলে user এর authentication status check করার জন্য
  const { checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);

  // User এর role অনুযায়ী redirect করার জন্য
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      // Admin কে admin dashboard এ পাঠাও
      if (window.location.pathname.startsWith("/dashboard")) {
        navigate("/admin/dashboard");
      }
    }
  }, [user]);
  
  return (
    <>
      {/* page change হলে top এ scroll করার জন্য */}
      <ScrollToTop />

      {/* Routes */}
      <Routes>
        {/* Auth Pages — Navbar/Footer ছাড়া */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Routes — MainLayout সহ */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
        </Route>

        {/* Customer & Provider Dashboard */}
        {/* Customer Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* /dashboard → CustomerDashboardHome */}
          <Route index element={<CustomerDashboardHome />} />

          {/* /dashboard/bookings → MyBookings */}
          <Route path="bookings" element={<MyBookings />} />

          {/* /dashboard/profile → MyProfile */}
          <Route path="profile" element={<MyProfile />} />

          {/* /dashboard/provider → ProviderDashboard */}
          {/* /dashboard/provider → ProviderDashboardHome */}
          <Route
            path="provider"
            element={
              <ProviderRoute>
                <ProviderDashboardHome />
              </ProviderRoute>
            }
          />
          <Route
            path="provider/services"
            element={
              <ProviderRoute>
                <ManageServices />
              </ProviderRoute>
            }
          />
          <Route
            path="provider/bookings"
            element={
              <ProviderRoute>
                <ProviderBookings />
              </ProviderRoute>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardHome />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="services" element={<AdminManageServices />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
