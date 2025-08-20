const SkeletonGraph = () => (
    <div
      role="status"

      className="w-full h-[300px] mx-auto p-4 border border-gray-200 rounded-lg shadow-sm animate-pulse dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-gray-300 rounded w-1/4 dark:bg-gray-600"></div>
        <div className="h-3 bg-gray-300 rounded w-1/6 dark:bg-gray-600"></div> 
      </div>

      <div className="flex-1 flex items-end gap-2 px-2 pb-2"> 
        <div className="flex flex-col h-full justify-between pr-2 border-r border-gray-300 dark:border-gray-600">
          <div className="h-2 bg-gray-300 rounded w-6 dark:bg-gray-600"></div>
          <div className="h-2 bg-gray-300 rounded w-8 dark:bg-gray-600"></div>
          <div className="h-2 bg-gray-300 rounded w-7 dark:bg-gray-600"></div>
          <div className="h-2 bg-gray-300 rounded w-5 dark:bg-gray-600"></div>
          <div className="h-2 bg-gray-300 rounded w-6 dark:bg-gray-600"></div>
        </div>

        <div className="flex-1 flex items-end justify-around h-full">
          <div className="w-1/12 bg-gray-300 rounded-t-lg h-3/5 dark:bg-gray-600"></div>
          <div className="w-1/12 bg-gray-300 rounded-t-lg h-4/5 dark:bg-gray-600"></div>
          <div className="w-1/12 bg-gray-300 rounded-t-lg h-2/5 dark:bg-gray-600"></div>
          <div className="w-1/12 bg-gray-300 rounded-t-lg h-full dark:bg-gray-600"></div>
          <div className="w-1/12 bg-gray-300 rounded-t-lg h-3/4 dark:bg-gray-600"></div>
          <div className="w-1/12 bg-gray-300 rounded-t-lg h-1/2 dark:bg-gray-600"></div>
          <div className="w-1/12 bg-gray-300 rounded-t-lg h-2/3 dark:bg-gray-600"></div>
        </div>
      </div>

      <div className="flex justify-around items-center border-t border-gray-300 pt-2 mt-2 dark:border-gray-600">
        <div className="h-2 bg-gray-300 rounded w-8 dark:bg-gray-600"></div>
        <div className="h-2 bg-gray-300 rounded w-8 dark:bg-gray-600"></div>
        <div className="h-2 bg-gray-300 rounded w-8 dark:bg-gray-600"></div>
        <div className="h-2 bg-gray-300 rounded w-8 dark:bg-gray-600"></div>
        <div className="h-2 bg-gray-300 rounded w-8 dark:bg-gray-600"></div>
        <div className="h-2 bg-gray-300 rounded w-8 dark:bg-gray-600"></div>
        <div className="h-2 bg-gray-300 rounded w-8 dark:bg-gray-600"></div>
      </div>
    </div>
  );

  export default SkeletonGraph;