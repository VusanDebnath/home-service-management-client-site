import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // এখনো check হচ্ছে, wait করো
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // user নেই মানে login করেনি
  // login page এ পাঠাও, আর মনে রাখো কোথায় যেতে চেয়েছিল
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // user আছে, যেতে দাও
  return children;
};

export default PrivateRoute;
