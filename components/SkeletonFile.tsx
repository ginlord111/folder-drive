import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const SkeletonFile = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-[50px] lg:gap-0 gap-3">
      <Skeleton className="lg:w-[500px] lg:h-[360px] sm:w-[150px] sm:h-[160px] bg-zinc-200 w-[200px] h-[150px]" />
      <Skeleton className="lg:w-[500px] lg:h-[360px] sm:w-[150px] sm:h-[160px] bg-zinc-200 w-[200px] h-[150px]" />
      <Skeleton className="lg:w-[500px] lg:h-[360px] sm:w-[150px] sm:h-[160px] bg-zinc-200 w-[200px] h-[150px]" />
    </div>
  );
};

export default SkeletonFile;
