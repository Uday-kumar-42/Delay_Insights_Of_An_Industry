import { Link } from "react-router-dom";
import { ShieldCheck, Info, HelpCircle } from "lucide-react";
import vsp_logo from "../assets/logo.webp";

export const Footer = () => {
  return (
    <footer className="bg-slate-100 text-black py-10 px-6 md:px-20 mt-10 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={vsp_logo}
              alt="VSP Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-lg">Delay Management</span>
          </div>
          <p className="text-sm text-gray-600">
            Optimizing operational efficiency across steel plant departments
            through smart delay tracking and analytics.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-yellow-500">Product</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link
                to="/features"
                className="hover:text-yellow-500 hover:underline transition-all duration-150"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-yellow-500 hover:underline transition-all duration-150"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/query"
                className="hover:text-yellow-500 hover:underline transition-all duration-150"
              >
                Query Tool
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-yellow-500">Company</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-500 hover:underline transition-all duration-150"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-yellow-500 hover:underline transition-all duration-150"
              >
                Your Profile
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="hover:text-yellow-500 hover:underline transition-all duration-150"
              >
                Signin
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-yellow-500">Support</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <Link to="/help" className="hover:text-yellow-500 ">
                Help Center
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <Link to="/contact" className="hover:text-yellow-500">
                Contact Us
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <Link to="/security" className="hover:text-yellow-500">
                Security
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} VSP Delay Management System. All rights
        reserved.
      </div>
    </footer>
  );
};
