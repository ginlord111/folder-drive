import React from "react";
import Image from "next/image";
const NoFilesAvail = () => {
  return (
    <div className="flex flex-col items-center relative justify-center w-full mt-32 gap-5">
      <Image
        width="300"
        height="300"
        src="/no-data-picture.svg"
        alt="No Data favFiles"
      />
      <div className="text-muted-foreground text-lg text-center">
        <h3>No favorite files available</h3>
      </div>
    </div>
  );
};

export default NoFilesAvail;
