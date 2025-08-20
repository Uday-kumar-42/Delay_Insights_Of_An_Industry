import React, { useState } from "react";

interface TableDataItem {
  shop: string;
  eqpt: string;
  sub_eqpt: string | null;
  descr: string;
  delay_code: number | null;
  eff_durn: string;
}

interface TableLayoutProps {
  data: TableDataItem[];
}

const ShopTableLayout = React.memo(({ data }: TableLayoutProps) => {
  const [page, setPage] = useState<number>(0);
  const start = page * 10;
  const end = (page + 1) * 10 < data.length ? (page + 1) * 10 : data.length;
  const pageData = data.slice(start, end);

  function handlePrevious() {
    setPage((prev) => prev - 1);
  }

  function handleNext() {
    setPage((prev) => prev + 1);
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-yellow-200">
      <table className="w-full text-sm text-left rtl:text-right text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-yellow-200">
          <tr>
            <th
              scope="row"
              className="px-6 py-4 font-medium font-semibold text-gray-900 whitespace-nowrap"
            >
              Shop
            </th>
            <th className="px-4 py-3">Equipment</th>
            <th className="px-4 py-3">Sub-Equipment</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Delay Code</th>
            <th className="px-4 py-3">Effective Duration(Hrs)</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((row, idx) => (
            <tr
              key={idx}
              className="bg-white border-b border-yellow-200 hover:bg-yellow-100"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {row.shop}
              </th>
              <td className="px-4 py-3  text-gray-700 whitespace-nowrap">
                {row.eqpt ?? <span className="text-gray-500 italic">N/A</span>}
              </td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                {row.sub_eqpt ?? (
                  <span className="text-gray-500 italic">N/A</span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-700">{row.descr}</td>
              <td className="px-4 py-3 text-gray-700">
                {row.delay_code !== null ? (
                  row.delay_code
                ) : (
                  <span className="text-gray-500 italic">N/A</span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {parseFloat(row.eff_durn).toFixed(2)}
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-gray-400 py-6">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex flex-col items-center gap-2 mt-2 mb-2">
        <span className="text-[14px] text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900">{start + 1}</span> to{" "}
          <span className="font-semibold text-gray-900">{end}</span> of{" "}
          <span className="font-semibold text-gray-900">{data.length}</span>
        </span>
        <div className="inline-flex mt-2 xs:mt-0 shadow-sm rounded-md overflow-hidden border border-gray-300">
          <button
            onClick={handlePrevious}
            disabled={page <= 0}
            className={`px-4 py-2 md:w-20 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 transition 
                    ${page <= 0 ? "opacity-80 cursor-not-allowed" : ""}
                    `}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={page >= Math.ceil(data.length / 10) - 1}
            className={`px-4 py-2 md:w-20 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 border-l border-gray-300 transition 
                    ${
                    page >= Math.ceil(data.length / 10) - 1
                      ? "opacity-80 cursor-not-allowed"
                      : ""
                    }
                  `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
});

export default ShopTableLayout;
