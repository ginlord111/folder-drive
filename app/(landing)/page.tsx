import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative flex justify-center w-full h-full flex-col items-center md:gap-1 gap-3">
      <div className="relative cursor-pointer lg:w-[250px] lg:h-[225px] md:w-[200px] md:h-[180px] sm:w[120px]  sm:h-[100px] w-[110px] h-[90px]">
        <Image
          src={"/folder-picture-iconn.png"}
          alt="THIS IS LOGO"
          fill
          className="inline-block mb-2"
        />
      </div>
      <div className="pt-4 lg:max-w-[750px] md:max-w-[650px] max-w-[250px] lg:text-5xl text-md md:text-3xl text-center tracking-tight text-gray-900 font-bold">
        <p className="leading-tight">
          Upload your files just like Google Drive and Store, Share and Access
          your Digital Hub.
        </p>
      </div>
      <div className="mt-4 text-muted-foreground text-sm md:leading-8 leading-5  tracking-tight md:max-w-[550px] text-center max-w-[300px]">
        Create Your Account, Store Files Effortlessly, and Access Anywhere: Your
        Ultimate Mini Google Drive Experience
      </div>

      <div className="flex items-center gap-2 mt-10">
        <Link
          href={"/dashboard/files"}
          className="font-bold text-sm bg-indigo-600 p-2 rounded-md text-white px-3"
        >
          Get started
        </Link>
        <Link
          href={"/dashboard"}
          className={buttonVariants({
            variant: "link",
            className: "border px-3",
          })}
        >
          Learn more &rarr;
        </Link>
      </div>
    </div>
  );
}
