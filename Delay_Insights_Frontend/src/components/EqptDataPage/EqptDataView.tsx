import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import EmptyShopSelection from "../EmptyShopSlection";
import { DatabaseZap, Loader2 } from "lucide-react";
import axios from "axios";
import EqptTableLayout from "./EqptTableLayout";

interface EqptDataItem {
  eqpt_code: number;
  eqpt: string;
  sub_eqpts: string[];
}

interface TableDataItem {
  eqpt: string;
  sub_eqpt: string | null;
  descr: string;
  delay_code: number | null;
  eff_durn: string;
}

const EqptDataView = () => {
  const location = useLocation();

  const selectedEqpts = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const selectedParam = query.get("selected") || "";
    return selectedParam.split(",").filter(Boolean);
  }, [location.search]);

  const [relatedSubEqpts, setRelatedSubEqpts] = useState<string[]>([]);
  const [selectedSubEqpts, setSelectedSubEqpts] = useState<string[]>([]);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [fetchStatus, setFetchStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [lastFetchedSubEqpts, setLastFetchedSubEqpts] = useState<string[]>([]);

  async function fetchSelectedEqptsData() {
    try {
      setFetchStatus("loading");
      const token = localStorage.getItem("jwtToken");
      const eqptQueryString = selectedEqpts
        .map((eqpt) => `eqpts=${encodeURIComponent(eqpt)}`)
        .join("&");

      const subEqptQueryString = selectedSubEqpts
        .map((sub_eqpt) => `sub_eqpts=${encodeURIComponent(sub_eqpt)}`)
        .join("&");

      const queryString = [eqptQueryString, subEqptQueryString]
        .filter(Boolean)
        .join("&");

      const response = await axios.get(
        `http://localhost:5000/api/eqpt-data/fetch-selected-eqpt-data?${queryString}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log(response.data.eqpt_data);
      setTableData(response.data.eqpt_data || []);
      setLastFetchedSubEqpts(selectedSubEqpts);
      setFetchStatus("success");
    } catch (err) {
      console.error("Error fetching shop list:", err);
      setFetchStatus("error");
    }
  }

  function handleReFetch() {
    const isSame =
      lastFetchedSubEqpts.length === selectedSubEqpts.length &&
      lastFetchedSubEqpts.every((sub_eqpt) =>
        selectedSubEqpts.includes(sub_eqpt)
      );
    if (!isSame) {
      fetchSelectedEqptsData();
    }
  }

  function checkPrevious() {
    const isSame =
      lastFetchedSubEqpts.length === selectedSubEqpts.length &&
      lastFetchedSubEqpts.every((sub_eqpt) =>
        selectedSubEqpts.includes(sub_eqpt)
      );
    return isSame;
  }

  useEffect(() => {
    fetchSelectedEqptsData();
  }, []);

  useEffect(() => {
    try {
      const rawData = sessionStorage.getItem("eqptData");
      if (!rawData) {
        console.warn("No eqptData found in sessionStorage.");
        return;
      }

      const parsedData: EqptDataItem[] = JSON.parse(rawData);

      const subEqptSet = new Set<string>();
      parsedData.forEach((eqpt) => {
        if (selectedEqpts.includes(eqpt.eqpt)) {
          eqpt.sub_eqpts.forEach((sub_eqpt) => subEqptSet.add(sub_eqpt));
        }
      });

      const subEqptArray = Array.from(subEqptSet);
      setRelatedSubEqpts((prev) => {
        const same =
          prev.length === subEqptArray.length &&
          prev.every((e) => subEqptArray.includes(e));
        return same ? prev : subEqptArray;
      });
    } catch (error) {
      console.error("Error parsing shopData from sessionStorage:", error);
    }
  }, [selectedEqpts]);

  const toggleSubEqptSelection = (sub_eqpt: string) => {
    setSelectedSubEqpts((prev) =>
      prev.includes(sub_eqpt)
        ? prev.filter((s) => s !== sub_eqpt)
        : [...prev, sub_eqpt]
    );
  };

  if (!selectedEqpts.length) return <EmptyShopSelection variant="eqpt" />;

  return (
    <div className="p-4 md:p-8 pt-20 space-y-4 ">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-4 mb-10">
        <div className="md:w-[25%] w-full bg-white p-4 rounded-xl shadow  border border-neutral-200">
          <h3 className="text-xl font-semibold text-yellow-700 mb-6 ">
            Selected Eqpts
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedEqpts.map((eqpt, idx) => (
              <span
                key={idx}
                className="bg-yellow-200 text-yellow-900 font-medium px-3 py-1 rounded-full text-sm border border-yellow-400"
              >
                {eqpt}
              </span>
            ))}
          </div>
        </div>

        <div className="md:w-[75%] w-full bg-white p-4 rounded-xl border border-neutral-200 shadow">
          <div className="flex items-start justify-between w-full mb-4">
            <h3 className="text-xl font-semibold text-yellow-700">
              Select Sub-Equipments
            </h3>
            <div className="h-10">
              {!checkPrevious() && (
                <button
                  onClick={handleReFetch}
                  disabled={fetchStatus === "loading"}
                  className={`${
                    fetchStatus === "loading"
                      ? "bg-yellow-300 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-300"
                  } 
                text-neutral-700 font-medium px-3 md:px-4 py-2 rounded-full shadow-sm 
                transition flex items-center justify-center gap-2 min-w-[110px]`}
                >
                  {fetchStatus === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Fetching...
                    </>
                  ) : (
                    <>
                      <DatabaseZap className="w-5 h-5" />
                      Re-Fetch
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {relatedSubEqpts.map((sub_eqpt, idx) => (
              <button
                key={idx}
                onClick={() => toggleSubEqptSelection(sub_eqpt)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 font-medium border shadow-sm ${
                  selectedSubEqpts.includes(sub_eqpt)
                    ? "bg-orange-300 text-yellow-900 border-orange-400"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {sub_eqpt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {fetchStatus === "loading" && (
        <div className="w-full max-w-6xl mx-auto border border-gray-200 divide-y divide-gray-200 rounded-md shadow-sm animate-pulse p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between pt-2">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full w-32 mb-2.5"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full w-20"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-20"></div>
            </div>
          ))}
        </div>
      )}

      {fetchStatus === "error" && (
        <div className="w-full max-w-3xl mx-auto p-4 bg-red-100 text-red-700 rounded-md border border-red-300 text-center">
          Failed to load data. Please try again later.
        </div>
      )}

      {fetchStatus === "success" && <EqptTableLayout data={tableData} />}
    </div>
  );
};

export default EqptDataView;
