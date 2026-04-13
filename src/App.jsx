import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">
        🏠 Home Service Management System
      </h1>
    </div>
  );
};

export default App;
