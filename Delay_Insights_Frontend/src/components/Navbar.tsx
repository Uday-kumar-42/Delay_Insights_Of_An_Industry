import { useState } from "react";
import { NavLink } from "react-router-dom";
import { X, Menu, ChartBar, User, LogOut } from "lucide-react";
import { Home } from "lucide-react";
import { Info } from "lucide-react";
import { LogIn } from "lucide-react";
import { LinkElement } from "./ui/LinkElement";
import vsp_logo from "../assets/logo.webp";
import { useDispatch, useSelector } from "react-redux";
import { type ActionDispatch, type RootState } from "../store/store";
import axios from "axios";
import { clearEmployee } from "../store/employeeSlice";
import { toast, ToastContainer } from "react-toastify";

interface NavbarProps {
  variant: "primary" | "secondary";
}

const text = {
  primary: "text-black",
  secondary: "text-white",
};
const background = {
  primary: "bg-neutral-100",
  secondary: "bg-white/10 backdrop-blur-[8px]",
};

const Navbar = (props: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const employee = useSelector((state: RootState) => state.employee);
  const dispatch = useDispatch<ActionDispatch>();

  async function handleSignOut() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signout",
        {
          withCredentials: true,
        }
      );
 
      if (response.status === 200) {
        localStorage.clear();
        dispatch(clearEmployee());
      }
    } catch (error) {
      console.log("Error while signing out", error);
      toast.error("Error while signing out", {
        position: "bottom-right",
        autoClose: 1500,
        theme: "dark",
        draggable: true,
      });
    }
  }

  return (
    <nav className="z-50 shadow-md fixed top-0 w-full">
      <ToastContainer />
      <div
        className={`flex items-center justify-between md:px-6 lg:px-14 px-3 py-4 md:py-0 bg-white/10 backdrop-blur-[15px] ${
          background[props.variant]
        }`}
      >
        <div className="flex items-center gap-2">
          <img
            src={vsp_logo}
            alt="VSP Logo"
            className="h-8 w-8 object-contain rounded-[50%]"
          />
          <span className={`text-lg font-bold ${text[props.variant]}`}>
            Delay Management System
          </span>
        </div>

        <div
          className={`hidden md:flex md:gap-4 lg:gap-8 items-center font-medium text-sm md:text-base ${
            text[props.variant]
          }`}
        >
          <NavLink
            to="/"
            className={({ isActive }) => `relative py-5 ${
              props.variant === "secondary" ? "text-white" : ""
            } hover:text-yellow-400 transition-all duration-250 group
            ${isActive ? "text-yellow-400" : ""}`}
          >
            <span className="flex  items-center gap-1">
              <Home /> Home
            </span>
            <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `relative py-5 ${
              props.variant === "secondary" ? "text-white" : ""
            } hover:text-yellow-400 transition-all duration-250 group
              ${isActive ? "text-yellow-400" : ""}`}
          >
            <span className="flex  items-center gap-1">
              <Info /> About
            </span>
            <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `relative py-5 ${
              props.variant === "secondary" ? "text-white" : ""
            } hover:text-yellow-400 transition-all duration-250 group
              ${isActive ? "text-yellow-400" : ""}`}
          >
            <span className="flex  items-center gap-1">
              <ChartBar /> Dashboard
            </span>
            <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => `relative py-5 ${
              props.variant === "secondary" ? "text-white" : ""
            } hover:text-yellow-400 transition-all duration-250 group
              ${isActive ? "text-yellow-400" : ""}`}
          >
            <span className="flex items-center gap-1">
              <User /> Profile
            </span>
            <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>

          {!employee.isAuthenticated ? (
            <NavLink to="/signin">
              <button
                className={`py-[7px] px-4 bg-yellow-400 rounded-[10px] 
              ${props.variant === "secondary" ? "text-white" : ""}
                 font-semibold text-neutral-800 hover:bg-yellow-500 hover:drop-shadow-md transition-all duration-250`}
              >
                Signin
              </button>
            </NavLink>
          ) : (
            <button
              onClick={handleSignOut}
              className={`py-[7px] px-4 border-2 border-neutral-400 rounded-[10px]  
                ${props.variant === "secondary" ? "text-white" : ""}
                font-semibold text-neutral-800 hover:bg-neutral-300 hover:border-neutral-300 hover:text-neutral-900 hover:drop-shadow-md transition-all duration-250`}
            >
              Signout
            </button>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <Menu className={`w-6 h-6 ${text[props.variant]}`} />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 ${
          background[props.variant]
        } ${text[props.variant]} transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={closeMenu}>
            <X className={`w-6 h-6 ${text[props.variant]}`} />
          </button>
        </div>
        <div className={`flex flex-col ${text[props.variant]}`}>
          <LinkElement
            text="Home"
            link="/"
            icon={<Home />}
            variant={props.variant}
          />
          <LinkElement
            text="About"
            link="/about"
            icon={<Info />}
            variant={props.variant}
          />

          <LinkElement
            text="Dashboard"
            link="/dashboard"
            icon={<ChartBar />}
            variant={props.variant}
          />
          <LinkElement
            text="Profile"
            link="/profile"
            icon={<User />}
            variant={props.variant}
          />
          {!employee.isAuthenticated ? (
            <LinkElement
              text="Signin"
              link="/signin"
              icon={<LogIn />}
              variant={props.variant}
            />
          ) : (
            <button
              onClick={handleSignOut}
              className={`w-2/3 py-[7px] px-4 border-2 border-neutral-400 rounded-[10px] mx-auto flex items-center gap-2 justify-center
              ${props.variant === "secondary" ? "text-white" : ""}
              font-semibold text-neutral-800 hover:bg-neutral-300 hover:border-neutral-300 hover:text-neutral-900 hover:drop-shadow-md transition-all duration-250`}
            >
              <span>
                <LogOut className="w-5 h-5" />
              </span>
              Signout
            </button>
          )}
        </div>
      </div>

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
