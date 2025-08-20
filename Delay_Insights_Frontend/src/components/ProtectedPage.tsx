import { useDispatch, useSelector } from "react-redux";
import { type ActionDispatch, type RootState } from "../store/store";
import { useEffect } from "react";
import {
  clearEmployee,
  setEmployeeName,
  setIsLoading,
} from "../store/employeeSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface ProtectedPageProps {
  children: React.ReactNode;
}

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const employee = useSelector((state: RootState) => state.employee);
  const dispatch = useDispatch<ActionDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAuthentication() {
      if (!employee.isAuthenticated && employee.isLoading) {
        dispatch(setIsLoading(true));

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

            toast.success("Authentication successful", {
              position: "bottom-right",
              autoClose: 3000,
              theme: "dark",
              draggable: true,
            });
          }
        } catch (error) {
          console.log(error);
          toast.error("Authentication Denied..!", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "dark",
            draggable: true,
            onClose: () => {
              toast.info("Navigating to Signin page", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "dark",
                draggable: true,
                onClose: () => {
                  dispatch(clearEmployee());
                  dispatch(setIsLoading(false));
                  navigate("/signin");
                },
              });
            },
          });
        }
      } else if (!employee.isAuthenticated && !employee.isLoading) {
        navigate("/signin");
      }
    }

    verifyAuthentication();
  }, [dispatch, employee.isAuthenticated, employee.isLoading, navigate]);

  if (employee.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ToastContainer />
        <HashLoader color="#ffcf00" speedMultiplier={1.5} />
      </div>
    );
  }

  if (!employee.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedPage;
