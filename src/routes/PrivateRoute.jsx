import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // এখনো check হচ্ছে, wait করো
  if (loading) {
    return <Loader fullScreen />;
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
