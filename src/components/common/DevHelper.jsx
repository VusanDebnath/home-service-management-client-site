import { useState } from "react";
import useAuth from "../../hooks/useAuth";

// ⚠️ শুধু Development এ দেখাবে
// Backend হলে এই file টা delete করবো

const TEST_USERS = [
  {
    label: "Customer",
    color: "bg-blue-600",
    user: {
      id: "1",
      name: "Vusan Debnath",
      email: "vusan@gmail.com",
      role: "customer",
    },
  },
  {
    label: "Provider",
    color: "bg-green-600",
    user: {
      id: "2",
      name: "Karim Ahmed",
      email: "karim@gmail.com",
      role: "provider",
    },
  },
  {
    label: "Admin",
    color: "bg-purple-600",
    user: {
      id: "3",
      name: "Admin User",
      email: "admin@gmail.com",
      role: "admin",
    },
  },
];

const DevHelper = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const loginAs = (testUser) => {
    // আগের data মুছো
    localStorage.removeItem("auth-storage");

    // নতুন user set করো
    localStorage.setItem(
      "auth-storage",
      JSON.stringify({
        state: {
          user: testUser,
          token: "dev-test-token",
        },
        version: 0,
      }),
    );

    // Reload করলে Zustand store update হবে
    window.location.href = "/";
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-gray-900 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center text-lg transition-all"
        title="Dev Helper"
      >
        🛠️
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute bottom-14 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-56">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Dev Helper
          </p>

          {/* Current User */}
          {user && (
            <div className="bg-gray-50 rounded-xl px-3 py-2 mb-3">
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full capitalize">
                {user.role}
              </span>
            </div>
          )}

          {/* Login Buttons */}
          <p className="text-xs text-gray-400 mb-2">Switch user:</p>
          <div className="space-y-2">
            {TEST_USERS.map(({ label, color, user: testUser }) => (
              <button
                key={label}
                onClick={() => loginAs(testUser)}
                className={`w-full py-2 ${color} hover:opacity-90 text-white text-sm font-medium rounded-xl transition-all`}
              >
                Login as {label}
              </button>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-2 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-all"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DevHelper;
