import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative flex justify-center w-full h-full mt-[200px]">
        <div className="relative h-[220px] w-[250px]">
          <Image src={"/logo-files.jpg"} alt="THIS IS LOGO" fill />
        </div>
        <div className="pt-4 max-w-[500px] text-4xl flex items-center justfy-center">
          Upload your files just like Google Drive
        </div>
    </div>
  );
}
