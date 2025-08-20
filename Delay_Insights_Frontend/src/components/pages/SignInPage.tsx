import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeftIcon, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { type ActionDispatch } from "../../store/store";
import { setEmployeeName } from "../../store/employeeSlice";

export const SignIn = () => {
  const [emp_name, setEmpName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<ActionDispatch>();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    console.log("sign in ");
    console.log(emp_name, " ", password);
    setIsLoading(true);
    setErrors({});

    if (!emp_name.trim() || !password.trim()) {
      setErrors({
        ...(emp_name.trim() === "" && {
          emp_name: "Employee name is required",
        }),
        ...(password.trim() === "" && { password: "Password is required" }),
      });
      toast.error("Please fill all fields!");
      setIsLoading(false);
      return;
    }

    try {
      const requestBody = { emp_name, password };

      console.log("inside try block");
      const token = localStorage.getItem("jwtToken");

      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);

      if (response.status === 201) {
        toast.success("Signin successful..!", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark",
          draggable: true,
          onClose: () => {
            navigate("/");
          },
        });

        const { emp_name, shop_code } = data.loggedInUser;
        dispatch(setEmployeeName({ emp_name, shop_code }));

        if (data.token) {
          localStorage.setItem("jwtToken", data.token);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Invalid credentials!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "dark",
            draggable: true,
          });
        } else if (error.response?.status === 500) {
          toast.error("Internal server error!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "dark",
            draggable: true,
          });
        } else {
          toast.error("Something went wrong!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "dark",
            draggable: true,
          });
        }
      } else {
        console.error("Signin error:", error);
        toast.error("Signin error!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
          draggable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-neutral-900">
      <ToastContainer />

      {/* hero section */}
      <div className="hidden md:flex md:w-1/2 bg-neutral-300 items-start justify-center pt-24 px-6">
        <motion.div
          className="text-center text-neutral-900 max-w-md space-y-6"
          initial={{ opacity: 0, scale: 0.95, y: -40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-400 rounded-2xl py-4 px-6">
              <span className="text-3xl text-neutral-700 font-bold">DMS</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-snug">
            Welcome to DMS Portal
          </h1>
          <p className="text-lg text-neutral-700">
            Streamline delay tracking and optimize plant performance across all
            departments.
          </p>

          <div className="space-y-4 text-left">
            {[
              "Log equipment and material delays instantly",
              "Collaborate with shop and agency teams in real-time",
              "Access performance metrics and audit history anytime",
            ].map((text, index) => (
              <div className="flex items-start gap-3" key={index}>
                <div className="bg-yellow-400 text-neutral-800 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-base mt-1">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-16">
        <motion.div
          className="w-full max-w-md space-y-6"
          initial={{ opacity: 0, scale: 0.95, y: -40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center space-y-2">
            <div className="flex justify-center items-center gap-6">
              <h1 className="text-3xl font-bold">Delay Management System</h1>
            </div>
            <h2 className="text-xl md:text-2xl font-bold">
              Create your DMS account
            </h2>
            <p className="text-neutral-600 text-sm">
              Login to record, analyze and track plant delay data.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="emp_name"
                className="block text-sm font-medium mb-1"
              >
                Employee Name
              </label>
              <input
                type="text"
                id="emp_name"
                required
                value={emp_name}
                onChange={(e) => setEmpName(e.target.value)}
                placeholder="Enter employee name"
                className={`w-full rounded-md px-4 py-2 border focus:outline-none focus:ring-1 focus:ring-yellow-300 transition ${
                  errors.emp_name ? "border-red-500" : ""
                }`}
              />
              <div className="h-3 mt-1">
                {errors.emp_name && (
                  <p className="text-sm text-red-500">{errors.emp_name}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full rounded-md px-4 py-2 border focus:outline-none focus:ring-1 focus:ring-yellow-300 transition ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <div className="h-3 mt-1">
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 rounded-md font-semibold text-neutral-700 shadow-md transition-all 
                    duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center bg-yellow-400 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Signing in</span>
                    <div className="w-5 h-5 border-2 border-neutral-700 border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In <LogIn />
                  </span>
                )}
              </button>
            </div>
          </form>

          <Link to="/">
            <button
              className="w-full mt-4 bg-neutral-300 bg- text-neutral-800 rounded-md 
              py-2 h-10 flex items-center gap-2 justify-center shadow-md transition-all 
                duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <ArrowLeftIcon /> Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
