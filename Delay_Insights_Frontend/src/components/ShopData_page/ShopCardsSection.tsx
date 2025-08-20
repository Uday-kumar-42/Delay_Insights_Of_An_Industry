import axios from "axios";
import React, { useEffect, useState } from "react";
import ShopCard from "./shopCard";
import SkeletonCard from "../SkeletonCard";
import {
  Factory,
  Flame,
  Hammer,
  HardHat,
  Wrench,
  type LucideProps,
} from "lucide-react";

const iconSet = [
  { icon: HardHat, color: "bg-yellow-100 text-yellow-700" },
  { icon: Factory, color: "bg-blue-100 text-blue-700" },
  { icon: Hammer, color: "bg-gray-100 text-gray-700" },
  { icon: Wrench, color: "bg-green-100 text-green-700" },
  { icon: Flame, color: "bg-red-100 text-red-700" },
];

interface MasterShopDataItem {
  shop_code: number;
  shop: string;
  abbreviation: string;
  total_delays: number;
  downtime: string;
  eqpts: string[];
  iconComponent: IconComponent;
}

interface IconComponent {
  icon: React.ComponentType<LucideProps>;
  color: string;
}

interface ShopDataItem {
  shop_code: number;
  shop: string;
  abbreviation: string;
}

interface DelayDataItem {
  shop_code: number;
  total_delays: number;
  downtime: string;
}

interface ShopEqptMapItem {
  shop_code: number;
  eqpt: string;
}

const ShopCardsSection = () => {
  const [masterShopData, setMasterShopData] = useState<MasterShopDataItem[]>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    async function fetchShopWiseData() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:5000/api/shop-data/fetch-shop-wise-data",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        console.log(response.data);
        const mergedData: MasterShopDataItem[] = updateMasterData(
          response.data.shop_data,
          response.data.delay_shop_data,
          response.data.shop_eqpt_map
        );

        const filteredData = mergedData.map((s) => {
          return {
            shop_code: s.shop_code,
            shop: s.shop,
            eqpts: s.eqpts,
          };
        });

        setMasterShopData(mergedData);
        sessionStorage.setItem("shopData", JSON.stringify(filteredData));
        setStatus("success");
      } catch (err) {
        console.error("Error fetching shop wise data:", err);
        setStatus("error");
      }
    }
    fetchShopWiseData();
  }, []);

  function updateMasterData(
    shop_data: ShopDataItem[],
    delay_shop_data: DelayDataItem[],
    shop_eqpt_map: ShopEqptMapItem[]
  ) {
    const delayDataMap = new Map(delay_shop_data.map((d) => [d.shop_code, d]));

    const eqptMap = new Map<number, string[]>();
    shop_eqpt_map.forEach(({ shop_code, eqpt }) => {
      if (!eqptMap.has(shop_code)) eqptMap.set(shop_code, []);
      eqptMap.get(shop_code)?.push(eqpt);
    });

    return shop_data.map((s) => {
      const delayInfo = delayDataMap.get(s.shop_code);
      const eqpts = eqptMap.get(s.shop_code) || [];
      const iconComponent = iconSet[Math.floor(Math.random() * iconSet.length)];

      return {
        shop_code: s.shop_code,
        shop: s.shop,
        abbreviation: s.abbreviation,
        total_delays: delayInfo?.total_delays ?? 0,
        downtime: delayInfo?.downtime ?? "0.00",
        eqpts: eqpts,
        iconComponent,
      };
    });
  }

  return (
    <section className="lg:px-4 py-4 space-y-12 mx-auto">
      <h2 className="text-3xl font-semibold text-yellow-700 text-center">
        Shop Wise Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
        {status === "loading" &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {status === "error" && (
          <div className="col-span-full text-center text-red-500 font-medium text-lg">
            Failed to load shop data. Please try again.
          </div>
        )}

        {status === "success" &&
          masterShopData?.map((shopItem) => (
            <ShopCard key={shopItem.shop_code} shop_data={shopItem} />
          ))}
      </div>
    </section>
  );
};

export default ShopCardsSection;
