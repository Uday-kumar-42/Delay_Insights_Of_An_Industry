const SkeletonCard = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm px-6 py-10 flex flex-col space-y-6 animate-pulse w-80 ">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-gray-200">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-300 rounded" />
          <div className="h-3 w-48 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-36 h-3 bg-gray-200 rounded" />
            <div className="flex-1 h-3 bg-gray-300 rounded" />
          </div>
        ))}
        <div className="space-y-1">
          <div className="w-24 h-3 bg-gray-200 rounded" />
          <div className="flex flex-wrap gap-2 mt-1">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="w-16 h-5 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
