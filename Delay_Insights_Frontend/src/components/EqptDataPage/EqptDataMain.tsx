import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SkeletonText2 from "../SkeletonText2";
import axios from "axios";
import EqptsCardsSection from "./EqptCardsSection";

interface eqptsListItem {
  eqpt_code: number;
  eqpt: string;
}

const EqptDataMain = () => {
  const [eqptsList, setEqptsList] = useState<eqptsListItem[]>([]);
  const [selectedEqpts, setSelectedEqpts] = useState<string[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  ); 
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(
      `/dashboard/eqpt-data/view?selected=${encodeURIComponent(
        selectedEqpts.join(",")
      )}`
    );
  };

  const toggleShop = (eqptName: string) => {
    const updated = selectedEqpts.includes(eqptName)
      ? selectedEqpts.filter((s) => s !== eqptName)
      : [...selectedEqpts, eqptName];

    setSelectedEqpts(updated);
  };

  const removeShop = (eqptName: string) => {
    setSelectedEqpts(selectedEqpts.filter((s) => s !== eqptName));
  };

  useEffect(() => {
    async function fetchEqptList() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:5000/api/eqpt-data/fetch-eqpt-list",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setEqptsList(response.data.eqpt_list_data || []);
        setStatus("success");
      } catch (err) {
        console.error("Error fetching shop list:", err);
        setStatus("error");
      }
    }
    fetchEqptList();
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-8 bg-white min-h-screen">
      <h2 className="text-3xl font-semibold text-yellow-700 text-center mt-10 sm:mt-0">
        Select Equipments
      </h2>

      {/* Shop List Section */}
      <div className="min-h-[200px] transition-all duration-300">
        {status === "loading" && <SkeletonText2 />}
        {status === "error" && (
          <div
            className="text-center text-red-500 font-semibold p-4 border border-red-300 
          w-[80%] mx-auto bg-red-50 flex items-center gap-2 justify-center rounded-lg"
          >
            <AlertTriangle /> Failed to fetch equipment list. Please try again
            later.
          </div>
        )}
        {status === "success" && eqptsList.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {eqptsList.map((eqpt) => (
              <button
                key={eqpt.eqpt_code}
                onClick={() => toggleShop(eqpt.eqpt)}
                className={`px-4 py-2 rounded-lg border text-[12px] font-medium shadow transition-all duration-200
                  ${
                    selectedEqpts.includes(eqpt.eqpt)
                      ? "bg-yellow-100 text-yellow-900 border-yellow-400"
                      : "bg-gray-50 text-gray-800 border-gray-300 hover:bg-yellow-50"
                  }`}
              >
                {eqpt.eqpt}
              </button>
            ))}
          </div>
        )}
        {status === "success" && eqptsList.length <= 0 && (
          <div className="text-center text-gray-500 italic mt-4">
            No Equipments available at the moment.
          </div>
        )}
      </div>

      {/* Selected Shops Section */}
      {eqptsList.length > 0 && (
        <div className="mt-6 w-full md:w-5/6 lg:w-3/4 border border-gray-300 bg-slate-50 shadow-md rounded-xl p-6 transition-all duration-300">
          <div className="flex items-start justify-between w-full">
            <h3 className="text-xl font-semibold text-yellow-700 ">
              Selected Euipments
            </h3>
            <div className="self-end">
              <button
                onClick={handleNavigate}
                className="bg-yellow-400 hover:bg-yellow-300 text-neutral-700 font-medium px-6 py-2 rounded-full shadow-sm transition"
              >
                View Selected
              </button>
            </div>
          </div>

          {selectedEqpts.length > 0 ? (
            <div className="flex flex-col space-y-4 transition-all duration-200">
              <div className="flex flex-wrap gap-3 transition-all duration-200">
                {selectedEqpts.map((eqpt) => (
                  <span
                    key={eqpt}
                    className="flex items-center gap-2 bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-sm border border-yellow-300 shadow-sm hover:border-red-300 transition-all duration-300 hover:bg-red-100"
                  >
                    {eqpt}
                    <button
                      onClick={() => removeShop(eqpt)}
                      className="hover:text-red-500 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">
              No eqpts selected yet. Please select from above.
            </p>
          )}
        </div>
      )}
      <EqptsCardsSection />
    </div>
  );
};

export default EqptDataMain;
