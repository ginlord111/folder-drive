import SideBar from "@/components/SideBar";
import React from "react";
interface LandingLayoutProps {
  children: React.ReactNode;
}
const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className=" h-full w-full mt-[80px] flex gap-8">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 md:mt-[150px] bg-white">
        <SideBar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default LandingLayout;
