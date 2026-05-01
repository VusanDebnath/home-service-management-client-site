import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const ProviderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  // এখনো check হচ্ছে, wait করো
  if (loading) {
    return <Loader fullScreen />;
  }

  // user নেই অথবা role provider না
  if (!user || user.role !== "provider") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProviderRoute;
