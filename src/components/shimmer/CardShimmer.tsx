import React from "react";

const SkeletonCard = React.memo(() => {
  return (
    <div className="relative min-h-80 w-full min-w-[230px] max-w-[230px] animate-pulse overflow-hidden rounded bg-neutral-800">
      <div className="h-full w-full bg-gray-700"></div>
      <div className="absolute top-4 h-6 w-1/3 rounded-r-full bg-gray-600"></div>
      <div className="absolute bottom-0 h-16 w-full bg-black/60 p-2 backdrop:blur-3xl">
        <div className="mb-1 h-6 rounded bg-gray-600"></div>
        <div className="flex justify-between">
          <div className="h-4 w-1/3 rounded bg-gray-600"></div>
          <div className="h-4 w-1/4 rounded bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
});
SkeletonCard.displayName = "SkeletonCard";
export default SkeletonCard;
