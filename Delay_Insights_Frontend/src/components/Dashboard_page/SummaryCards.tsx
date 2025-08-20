import {
  Clock,
  AlertTriangle,
  Activity,
  BarChart2,
  Building2,
  Wrench,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type ActionDispatch, type RootState } from "../../store/store";
import axios from "axios";
import {
  setCumulativeDelayHours,
  setDepartmentWithMaxDelays,
  setDepartmentWithMinDelays,
  setMostFrequentCause,
  setMttr,
  setTotalDelaysToday,
} from "../../store/summarySlice";
import { toast, ToastContainer } from "react-toastify";

const summaryData = [
  {
    title: "Total Delays Today",
    icon: <AlertTriangle className="text-red-600 w-8 h-8" />,
    value: "--",
    bgColor: "bg-red-100",
  },
  {
    title: "Cumulative Delay Duration (hrs)",
    icon: <Clock className="text-purple-600 w-8 h-8" />,
    value: "--",
    bgColor: "bg-violet-100",
  },
  {
    title: "Most Frequent Delay Cause",
    icon: <BarChart2 className="text-blue-600 w-8 h-8" />,
    value: "--",
    bgColor: "bg-blue-100",
    descr: "",
  },
  {
    title: "Department with Min Delays",
    icon: <Activity className="text-orange-600 w-8 h-8" />,
    value: "--",
    bgColor: "bg-orange-100",
  },
  {
    title: "Department with Max Delays",
    icon: <Building2 className="text-green-600 w-8 h-8" />,
    value: "--",
    bgColor: "bg-green-100",
  },
  {
    title: "MTTR (Mean Time to Repair)",
    icon: <Wrench className="text-pink-600 w-8 h-8" />,
    value: "--",
    bgColor: "bg-yellow-100",
  },
];

const SummaryCards = () => {
  const dispatch = useDispatch<ActionDispatch>();
  const summary = useSelector((state: RootState) => state.summary);

  summaryData[0].value = summary.totalDelaysToday.toString();
  summaryData[1].value = summary.cumulativeDelayHours.toString();
  summaryData[2].value = summary.mostFrequentCause.delay_code.toString();
  summaryData[2].descr = summary.mostFrequentCause.descr;
  summaryData[3].value = summary.departmentWithMinDelays.toString();
  summaryData[4].value = summary.departmentWithMaxDelays.toString();
  summaryData[5].value = summary.mttr.toString();

  const lastFetched = useSelector(
    (state: RootState) => state.summary.lastFetched
  );

  const FIVE_MINUTES = 5 * 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const shouldRefetch =
        !lastFetched || Date.now() - lastFetched > FIVE_MINUTES;

      if (shouldRefetch) {
        fetchSummary();
      }
    }, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lastFetched, FIVE_MINUTES]);

  useEffect(() => {
    async function fetch() {
      await fetchSummary();
    }

    fetch();
  }, []);

  async function fetchSummary() {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/fetch-summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        const {
          totalDelaysToday,
          cumulativeDelayHours,
          mostFrequentCause,
          departmentWithMinDelays,
          departmentWithMaxDelays,
          mttr,
        } = data.summary;

        dispatch(setTotalDelaysToday(totalDelaysToday));
        dispatch(setCumulativeDelayHours(Number(cumulativeDelayHours)));
        dispatch(setMostFrequentCause(mostFrequentCause));
        dispatch(setDepartmentWithMinDelays(departmentWithMinDelays));
        dispatch(setDepartmentWithMaxDelays(departmentWithMaxDelays));
        dispatch(setMttr(Number(mttr)));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Authorization Denied!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "dark",
            draggable: true,
          });
        } else {
          toast.error("Error while loading data!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "dark",
            draggable: true,
          });
        }
      } else {
        toast.error("Error while loading data!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
          draggable: true,
        });
      }
    }
  }

  return (
    <section className="py-10 sm:py-3 px-4 bg-white">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-600 mb-8 text-center">
          Delay Management Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaryData.map((card, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-6 rounded-2xl min-h-[20vh] border border-slate-100 shadow hover:shadow-md transition-shadow duration-300 bg-slate-100`}
            >
              <div
                className={`flex-shrink-1  p-2 rounded-full shadow  ${card.bgColor} `}
              >
                {card.icon}
              </div>
              <div>
                <h3 className="text-gray-700 font-medium">{card.title}</h3>
                <p className="text-xl font-semibold text-black">
                  {card.value}
                  <span className="text-neutral-500"> {card?.descr}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummaryCards;
