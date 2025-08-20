import axios from "axios";
import {
  AlertCircle,
  Factory,
  HashIcon,
  TimerReset,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DayWiseItem {
  month_date: number;
  downtime: string;
}

type ShopWiseData = {
  shop_with_max_delays: string;
  total_delays: number;
  shop_with_most_downtime: string;
  downtime: string;
};

type EqptWiseData = {
  eqpt_with_max_delays: string;
  total_delays: number;
  eqpt_with_most_downtime: string;
  downtime: string;
};

const CalendarComponent = () => {
  const now = new Date();
  // getMonth function returns ths month based on 0-indexing
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const [downtimeMap, setDowntimeMap] = useState<Record<number, string>>({});
  const [shopWiseData, setShopWiseData] = useState<ShopWiseData>();
  const [eqptWiseData, setEqptWiseData] = useState<EqptWiseData>();
  const [totalDowntime, setTotalDowntime] = useState(0);

  // Days in a given month/year
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(selectedMonth, currentYear) },
    (_, i) => i + 1
  );

  const handlePrev = () => {
    if (selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNext = () => {
    if (selectedMonth < currentMonth) {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  useEffect(() => {
    async function fetchDayWiseData() {
      try {
        console.log(selectedMonth);
        console.log(currentYear);
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `http://localhost:5000/api/dashboard/fetch-day-wise-data/${currentYear}/${
            selectedMonth + 1
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        const day_wise_data = response.data.day_wise_data as DayWiseItem[];
        const shop_wise_data = response.data.shop_wise_data as ShopWiseData;
        const eqpt_wise_data = response.data.eqpt_wise_data as EqptWiseData;

        console.log(shop_wise_data);
        console.log(eqpt_wise_data);

        const map: Record<number, string> = {};
        setTotalDowntime(0);

        day_wise_data.forEach((item) => {
          map[item.month_date] = item.downtime;
          setTotalDowntime((prev) => {
            return prev + Number(item.downtime);
          });
        });

        setDowntimeMap(map);
        setShopWiseData(shop_wise_data);
        setEqptWiseData(eqpt_wise_data);
      } catch (err) {
        console.error("Error fetching equipment data:", err);
      }
    }

    fetchDayWiseData();
  }, [selectedMonth, currentMonth, currentYear]);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 w-full px-2 py-6 max-w-7xl mx-auto justify-center">
      {/* calendar */}
      <div className="w-full max-w-2xl px-4 py-6 md:mx-0 mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 ">
            {months[selectedMonth]} {currentYear}
          </h2>
        </div>

        <div className="grid grid-cols-7 grid-rows-5 gap-3 sm:gap-4 bg-white border border-neutral-200 p-4 rounded-xl shadow-md ">
          {days.map((day) => (
            <div
              key={day}
              className="aspect-square flex flex-col items-center justify-evenly bg-yellow-200 text-gray-800 text-sm sm:text-base rounded-lg shadow-sm"
            >
              <div className="text-sm">{day}</div>
              {/* for downtime info */}
              {downtimeMap[day] && (
                <div className="text-orange-800 font-semibold text-[13px] px-auto">
                  {downtimeMap[day]} hr
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={handlePrev}
            disabled={selectedMonth === 0}
            className={`px-4 py-2 rounded-lg text-neutral-800 font-semibold transition-all duration-150 ${
              selectedMonth === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#ffaa0b] hover:bg-[#ff990b]"
            }`}
          >
            Prev
          </button>

          <button
            onClick={handleNext}
            disabled={selectedMonth === currentMonth}
            className={`px-4 py-2 rounded-lg text-neutral-800 font-semibold transition ${
              selectedMonth === currentMonth
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#ffaa0b] hover:bg-[#ff990b]"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="w-full lg:w-1/3 bg-white px-4 py-2 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">
          Monthly Highlights
        </h3>

        <div className="flex lg:flex-col sm:flex-row gap-4 flex-wrap justify-center shadow-lg border border-neutral-200 mt-2 px-3 py-4 rounded-xl">
          <div className="flex items-center gap-3 bg-yellow-100 dark:bg-gray-700 text-yellow-800 dark:text-yellow-200 p-3 rounded-xl w-full sm:w-[48%] lg:w-full">
            <Factory className="w-5 h-5" />
            <div>
              <div className="text-sm font-semibold">Shop w/ Max Delays</div>
              <div className="text-md font-bold flex gap-4">
                <span>{shopWiseData?.shop_with_max_delays || "---"}</span>
                <span className="flex items-center gap-1">
                  <HashIcon className="w-4 h-4" />
                  {shopWiseData?.total_delays ?? "---"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-yellow-100 dark:bg-gray-700 text-yellow-800 dark:text-yellow-200 p-3 rounded-xl w-full sm:w-[48%] lg:w-full">
            <AlertCircle className="w-5 h-5" />
            <div>
              <div className="text-sm font-semibold">Most Downtime (Shop)</div>
              <div className="text-md font-bold flex gap-4">
                <span>{shopWiseData?.shop_with_most_downtime || "---"}</span>
                <span className="flex items-center gap-1">
                  <HashIcon className="w-4 h-4" />
                  {shopWiseData?.downtime
                    ? `${shopWiseData.downtime} Hrs`
                    : "---"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-yellow-100 dark:bg-gray-700 text-yellow-800 dark:text-yellow-200 p-3 rounded-xl w-full sm:w-[48%] lg:w-full">
            <Wrench className="w-5 h-5" />
            <div>
              <div className="text-sm font-semibold">Eqpt w/ Max Delays</div>
              <div className="text-md font-bold flex gap-4">
                <span>{eqptWiseData?.eqpt_with_max_delays || "---"}</span>
                <span className="flex items-center gap-1">
                  <HashIcon className="w-4 h-4" />
                  {eqptWiseData?.total_delays ?? "---"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-yellow-100 dark:bg-gray-700 text-yellow-800 dark:text-yellow-200 p-3 rounded-xl w-full sm:w-[48%] lg:w-full">
            <AlertCircle className="w-5 h-5" />
            <div>
              <div className="text-sm font-semibold">Most Downtime (Eqpt)</div>
              <div className="text-md font-bold flex gap-4">
                <span>{eqptWiseData?.eqpt_with_most_downtime || "---"}</span>
                <span className="flex items-center gap-1">
                  <HashIcon className="w-4 h-4" />
                  {eqptWiseData?.downtime
                    ? `${eqptWiseData.downtime} Hrs`
                    : "---"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-yellow-200 dark:bg-gray-700 text-yellow-900 dark:text-yellow-100 p-3 rounded-xl w-full sm:w-[98%] lg:w-full">
            <TimerReset className="w-5 h-5" />
            <div>
              <div className="text-sm font-semibold">Total Downtime</div>
              <div className="text-md font-bold">{totalDowntime} Hrs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;

