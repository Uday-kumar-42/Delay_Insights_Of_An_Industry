import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import EmptyShopSelection from "../EmptyShopSlection";
import { DatabaseZap, Loader2 } from "lucide-react";
import ShopTableLayout from "./ShopTableLayout";
import axios from "axios";

interface ShopDataItem {
  shop_code: number;
  shop: string;
  eqpts: string[];
}

interface TableDataItem {
  shop: string;
  eqpt: string;
  sub_eqpt: string | null;
  descr: string;
  delay_code: number | null;
  eff_durn: string;
}

const ShopDataView = () => {
  const location = useLocation();

  const selectedShops = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const selectedParam = query.get("selected") || "";
    return selectedParam.split(",").filter(Boolean);
  }, [location.search]);

  const [relatedEqpts, setRelatedEqpts] = useState<string[]>([]);
  const [selectedEqpts, setSelectedEqpts] = useState<string[]>([]);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [fetchStatus, setFetchStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [lastFetchedEqpts, setLastFetchedEqpts] = useState<string[]>([]);

  async function fetchSelectedShopsData() {
    try {
      setFetchStatus("loading");
      const token = localStorage.getItem("jwtToken");
      const shopsQueryString = selectedShops
        .map((shop) => `shops=${encodeURIComponent(shop)}`)
        .join("&");

      const eqptQueryString = selectedEqpts
        .map((eqpt) => `eqpts=${encodeURIComponent(eqpt)}`)
        .join("&");

      const queryString = [shopsQueryString, eqptQueryString]
        .filter(Boolean)
        .join("&");

      const response = await axios.get(
        `http://localhost:5000/api/shop-data/fetch-selected-shop-data?${queryString}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log(response.data.shop_data);
      setTableData(response.data.shop_data || []);
      setLastFetchedEqpts(selectedEqpts);
      setFetchStatus("success");
    } catch (err) {
      console.error("Error fetching shop list:", err);
      setFetchStatus("error");
    }
  }

  function handleReFetch() {
    const isSame =
      lastFetchedEqpts.length === selectedEqpts.length &&
      lastFetchedEqpts.every((eqpt) => selectedEqpts.includes(eqpt));
    if (!isSame) {
      fetchSelectedShopsData();
    }
  }

  function checkPrevious() {
    const isSame =
      lastFetchedEqpts.length === selectedEqpts.length &&
      lastFetchedEqpts.every((eqpt) => selectedEqpts.includes(eqpt));
    return isSame;
  }

  useEffect(() => {
    fetchSelectedShopsData();
  }, []);

  useEffect(() => {
    try {
      const rawData = sessionStorage.getItem("shopData");
      if (!rawData) {
        console.warn("No shopData found in sessionStorage.");
        return;
      }

      const parsedData: ShopDataItem[] = JSON.parse(rawData);

      const eqptSet = new Set<string>();
      parsedData.forEach((shop) => {
        if (selectedShops.includes(shop.shop)) {
          shop.eqpts.forEach((eqpt) => eqptSet.add(eqpt));
        }
      });

      const eqptArray = Array.from(eqptSet);
      setRelatedEqpts((prev) => {
        const same =
          prev.length === eqptArray.length &&
          prev.every((e) => eqptArray.includes(e));
        return same ? prev : eqptArray;
      });
    } catch (error) {
      console.error("Error parsing shopData from sessionStorage:", error);
    }
  }, [selectedShops]);

  const toggleEqptSelection = (eqpt: string) => {
    setSelectedEqpts((prev) =>
      prev.includes(eqpt) ? prev.filter((e) => e !== eqpt) : [...prev, eqpt]
    );
  };

  if (!selectedShops.length) return <EmptyShopSelection variant="shop" />;

  return (
    <div className="p-4 md:p-8 pt-20 space-y-4 ">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-4 mb-10">
        <div className="md:w-[25%] w-full bg-white p-4 rounded-xl shadow  border border-neutral-200">
          <h3 className="text-xl font-semibold text-yellow-700 mb-6 ">
            Selected Shops
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedShops.map((shop, idx) => (
              <span
                key={idx}
                className="bg-yellow-200 text-yellow-900 font-medium px-3 py-1 rounded-full text-sm border border-yellow-400"
              >
                {shop}
              </span>
            ))}
          </div>
        </div>

        <div className="md:w-[75%] w-full bg-white p-4 rounded-xl border border-neutral-200 shadow">
          <div className="flex items-start justify-between w-full mb-4">
            <h3 className="text-xl font-semibold text-yellow-700">
              Select Equipments
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
            {relatedEqpts.map((eqpt, idx) => (
              <button
                key={idx}
                onClick={() => toggleEqptSelection(eqpt)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 font-medium border shadow-sm ${
                  selectedEqpts.includes(eqpt)
                    ? "bg-orange-300 text-yellow-900 border-orange-400"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {eqpt}
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

      {fetchStatus === "success" && <ShopTableLayout data={tableData} />}
    </div>
  );
};

export default ShopDataView;
