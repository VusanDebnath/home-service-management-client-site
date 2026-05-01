import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { MdHomeRepairService } from "react-icons/md";
import usePageTitle from './../hooks/usePageTitle';

const ErrorPage = () => {
  const navigate = useNavigate();

  usePageTitle("404 Not Found - Home Service Management"); // Custom hook to set page title (SEO এর জন্য ভালো, এবং user experience এর জন্যও ভালো)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 h-16 flex items-center">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <MdHomeRepairService className="text-white text-lg" />
          </div>
          <span className="font-bold text-gray-900 text-lg">HomeService</span>
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <p className="text-[10rem] font-bold text-gray-100 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <MdHomeRepairService size={32} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-center max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft size={15} />
            Go Back
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-md shadow-blue-200"
          >
            <FiHome size={15} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
