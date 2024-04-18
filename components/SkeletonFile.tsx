import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const SkeletonFile = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 mt-[100px] lg:gap-0 gap-3">
      <Skeleton className="  bg-zinc-200 w-[350px] h-[250px]" />
      <Skeleton className=" bg-zinc-200 w-[350px] h-[250px]" />
      <Skeleton className="bg-zinc-200 w-[350px] h-[250px]" />
      <Skeleton className="bg-zinc-200 w-[350px] h-[250px]" />
    </div>
  );
};

export default SkeletonFile;
