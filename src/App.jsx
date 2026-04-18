import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import ProviderRoute from "./routes/ProviderRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AllServices from "./pages/Services/AllServices";
import ServiceDetails from "./pages/Services/ServiceDetails";
import CustomerDashboard from "./pages/Dashboard/Customer/CustomerDashboard";
import ProviderDashboard from "./pages/Dashboard/Provider/ProviderDashboard";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

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
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
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
