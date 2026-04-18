import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProviderRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // user নেই অথবা role provider না
  if (!user || user.role !== "provider") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProviderRoute;
