import {
  Factory,
  Flame,
  Hammer,
  HardHat,
  Wrench,
  type LucideProps,
} from "lucide-react";
import SkeletonCard from "../SkeletonCard";
import { useEffect, useState } from "react";
import axios from "axios";
import SubEqptCard from "./SubEqptCard";

const iconSet = [
  { icon: HardHat, color: "bg-yellow-100 text-yellow-700" },
  { icon: Factory, color: "bg-blue-100 text-blue-700" },
  { icon: Hammer, color: "bg-gray-100 text-gray-700" },
  { icon: Wrench, color: "bg-green-100 text-green-700" },
  { icon: Flame, color: "bg-red-100 text-red-700" },
];

interface IconComponent {
  icon: React.ComponentType<LucideProps>;
  color: string;
}

interface MatserSubEqptDataItem {
  sub_eqpt_code: number;
  sub_eqpt: string;
  shops: string[];
  eqpts: string[];
  icon: IconComponent;
}

interface SubEqptDataItem {
  sub_eqpt_code: number;
  sub_eqpt: string;
  shop: string;
  eqpt: string;
}

const SubEqptCardsSection = () => {
  const [masterSubEqptData, setMasterSubEqptData] = useState<
    MatserSubEqptDataItem[]
  >([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<MatserSubEqptDataItem[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    async function fetchSubEqptData() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:5000/api/sub-eqpt-data/fetch-sub-eqpt-wise-data",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        const finalData: MatserSubEqptDataItem[] = updateMasterData(
          response.data.sub_eqpt_data
        );

        setMasterSubEqptData(finalData);
        // setFilteredData(finalData);
        setStatus("success");
      } catch (err) {
        console.error("Error fetching shop wise data:", err);
        setStatus("error");
      }
    }
    fetchSubEqptData();
  }, []);

  useEffect(() => {
    console.log("inside useEffect");
    updateFilteredData();
  }, [searchText, masterSubEqptData]);

  function updateFilteredData() {
    if (searchText === "") {
      setFilteredData(masterSubEqptData);
    } else {
      const data = masterSubEqptData.filter((item) =>
        item.sub_eqpt.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(data);
    }
  }

  function updateMasterData(sub_eqpt_data: SubEqptDataItem[]) {
    const subEqptMap = new Map<number, MatserSubEqptDataItem>();

    sub_eqpt_data.forEach((item) => {
      if (subEqptMap.has(item.sub_eqpt_code)) {
        subEqptMap.get(item.sub_eqpt_code)?.eqpts.push(item.eqpt);
        subEqptMap.get(item.sub_eqpt_code)?.shops.push(item.shop);
      } else {
        const iconComponent: IconComponent =
          iconSet[Math.floor(Math.random() * iconSet.length)];
        subEqptMap.set(item.sub_eqpt_code, {
          sub_eqpt_code: item.sub_eqpt_code,
          sub_eqpt: item.sub_eqpt,
          shops: [item.shop],
          eqpts: [item.eqpt],
          icon: iconComponent,
        });
      }
    });

    const finalData: MatserSubEqptDataItem[] = [];
    subEqptMap.forEach((value) => {
      finalData.push(value);
    });

    return finalData;
  }

  return (
    <section className="lg:px-4 py-4 space-y-6 mx-auto">
      <h2 className="text-3xl font-semibold text-yellow-700 text-center md:mt-0 mt-8">
        Sub Equipment Wise Details
      </h2>

      <div className="pb-4 bg-white">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mx-4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-yellow-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            type="text"
            className="block pt-2 ps-10 text-md text-neutral-800 border border-yellow-300 
             rounded-lg w-80 h-10 bg-yellow-50 placeholder-yellow-800 
             focus:outline-none focus:ring-0 focus:border-yellow-300 
             hover:border-yellow-400 transition duration-200"
            placeholder="Search for Sub Eqpt..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
        {status === "loading" &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {status === "error" && (
          <div className="col-span-full text-center text-red-500 font-medium text-lg">
            Failed to load sub equipment data. Please try again.
          </div>
        )}

        {status === "success" &&
          filteredData?.map((subEqptItem) => (
            <SubEqptCard key={subEqptItem.sub_eqpt_code} data={subEqptItem} />
          ))}
      </div>
    </section>
  );
};

export default SubEqptCardsSection;
