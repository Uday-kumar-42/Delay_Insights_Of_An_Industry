import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SkeletonText2 from "../SkeletonText2";
import axios from "axios";
import ShopCardsSection from "./ShopCardsSection";

interface shopsListItem {
  shop_code: number;
  shop: string;
}

const ShopDataMain = () => {
  const [shopsList, setShopsList] = useState<shopsListItem[]>([]);
  const [selectedShops, setSelectedShops] = useState<string[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(
      `/dashboard/shop-data/view?selected=${encodeURIComponent(
        selectedShops.join(",")
      )}`
    );
  };

  const toggleShop = (shopName: string) => {
    const updated = selectedShops.includes(shopName)
      ? selectedShops.filter((s) => s !== shopName)
      : [...selectedShops, shopName];

    setSelectedShops(updated);
  };

  const removeShop = (shopName: string) => {
    setSelectedShops(selectedShops.filter((s) => s !== shopName));
  };

  useEffect(() => {
    async function fetchShopList() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:5000/api/shop-data/fetch-shop-list",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setShopsList(response.data.shop_list_data || []);
        setStatus("success");
      } catch (err) {
        console.error("Error fetching shop list:", err);
        setStatus("error");
      }
    }
    fetchShopList();
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-8 bg-white min-h-screen">
      <h2 className="text-3xl font-semibold text-yellow-700 text-center mt-10 sm:mt-0">
        Select Shops
      </h2>

      {/* Shop List Section */}
      <div className="min-h-[200px] transition-all duration-300">
        {status === "loading" && <SkeletonText2 />}
        {status === "error" && (
          <div
            className="text-center text-red-500 font-semibold p-4 border border-red-300 
          w-[80%] mx-auto bg-red-50 flex items-center gap-2 justify-center rounded-lg"
          >
            <AlertTriangle /> Failed to fetch shop list. Please try again later.
          </div>
        )}
        {status === "success" && shopsList.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {shopsList.map((shop) => (
              <button
                key={shop.shop_code}
                onClick={() => toggleShop(shop.shop)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium shadow transition-all duration-200
                  ${
                    selectedShops.includes(shop.shop)
                      ? "bg-yellow-100 text-yellow-900 border-yellow-400"
                      : "bg-gray-50 text-gray-800 border-gray-300 hover:bg-yellow-50"
                  }`}
              >
                {shop.shop}
              </button>
            ))}
          </div>
        )}
        {status === "success" && shopsList.length <= 0 && (
          <div className="text-center text-gray-500 italic mt-4">
            No shops available at the moment.
          </div>
        )}
      </div>

      {/* Selected Shops Section */}
      {shopsList.length > 0 && (
        <div className="mt-6 w-full md:w-5/6 lg:w-3/4 border border-gray-300 bg-slate-50 shadow-md rounded-xl p-6 transition-all duration-300">
          <div className="flex items-start justify-between w-full">
            <h3 className="text-xl font-semibold text-yellow-700 ">
              Selected Shops
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

          {selectedShops.length > 0 ? (
            <div className="flex flex-col space-y-4 transition-all duration-200">
              <div className="flex flex-wrap gap-3 transition-all duration-200">
                {selectedShops.map((shop) => (
                  <span
                    key={shop}
                    className="flex items-center gap-2 bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-sm border border-yellow-300 shadow-sm hover:border-red-300 transition-all duration-300 hover:bg-red-100"
                  >
                    {shop}
                    <button
                      onClick={() => removeShop(shop)}
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
              No shops selected yet. Please select from above.
            </p>
          )}
        </div>
      )}
      <ShopCardsSection />
    </div>
  );
};

export default ShopDataMain;
