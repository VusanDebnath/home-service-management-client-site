import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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

import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import ProviderDashboard from "./pages/Dashboard/Provider/ProviderDashboard";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  // Dummy for test
  // const { checkAuth, login } = useAuth();

  // useEffect(() => {
  //   checkAuth();

  //   // ── Temporary: Fake login for testing ──
  //   // Real backend হলে এই অংশ delete করবো
  //   const testToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiUmFoaW0gQWhtZWQiLCJlbWFpbCI6InJhaGltQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImV4cCI6OTk5OTk5OTk5OX0.fake";

  //   // LocalStorage এ token নেই তাহলে fake token দাও
  //   if (!localStorage.getItem("token")) {
  //     login(testToken);
  //   }
  // }, []);

  return (
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
        <Route
          path="provider"
          element={
            <ProviderRoute>
              <ProviderDashboard />
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
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
