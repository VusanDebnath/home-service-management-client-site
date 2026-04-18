import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mt-4">
        Page Not Found
      </p>
      <p className="text-gray-500 mt-2">তুমি যে page খুঁজছো সেটা নেই।</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Home এ ফিরে যাও
      </Link>
    </div>
  );
};

export default ErrorPage;
