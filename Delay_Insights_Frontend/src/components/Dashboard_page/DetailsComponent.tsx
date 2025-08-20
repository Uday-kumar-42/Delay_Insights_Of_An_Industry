import { Hourglass, LucideHash } from "lucide-react";

interface DetailsComponentProps {
  data: Record<string, number>[];
  variant: "descr" | "eqpt";
}

const DetailsComponent = ({ data, variant }: DetailsComponentProps) => {
  const iconStyle = {
    descr: <LucideHash className="w-4 h-4" />,
    eqpt: <Hourglass className="w-4 h-4" />,
  };

  const bgStyle = {
    descr: "bg-red-200 text-red-700",
    eqpt: "bg-yellow-200 text-yellow-700",
  };

  const filteredData = data.slice(0, 6);

  return (
    <div className="w-full">
      <div className="bg-white border rounded-2xl shadow-md py-6 px-4 flex flex-col gap-6 h-full">
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-between h-full px-2 py-4 bg-slate-100 dark:bg-gray-800 rounded-2xl shadow hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="text-gray-800 dark:text-gray-100 font-semibold text-base lg:text-[15px] mb-4 leading-snug">
                {variant === "descr" ? item.descr : item.eqpt}
              </div>

              {(variant === "descr" ? item.descr_count : item.total_delays) !==
                undefined && (
                <div
                  className={`flex items-center gap-2 px-3 ${
                    variant === "descr" ? "py-1" : ""
                  } rounded-2xl text-sm font-semibold w-fit mt-auto ${
                    bgStyle[variant]
                  }`}
                >
                  {iconStyle[variant]}
                  <span>
                    {variant === "descr"
                      ? item.descr_count
                      : Math.round(item.downtime) + " Hrs"}
                  </span>
                </div>
              )}

              {variant === "eqpt" && item.downtime !== undefined && (
                <div
                  className={`flex gap-2 items-center px-3 rounded-2xl text-sm font-semibold w-fit mt-2 ${bgStyle[variant]}`}
                >
                  <LucideHash className="w-4 h-4" />
                  <span className="font-semibold text-yellow-700">
                    {item.total_delays}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailsComponent;
