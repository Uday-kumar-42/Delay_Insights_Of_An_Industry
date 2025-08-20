const Skeletontext = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse mx-auto px-4 py-8">
      <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-6"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeletontext;