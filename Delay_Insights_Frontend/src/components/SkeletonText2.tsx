const SkeletonText2 = () => {
  return (
    <div role="status" className="space-y-8 animate-pulse w-[70vw] mx-auto ">
  {[...Array(4)].map((_, i) => (
    <div key={i} className="flex items-center gap-4">
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-40"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 flex-1"></div>
    </div>
  ))}
  <span className="sr-only">Loading...</span>
</div>

  );
};

export default SkeletonText2;
