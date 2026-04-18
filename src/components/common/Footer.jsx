import { Link } from "react-router-dom";
import { MdHomeRepairService } from "react-icons/md";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <MdHomeRepairService className="text-white text-lg" />
              </div>
              <span className="font-bold text-white text-lg">HomeService</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Connecting homeowners with trusted service providers since 2024.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                "Plumbing",
                "Electrical",
                "Cleaning",
                "AC Repair",
                "Painting",
                "Carpentry",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="hover:text-white transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ["About Us", "/about"],
                ["How It Works", "/#how-it-works"],
                ["Become a Provider", "/register"],
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <FiMail size={14} className="text-blue-400 flex-shrink-0" />
                support@homeservice.com
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone size={14} className="text-blue-400 flex-shrink-0" />
                +880 1700 000000
              </li>
              <li className="flex items-start gap-2.5">
                <FiMapPin
                  size={14}
                  className="text-blue-400 flex-shrink-0 mt-0.5"
                />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 mt-10 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <p>© 2025 HomeService. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
