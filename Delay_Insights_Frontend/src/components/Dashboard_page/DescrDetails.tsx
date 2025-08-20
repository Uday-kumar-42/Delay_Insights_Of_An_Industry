import { useEffect, useState } from "react";
import axios from "axios";
import { BarChartHorizontalBigIcon } from "lucide-react";
import Skeletontext from "../SkeletonText";
import DetailsComponent from "./DetailsComponent";

const DescrDetails = () => {
  const [data, setData] = useState<Record<string, number>[]>([]);
  const [status, setStatus] = useState<"loading" | "succeeded" | "failed">("loading");

  useEffect(() => {
    const fetchDescrData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("http://localhost:5000/api/dashboard/fetch-descr-data", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setData(response.data.data);
        setStatus("succeeded");
      } catch (err) {
        console.error("Error fetching Description data:", err);
        setStatus("failed");
      }
    };

    fetchDescrData();
    const interval = setInterval(fetchDescrData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-700 flex items-center justify-center gap-2">
          <BarChartHorizontalBigIcon className="text-orange-600 w-8 h-8" />
          Most Frequent Delays That Occur
        </h2>
      </div>
      <div className="relative min-h-[300px]">
        {status !== "succeeded" && <Skeletontext />}
        {status === "succeeded" && <DetailsComponent data={data} variant="descr" />}
        {status === "failed" && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-white bg-opacity-80 rounded-lg">
            Failed to load graph data. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default DescrDetails;
