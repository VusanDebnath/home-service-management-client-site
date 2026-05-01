import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  // এখনো check হচ্ছে, wait করো
  if (loading) {
    return <Loader fullScreen />;
  }

  // user নেই অথবা role admin না
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
