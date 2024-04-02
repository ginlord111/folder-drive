import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative flex justify-center w-full h-full flex-col items-center">
      <div className="relative">
        <Image
          src={"/logo-files.jpg"}
          alt="THIS IS LOGO"
          width={250}
          height={250}
          className="inline-block mb-8"
        />
      </div>
      <div className="pt-4 max-w-[600px] text-4xl text-center tracking-[2px] text-gray-700 font-bold">
        Upload your files just like Google Drive and Store, Share and Access
        your Digital Hub.
      </div>
    </div>
  );
}
