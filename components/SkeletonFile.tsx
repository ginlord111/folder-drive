import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const SkeletonFile = () => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-[50px]">
      <Skeleton className="md:w-[500px] md:h-[360px] sm:w-[300px] sm:h-[160px] bg-zinc-200" />
      <Skeleton className="md:w-[500px] md:h-[360px] sm:w-[300px] sm:h-[160px] bg-zinc-200" />
      <Skeleton className="md:w-[500px] md:h-[360px] sm:w-[300px] sm:h-[160px] bg-zinc-200" />
    </div>
  );
};

export default SkeletonFile;
