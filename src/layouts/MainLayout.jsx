import { Outlet } from "react-router-dom";

// Navbar আর Footer পরে বানাবো
// এখন শুধু structure রাখি

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar এখানে আসবে */}
      <header className="bg-white shadow-sm h-16 flex items-center px-6">
        <span className="font-bold text-blue-600">🏠 HomeService</span>
      </header>

      {/* Page content এখানে render হবে */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer এখানে আসবে */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2025 HomeService. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
