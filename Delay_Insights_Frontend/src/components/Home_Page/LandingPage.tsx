import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import background_image from "../../assets/landing_2.jpeg";
import { useEffect } from "react";
import axios from "axios";
import { setEmployeeName } from "../../store/employeeSlice";
import { useDispatch } from "react-redux";
import type { ActionDispatch } from "../../store/store";

const LandingPage = () => {
  const dispatch = useDispatch<ActionDispatch>();
  useEffect(() => {
    async function verifyAuthentication() {
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          throw new Error("No Authentication token");
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/protected",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        const data = response.data;

        if (response.status === 201) {
          const { emp_name, shop_code } = data.loggedInUser;
          dispatch(setEmployeeName({ emp_name, shop_code }));
        }
      } catch (error) {
        console.log("Error while authenticating", error);
      }
    }

    verifyAuthentication();
  });

  return (
    <div className=" relative text-white bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src={background_image}
          alt="Steel Plant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      {/* Navbar */}
      <Navbar variant="secondary" />

      {/* main content */}
      <header className="relative z-10 flex flex-col justify-center items-start px-6 sm:px-12 md:px-24 pt-24 pb-12 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-4xl">
          Vizag Steel –{" "}
          <span className="text-yellow-400">Pride of Indian Steel</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-2xl text-gray-200">
          Welcome to the Delay Management System of Vizag Steel Plant. Track,
          manage, and resolve operational delays efficiently with real-time
          insights and streamlined processes.
        </p>
        <div className="mt-8">
          <Link
            to="/signin"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
