import axios from "axios";
import React, { useEffect, useState } from "react";
import SkeletonCard from "../SkeletonCard";
import { Factory, Flame, Hammer, HardHat, Wrench, type LucideProps } from "lucide-react";
import EqptCard from "./EqptCard";

const iconSet = [
  { icon: HardHat, color: "bg-yellow-100 text-yellow-700" },
  { icon: Factory, color: "bg-blue-100 text-blue-700" },
  { icon: Hammer, color: "bg-gray-100 text-gray-700" },
  { icon: Wrench, color: "bg-green-100 text-green-700" },
  { icon: Flame, color: "bg-red-100 text-red-700" },
];

interface MasterEqptDataItem {
  eqpt_code: number;
  eqpt: string;
  total_delays: number;
  downtime: string;
  sub_eqpts: string[];
  iconComponent: IconComponent;
}

interface IconComponent {
  icon: React.ComponentType<LucideProps>;
  color: string;
}

interface EqptDataItem {
  eqpt_code: number;
  eqpt: string;
}

interface DelayDataItem {
  eqpt_code: number;
  total_delays: number;
  downtime: string;
}

interface EqptSubEqptMapItem {
  eqpt_code: number;
  sub_eqpt: string;
}

const EqptsCardsSection = () => {
  const [masterEqptData, setMasterEqptData] = useState<MasterEqptDataItem[]>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    async function fetchEqptWiseData() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:5000/api/eqpt-data/fetch-eqpt-wise-data",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        console.log(response.data);
        const mergedData: MasterEqptDataItem[] = updateMasterData(
          response.data.eqpt_data,
          response.data.delay_eqpt_data,
          response.data.eqpt_sub_eqpt_map
        );

        const filteredData = mergedData.map((e) => {
          return {
            eqpt_code: e.eqpt_code,
            eqpt: e.eqpt,
            sub_eqpts: e.sub_eqpts,
          };
        });

        setMasterEqptData(mergedData);
        sessionStorage.setItem("eqptData", JSON.stringify(filteredData));
        setStatus("success");
      } catch (err) {
        console.error("Error fetching eqpt wise data:", err);
        setStatus("error");
      }
    }
    fetchEqptWiseData();
  }, []);

  function updateMasterData(
    eqpt_data: EqptDataItem[],
    delay_eqpt_data: DelayDataItem[],
    eqpt_sub_eqpt_map: EqptSubEqptMapItem[]
  ) {
    const delayDataMap = new Map(delay_eqpt_data.map((d) => [d.eqpt_code, d]));

    const subEqptMap = new Map<number, string[]>();
    eqpt_sub_eqpt_map.forEach(({ eqpt_code, sub_eqpt }) => {
      if (!subEqptMap.has(eqpt_code)) subEqptMap.set(eqpt_code, []);
      subEqptMap.get(eqpt_code)?.push(sub_eqpt);
    });

    return eqpt_data.map((e) => {
      const delayInfo = delayDataMap.get(e.eqpt_code);
      const sub_eqpts = subEqptMap.get(e.eqpt_code) || [];
      const iconComponent = iconSet[Math.floor(Math.random() * iconSet.length)];

      return {
        eqpt_code: e.eqpt_code,
        eqpt: e.eqpt,
        total_delays: delayInfo?.total_delays ?? 0,
        downtime: delayInfo?.downtime ?? "0.00",
        sub_eqpts: sub_eqpts,
        iconComponent,
      };
    });
  }

  return (
    <section className="lg:px-4 py-4 space-y-12 mx-auto">
      <h2 className="text-3xl font-semibold text-yellow-700 text-center">
        Eqpt Wise Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {status === "loading" &&
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

        {status === "error" && (
          <div className="col-span-full text-center text-red-500 font-medium text-lg">
            Failed to load eqpt data. Please try again.
          </div>
        )}

        {status === "success" &&
          masterEqptData?.map((eqptItem) => (
            <EqptCard key={eqptItem.eqpt_code} eqpt_data={eqptItem} />
          ))}
      </div>
    </section>
  );
};

export default EqptsCardsSection;
